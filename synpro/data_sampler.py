import numpy as np

class DataSampler:
    """
    DataSampler to gracefully skip zero-frequency categories
    and avoid out-of-range indexes or empty categories.
    """

    def __init__(self, data, output_info, log_frequency):
        self._data_length = len(data)

        def is_discrete_column(col_info):
            return len(col_info) == 1 and col_info[0].activation_fn == 'softmax'

        # Identify discrete columns
        n_discrete_columns = sum(is_discrete_column(ci) for ci in output_info)

        # For each discrete column, store row indices by category
        self._rid_by_cat_cols = []
        self._discrete_column_cond_st = np.zeros(n_discrete_columns, dtype='int32')
        self._discrete_column_n_category = np.zeros(n_discrete_columns, dtype='int32')

        self._n_discrete_columns = n_discrete_columns
        self._n_categories = 0

        # This will store the "filtered" probabilities
        # so that zero-frequency categories are excluded from sampling
        self._discrete_column_category_prob = []

        st = 0
        discrete_id = 0
        current_cond_st = 0
        for col_info in output_info:
            if is_discrete_column(col_info):
                span = col_info[0]    # e.g. dim=4 for a 4-category column
                ed = st + span.dim

                # Calculate frequency of each category
                freq = np.sum(data[:, st:ed], axis=0)
                if log_frequency:
                    freq = np.log(freq + 1)

                # Filter out zero-frequency categories
                valid_indices = np.where(freq > 0)[0]

                # Build rid_by_cat for only the categories that have freq>0
                rid_list_for_cats = []
                for cat_idx in valid_indices:
                    # row IDs where that category=1
                    cat_rids = np.nonzero(data[:, st + cat_idx])[0]
                    rid_list_for_cats.append(cat_rids)

                # Probability distribution over valid categories
                filtered_freq = freq[valid_indices]
                total_freq = filtered_freq.sum()
                if total_freq == 0:
                    # fallback: if everything is zero, keep an empty distribution
                    cat_prob = []
                else:
                    cat_prob = filtered_freq / total_freq

                # Store them
                self._rid_by_cat_cols.append(rid_list_for_cats)
                self._discrete_column_category_prob.append(cat_prob)

                # Update category offset
                self._discrete_column_cond_st[discrete_id] = current_cond_st
                self._discrete_column_n_category[discrete_id] = len(valid_indices)
                current_cond_st += len(valid_indices)
                self._n_categories += len(valid_indices)

                discrete_id += 1
                st = ed
            else:
                # skip continuous columns
                st += sum(sp.dim for sp in col_info)

    def _random_choice_prob_index(self, discrete_column_id):
        """
        Vectorized selection of a valid category from discrete_column_id
        which might be an array of column-IDs, each referencing a probability array
        in self._discrete_column_category_prob.
        """
        chosen_categories = []
        for col in discrete_column_id:
            # Probability array for that column
            probs = self._discrete_column_category_prob[col]
            if len(probs) == 0:
                # if no valid categories exist, fallback or raise error
                # e.g., fallback to 0
                chosen_categories.append(0)
                continue

            # sample a float in [0,1)
            r = np.random.rand()
            cdf = probs.cumsum()
            cat_index = (cdf > r).argmax()
            chosen_categories.append(cat_index)

        return np.array(chosen_categories)

    def sample_condvec(self, batch):
        """
        Same as before, but uses updated structures that skip zero-frequency categories.
        """
        if self._n_discrete_columns == 0:
            return None

        # randomly pick which discrete column is active
        discrete_column_id = np.random.choice(np.arange(self._n_discrete_columns), size=batch)

        cond = np.zeros((batch, self._n_categories), dtype='float32')
        mask = np.zeros((batch, self._n_discrete_columns), dtype='float32')
        mask[np.arange(batch), discrete_column_id] = 1

        chosen_category_in_col = self._random_choice_prob_index(discrete_column_id)

        # Convert local cat index -> global cat index
        global_category_idx = (self._discrete_column_cond_st[discrete_column_id]
                               + chosen_category_in_col)
        cond[np.arange(batch), global_category_idx] = 1

        return cond, mask, discrete_column_id, chosen_category_in_col

    def sample_original_condvec(self, batch):
        """
        For generation usage, we flatten the probabilities across all columns.
        """
        if self._n_discrete_columns == 0:
            return None

        all_probs = np.concatenate(self._discrete_column_category_prob)
        if all_probs.size == 0:
            # no categories at all
            return None

        # filter out zero-like or empty
        if all_probs.sum() == 0:
            return None

        all_probs = all_probs / all_probs.sum()

        # pick categories
        cat_ids = np.random.choice(len(all_probs), batch, p=all_probs)
        cond = np.zeros((batch, self._n_categories), dtype='float32')
        cond[np.arange(batch), cat_ids] = 1
        return cond

    def sample_data(self, data, n, col, opt):
        """
        Sample data from the real data, matching discrete col conditions.
        If we encounter an empty category, fallback to random row from entire dataset.
        """
        if col is None:
            idx = np.random.randint(len(data), size=n)
            return data[idx]

        idx = []
        for c, o in zip(col, opt):
            # Check that c, o are in range
            if c >= len(self._rid_by_cat_cols):
                # fallback or skip
                idx.append(np.random.randint(len(data)))
                continue

            cat_list = self._rid_by_cat_cols[c]
            if o >= len(cat_list):
                # fallback for out-of-range category index
                idx.append(np.random.randint(len(data)))
                continue

            valid_rows = cat_list[o]
            if len(valid_rows) == 0:
                # fallback to random row if category is empty
                idx.append(np.random.randint(len(data)))
            else:
                idx.append(np.random.choice(valid_rows))

        return data[idx]

    def dim_cond_vec(self):
        """Return total #categories across all discrete columns (after filtering)."""
        return self._n_categories

    def generate_cond_from_condition_column_info(self, condition_info, batch):
        """
        If the user specifically wants column X=some category (value_id),
        but that category doesn't exist, skip or fallback as needed.
        """
        vec = np.zeros((batch, self._n_categories), dtype='float32')

        col_id = condition_info['discrete_column_id']
        val_id = condition_info['value_id']

        # Check for out-of-range
        if col_id >= len(self._rid_by_cat_cols):
            return vec  # fallback with all zeros
        if val_id >= len(self._rid_by_cat_cols[col_id]):
            return vec

        st_index = 0
        for cid in range(col_id):
            st_index += len(self._rid_by_cat_cols[cid])

        st_index += val_id
        if st_index < self._n_categories:
            vec[:, st_index] = 1

        return vec
