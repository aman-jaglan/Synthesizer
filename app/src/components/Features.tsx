
import React from 'react';
import { Card } from './ui/card';
import { 
  BarChart3, 
  Filter, 
  Zap, 
  Package, 
  BookOpen, 
  Gauge, 
  Shield, 
  LineChart 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-syn-primary" />,
      title: "Realistic Data Generation",
      description: "Creates synthetic datasets highly similar to your real datasets, preserving statistical properties and relationships."
    },
    {
      icon: <Filter className="h-8 w-8 text-syn-primary" />,
      title: "Conditional Sampling",
      description: "Generate data conditioned on specific column values, allowing for targeted synthetic data creation."
    },
    {
      icon: <Gauge className="h-8 w-8 text-syn-primary" />,
      title: "Advanced GAN Architectures",
      description: "Supports WGAN-GP, R1, and Hinge loss methods for superior data quality and training stability."
    },
    {
      icon: <Zap className="h-8 w-8 text-syn-primary" />,
      title: "Mixed-Precision Training",
      description: "Utilize GPU acceleration for fast model training, significantly reducing the time needed to generate data."
    },
    {
      icon: <Package className="h-8 w-8 text-syn-primary" />,
      title: "Easy to Install and Use",
      description: "Simple API, straightforward documentation, minimal setup required to get started."
    },
    {
      icon: <Shield className="h-8 w-8 text-syn-primary" />,
      title: "Privacy Protection",
      description: "Generate synthetic data that preserves statistical patterns while protecting individual privacy."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-syn-primary" />,
      title: "Comprehensive Documentation",
      description: "Detailed guides, examples, and API references to help you make the most of SynPro."
    },
    {
      icon: <LineChart className="h-8 w-8 text-syn-primary" />,
      title: "Data Quality Metrics",
      description: "Built-in methods to evaluate the quality and fidelity of your synthetic data."
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">Key Features</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            SynPro provides powerful tools to generate high-quality synthetic data that maintains the statistical properties of your original datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden border-border/60 bg-background/80 backdrop-blur-sm h-full group card-hover">
              <div className="p-6 flex flex-col h-full">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-background mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
