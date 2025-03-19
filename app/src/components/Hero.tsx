
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Database, Code, Shield, LineChart } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-16">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none"></div>
      
      {/* Animated gradient particles (subtle) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-syn-primary/10 rounded-full filter blur-3xl animate-pulse-soft opacity-40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-syn-secondary/10 rounded-full filter blur-3xl animate-pulse-soft opacity-30 animation-delay-1000"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 bg-syn-primary/10 text-syn-primary rounded-full text-sm font-medium animate-fade-in">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-syn-primary rounded-full mr-2 animate-pulse"></span>
              <span>Now on PyPI</span>
            </span>
          </div>
          
          {/* Main title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance animate-fade-in" style={{ animationDelay: "100ms" }}>
            Generate <span className="text-gradient font-extrabold">Realistic</span> Synthetic Data with SynPro
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl animate-fade-in" style={{ animationDelay: "200ms" }}>
            A powerful, easy-to-use Python library for generating realistic synthetic tabular data using state-of-the-art GAN techniques. Perfect for data scientists and researchers.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button size="lg" asChild className="group">
              <a href="#examples">
                Get Started
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#documentation">Documentation</a>
            </Button>
          </div>
          
          {/* Code snippet */}
          <div className="w-full max-w-2xl mx-auto mt-8 overflow-hidden rounded-lg shadow-lg border border-border/50 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-between px-4 py-2 bg-muted">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-xs font-mono text-muted-foreground">pip install synpro</div>
            </div>
            <pre className="p-4 bg-syn-dark text-white font-mono text-sm overflow-x-auto">
              <code>{`import pandas as pd
from synpro.model import SynPro

# Load your real dataset
data = pd.read_csv("your-dataset.csv")

# Initialize and train SynPro
model = SynPro(embedding_dim=128)
model.fit(data)

# Generate synthetic data
synthetic_data = model.sample(1000)
`}</code>
            </pre>
          </div>

          {/* Feature icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-syn-primary/10 text-syn-primary mb-3">
                <Database size={24} />
              </div>
              <span className="text-sm font-medium">Realistic Data</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-syn-secondary/10 text-syn-secondary mb-3">
                <Code size={24} />
              </div>
              <span className="text-sm font-medium">Easy API</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-syn-accent/10 text-syn-accent mb-3">
                <Shield size={24} />
              </div>
              <span className="text-sm font-medium">Privacy Safe</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-500/10 text-purple-500 mb-3">
                <LineChart size={24} />
              </div>
              <span className="text-sm font-medium">Statistical Fidelity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
