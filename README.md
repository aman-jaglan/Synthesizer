# SynPro 🔥

[![PyPI version](https://badge.fury.io/py/synpro.svg)](https://pypi.org/project/synpro/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**SynPro** is a powerful, easy-to-use Python library for generating realistic synthetic tabular data using state-of-the-art GAN techniques. SynPro enables data scientists and researchers to quickly create synthetic datasets that preserve statistical properties of original data while ensuring privacy and confidentiality.

---

## ✨ Key Features

- **📊 Realistic Data Generation:** Creates synthetic datasets highly similar to your real datasets.
- **🔍 Conditional Sampling:** Generate data conditioned on specific column values.
- **🚀 Advanced GAN Architectures:** Supports WGAN-GP, R1, and Hinge loss methods for superior data quality.
- **⚡ Mixed-Precision Training:** Utilize GPU acceleration for fast model training.
- **🔧 Easy to Install and Use:** Simple API, straightforward documentation, minimal setup.

---

## 📦 Installation

Install `synpro` directly from PyPI using pip:

```bash
pip install synpro
```

## 🚀 Quick Start Example

Here's how you can quickly get started with SynPro:

### ▶️ Generating Synthetic Data

```python
import pandas as pd
from synpro.model import SynPro

# Load your original dataset
data = pd.read_csv("your-dataset.csv")

# Initialize SynPro
model = SynPro(
    embedding_dim=128,
    generator_dim=(256, 256),
    discriminator_dim=(256, 256),
    batch_size=500,
    epochs=100,
    adv_loss='r1',                # Adversarial loss: 'wgan-gp', 'r1', or 'hinge'
    enable_spectral_norm=True,    # For more stable training
    mixed_precision=True,         # GPU acceleration
    verbose=True
)

# Train your model
model.fit(data, discrete_columns=['category_column'])

# Generate synthetic data
synthetic_data = model.sample(1000)

# Check your generated synthetic data
print(synthetic_data.head())
```

## 🛠️ Advanced Usage

### Conditional Data Generation

Generate samples based on specific column conditions:

```python
# Generate samples with specific conditions
samples = model.sample(
    100,
    condition_column='category_column',
    condition_value='desired_category'
)

print(samples.head())
```

### Saving and Loading Trained Models

Save your trained models for later reuse:

```python
# Save trained model
model.save("my_synpro_model.pt")

# Load trained model
loaded_model = SynPro.load("my_synpro_model.pt")
```

## 📖 Documentation

Full documentation is available on our GitHub Wiki.

## 🐞 Issues & Contributions

Found an issue or want to suggest a new feature? Feel free to:

- Open an issue
- Submit a pull request

We welcome and appreciate your contributions!

## 📜 License

SynPro is released under the MIT License. See the LICENSE file for more details.

## 📧 Contact

Created by Aman Jaglan. For support, please contact amanwork2025@gmail.com.

Happy synthesizing! 🎉
```