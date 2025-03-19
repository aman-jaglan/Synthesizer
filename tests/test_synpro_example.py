"""
test_synpro_example.py

An example test script showing how to:
1. Load small CSV data
2. Train SynPro on GPU (if available)
3. Sample from the trained model
4. Move the model to CPU and test sampling again
"""

import os
import pandas as pd
import torch

# If your local synpro is not yet installed, uncomment the next line to install in editable mode:
# os.system("pip install -e ..")

from synpro.model import SynPro

def main():
    # 1. Load a small dataset (ensure your example_data.csv is in the same folder or provide correct path)
    data_file = os.path.join(os.path.dirname(__file__), "hard.csv")
    df = pd.read_csv(data_file)

    print("Data loaded:")
    print(df.head())

    # 2. Decide which columns are discrete
    discrete_cols = ["Category", "Subcat", "Department"]
    # 3. Instantiate SynPro
    #    We'll force GPU if available, else CPU
    use_cuda = torch.cuda.is_available()
    device_str = "cuda" if use_cuda else "cpu"
    print(f"Training on device: {device_str}")

    model = SynPro(
        epochs=50,                  # small # of epochs for quick test
        batch_size=64,
        embedding_dim=16,
        generator_dim=(32, 32),
        discriminator_dim=(32, 32),
        verbose=True,
        cuda=use_cuda,
        adv_loss='wgan-gp',        # or 'r1', 'hinge'
        enable_spectral_norm=True
    )

    # 4. Fit the model
    model.fit(df, discrete_columns=discrete_cols)

    # 5. Generate some samples
    synth_samples = model.sample(10)
    print("Generated samples:")
    print(synth_samples.head())

    # 6. Save model
    model.save("synpro_model_test.pt")
    print("Model saved to synpro_model_test.pt")

    # 7. Load model on CPU
    loaded_model = SynPro.load("synpro_model_test.pt")
    loaded_model.set_device("cpu")  # forcibly move to CPU
    print("Model loaded and set to CPU.")

    # 8. Generate again on CPU
    new_synth_samples = loaded_model.sample(5)
    print("Generated samples on CPU:")
    print(new_synth_samples.head())

    print("All tests completed successfully!")

if __name__ == "__main__":
    main()
