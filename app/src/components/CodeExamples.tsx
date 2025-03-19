
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowRight } from 'lucide-react';

const CodeExamples = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const exampleCode = {
    basic: `import pandas as pd
from synpro.model import SynPro

# Load your original dataset
data = pd.read_csv("your-dataset.csv")

# Initialize SynPro
model = SynPro(
    embedding_dim=128,
    generator_dim=(256, 256),
    discriminator_dim=(256, 256),
    batch_size=500,
    epochs=100
)

# Train your model
model.fit(data, discrete_columns=['category_column'])

# Generate synthetic data
synthetic_data = model.sample(1000)

# Check your generated synthetic data
print(synthetic_data.head())`,

    conditional: `# Initialize and train your model as in the basic example
# ...

# Generate samples with specific conditions
samples = model.sample(
    100,
    condition_column='category_column',
    condition_value='desired_category'
)

print(samples.head())`,

    advanced: `# Initialize with advanced GAN options
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
model.fit(data, discrete_columns=['category_column'])`,

    saveload: `# Save trained model
model.save("my_synpro_model.pt")

# Load trained model
loaded_model = SynPro.load("my_synpro_model.pt")

# Generate data with loaded model
synthetic_data = loaded_model.sample(1000)`
  };

  return (
    <section id="examples" className="py-20 relative">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">Quick Start</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            SynPro makes it easy to generate synthetic data. Here are some examples to get you started.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl">
                <TabsTrigger value="basic">Basic Usage</TabsTrigger>
                <TabsTrigger value="conditional">Conditional</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="saveload">Save & Load</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mb-8 relative bg-syn-dark rounded-lg shadow-lg overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between px-4 py-2 bg-syn-dark/90 border-b border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {activeTab === 'basic' && 'basic_example.py'}
                  {activeTab === 'conditional' && 'conditional_sampling.py'}
                  {activeTab === 'advanced' && 'advanced_options.py'}
                  {activeTab === 'saveload' && 'save_load_model.py'}
                </div>
              </div>

              <TabsContent value="basic" className="mt-0">
                <pre className="p-4 text-sm text-white font-mono overflow-auto">
                  <code>{exampleCode.basic}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="conditional" className="mt-0">
                <pre className="p-4 text-sm text-white font-mono overflow-auto">
                  <code>{exampleCode.conditional}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="advanced" className="mt-0">
                <pre className="p-4 text-sm text-white font-mono overflow-auto">
                  <code>{exampleCode.advanced}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="saveload" className="mt-0">
                <pre className="p-4 text-sm text-white font-mono overflow-auto">
                  <code>{exampleCode.saveload}</code>
                </pre>
              </TabsContent>
            </div>
          </Tabs>

          <div className="text-center mt-8">
            <Button asChild className="group">
              <a href="#documentation">
                Explore full documentation
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExamples;
