
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Book, Code, FileText, ChevronRight, Command, Database, Server, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const Documentation = () => {
  const [activeExampleTab, setActiveExampleTab] = useState('basic');

  const docs = [
    {
      title: "Installation Guide",
      icon: <Command className="h-5 w-5" />,
      description: "Step-by-step instructions to install SynPro and its dependencies.",
      link: "#"
    },
    {
      title: "Basic Tutorials",
      icon: <Book className="h-5 w-5" />,
      description: "Learn the basics of generating synthetic data with SynPro.",
      link: "#"
    },
    {
      title: "API Reference",
      icon: <Code className="h-5 w-5" />,
      description: "Detailed documentation of SynPro's classes, methods, and parameters.",
      link: "#"
    },
    {
      title: "Advanced Usage",
      icon: <FileText className="h-5 w-5" />,
      description: "Explore advanced features and customization options.",
      link: "#"
    }
  ];

  const sampleDatasets = {
    easy: `Category,Value
A,1
A,2
A,3
A,4
B,5
B,6
B,7
B,8
B,9
B,10`,

    medium: `Category,Subcat,Age,Salary,Department
X,X1,25,30000,Sales
X,X2,28,34000,Sales
X,X3,30,35000,Sales
X,X4,35,38000,Sales
Y,Y1,29,45000,HR
Y,Y2,40,60000,HR
Y,Y3,45,62000,HR
Z,Z1,55,80000,IT
Z,Z2,50,78000,IT
Z,Z3,42,57000,IT
Z,Z4,38,50000,Finance
X,X1,25,31000,Finance
Y,Y3,52,70000,Finance
Z,Z2,25,35000,IT
X,X2,49,55000,Sales`,

    complex: `City,AgeGroup,MaritalStatus,EducationLevel,YearsOfExperience,AnnualSpending,PreferredChannel
New York,18-25,Single,High School,1,12000,Online
New York,25-35,Married,Bachelor,7,45000,In-Store
Boston,35-45,Married,Master,12,60000,Online
Boston,45-55,Divorced,PhD,20,80000,Online
Chicago,18-25,Single,High School,0,10000,In-Store
Miami,25-35,Married,Bachelor,9,50000,Online
Miami,35-45,Married,Master,15,70000,In-Store
Seattle,45-55,Single,Bachelor,18,95000,Online
Seattle,25-35,Single,High School,5,32000,In-Store
Dallas,35-45,Married,PhD,10,75000,Online
Dallas,18-25,Single,Bachelor,2,15000,Online
Los Angeles,25-35,Married,Master,8,64000,In-Store
Los Angeles,45-55,Divorced,Bachelor,25,90000,Online
Houston,35-45,Married,Bachelor,10,81000,In-Store
Houston,25-35,Single,PhD,3,38000,Online`
  };

  const exampleCode = {
    basic: `import pandas as pd
from synpro.model import SynPro

# Step 1: Load your dataset
df = pd.read_csv("easy.csv")

# Step 2: Initialize SynPro model
model = SynPro(
    embedding_dim=16,     # Size of embedding layers
    generator_dim=(32, 32),   # Generator network architecture
    discriminator_dim=(32, 32),   # Discriminator network architecture
    batch_size=64,    # Number of samples per batch
    epochs=50     # Number of training epochs
)

# Step 3: Train the model
# The discrete_columns parameter tells SynPro which columns contain categorical data
model.fit(df, discrete_columns=["Category"])

# Step 4: Generate synthetic data
synthetic_data = model.sample(10)  # Generate 10 samples

print(synthetic_data.head())`,

    medium: `import pandas as pd
import torch
from synpro.model import SynPro

# Step 1: Load your dataset
df = pd.read_csv("medium.csv")

# Step 2: Identify which columns contain categorical (discrete) data
discrete_cols = ["Category", "Subcat", "Department"]

# Step 3: Check if GPU is available for faster training
use_cuda = torch.cuda.is_available()
device = "cuda" if use_cuda else "cpu"
print(f"Training on: {device}")

# Step 4: Initialize SynPro with more advanced configuration
model = SynPro(
    embedding_dim=32,
    generator_dim=(64, 64),
    discriminator_dim=(64, 64),
    batch_size=64,
    epochs=100,
    adv_loss='wgan-gp',            # Using Wasserstein GAN with gradient penalty
    enable_spectral_norm=True,     # For more stable training
    cuda=use_cuda,                 # Use GPU if available
    verbose=True                   # Show training progress
)

# Step 5: Train the model
model.fit(df, discrete_columns=discrete_cols)

# Step 6: Generate synthetic data
synthetic_data = model.sample(15)  # Generate 15 samples

# Step 7: Save the trained model for future use
model.save("synpro_medium_model.pt")

print(synthetic_data.head())`,

    complex: `import pandas as pd
import torch
from synpro.model import SynPro

# Step 1: Load your complex dataset
df = pd.read_csv("complex.csv")

# Step 2: Identify categorical columns
discrete_cols = ["City", "AgeGroup", "MaritalStatus", "EducationLevel", "PreferredChannel"]

# Step 3: Configure hardware acceleration
use_cuda = torch.cuda.is_available()
device_str = "cuda" if use_cuda else "cpu"
print(f"Training on device: {device_str}")

# Step 4: Initialize SynPro with advanced configuration
model = SynPro(
    embedding_dim=128,
    generator_dim=(256, 256),
    discriminator_dim=(256, 256),
    batch_size=32,
    epochs=200,
    verbose=True,
    cuda=use_cuda,
    adv_loss='r1',                 # Using R1 regularization loss
    enable_spectral_norm=True,     # Stabilizes training
    mixed_precision=True           # Faster training with mixed precision
)

# Step 5: Train the model
model.fit(df, discrete_columns=discrete_cols)

# Step 6: Generate synthetic data
synthetic_data = model.sample(20)

# Step 7: Save the trained model
model.save("synpro_complex_model.pt")

# Step 8: Load the model on a different device
loaded_model = SynPro.load("synpro_complex_model.pt")
loaded_model.set_device("cpu")  # Move model to CPU if needed

# Step 9: Generate conditional samples (only samples with specific values)
conditional_samples = loaded_model.sample(
    10,  # Generate 10 samples
    condition_column='City',  # The column to condition on
    condition_value='New York'  # The specific value to generate
)

print(synthetic_data.head())
print("Conditional samples (New York only):")
print(conditional_samples.head())`,
  };

  return (
    <section id="documentation" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">Documentation</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive guides and references to help you get the most out of SynPro.
          </p>
        </div>

        {/* Documentation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {docs.map((doc, index) => (
            <Card key={index} className="h-full bg-background/80 backdrop-blur-sm overflow-hidden group card-hover">
              <div className="p-6 flex flex-col h-full">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  {doc.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{doc.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">{doc.description}</p>
                <Button variant="ghost" asChild className="justify-start p-0 h-auto group">
                  <a href={doc.link} className="flex items-center text-sm font-medium text-primary">
                    Read more 
                    <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Usage Examples Section */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-3">
              <span className="text-gradient">Usage Examples</span>
            </h3>
            <p className="text-muted-foreground">
              Learn how to use SynPro with datasets of varying complexity. 
              Choose a dataset complexity level to see example code.
            </p>
          </div>

          <Tabs defaultValue="basic" value={activeExampleTab} onValueChange={setActiveExampleTab} className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="medium">Intermediate</TabsTrigger>
                <TabsTrigger value="complex">Advanced</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sample Dataset */}
              <div>
                <h4 className="flex items-center text-lg font-medium mb-3">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  Sample Dataset
                </h4>
                <div className="mb-4 relative bg-syn-dark rounded-lg shadow-lg overflow-hidden transition-all duration-300">
                  <div className="flex items-center justify-between px-4 py-2 bg-syn-dark/90 border-b border-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {activeExampleTab === 'basic' && 'easy.csv'}
                      {activeExampleTab === 'medium' && 'medium.csv'}
                      {activeExampleTab === 'complex' && 'complex.csv'}
                    </div>
                  </div>

                  <TabsContent value="basic" className="mt-0">
                    <pre className="p-4 text-sm text-white font-mono overflow-auto max-h-72">
                      <code>{sampleDatasets.easy}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="medium" className="mt-0">
                    <pre className="p-4 text-sm text-white font-mono overflow-auto max-h-72">
                      <code>{sampleDatasets.medium}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="complex" className="mt-0">
                    <pre className="p-4 text-sm text-white font-mono overflow-auto max-h-72">
                      <code>{sampleDatasets.complex}</code>
                    </pre>
                  </TabsContent>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="mr-1 h-3.5 w-3.5" />
                    Download Sample CSV
                  </Button>
                </div>
              </div>

              {/* Code Example */}
              <div>
                <h4 className="flex items-center text-lg font-medium mb-3">
                  <Server className="mr-2 h-5 w-5 text-primary" />
                  Example Code
                </h4>
                <div className="mb-4 relative bg-syn-dark rounded-lg shadow-lg overflow-hidden transition-all duration-300">
                  <div className="flex items-center justify-between px-4 py-2 bg-syn-dark/90 border-b border-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {activeExampleTab === 'basic' && 'basic_example.py'}
                      {activeExampleTab === 'medium' && 'intermediate_example.py'}
                      {activeExampleTab === 'complex' && 'advanced_example.py'}
                    </div>
                  </div>

                  <TabsContent value="basic" className="mt-0">
                    <pre className="p-4 text-sm text-white font-mono overflow-auto max-h-72">
                      <code>{exampleCode.basic}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="medium" className="mt-0">
                    <pre className="p-4 text-sm text-white font-mono overflow-auto max-h-72">
                      <code>{exampleCode.medium}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="complex" className="mt-0">
                    <pre className="p-4 text-sm text-white font-mono overflow-auto max-h-72">
                      <code>{exampleCode.complex}</code>
                    </pre>
                  </TabsContent>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Code className="mr-1 h-3.5 w-3.5" />
                    Copy Code
                  </Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>

        {/* Full Documentation Banner */}
        <div className="mt-12 p-6 rounded-lg border border-border bg-background/80 backdrop-blur-sm max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Full Documentation</h3>
              <p className="text-muted-foreground">
                Explore the complete documentation for in-depth guides, examples, and API references.
              </p>
            </div>
            <Button asChild className="shrink-0">
              <a href="https://github.com/user/synpro/wiki" className="flex items-center gap-2">
                <span>View on GitHub</span>
                <ExternalLink size={16} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;
