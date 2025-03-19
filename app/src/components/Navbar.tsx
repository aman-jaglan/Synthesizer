
import React, { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
        scrolled ? "py-3 glass" : "py-6 bg-transparent"
      )}
    >
      <div className="container px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-syn-primary to-syn-secondary">
            SynPro
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-syn-primary transition-colors">
            Features
          </a>
          <a href="#examples" className="text-sm font-medium hover:text-syn-primary transition-colors">
            Examples
          </a>
          <a href="#documentation" className="text-sm font-medium hover:text-syn-primary transition-colors">
            Documentation
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-syn-primary transition-colors">
            Contact
          </a>
          <Button asChild variant="outline" size="sm" className="ml-2">
            <a href="https://github.com/aman-jaglan/Synthesizer" className="flex items-center gap-2">
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </Button>
          <Button asChild size="sm" className="ml-2">
            <a href="https://pypi.org/project/synpro/">
              Install
            </a>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-syn-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-syn-primary"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 invisible'} overflow-hidden glass`}>
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            href="#features" 
            className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-100 hover:text-syn-primary"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a 
            href="#examples" 
            className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-100 hover:text-syn-primary"
            onClick={() => setIsOpen(false)}
          >
            Examples
          </a>
          <a 
            href="#documentation" 
            className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-100 hover:text-syn-primary"
            onClick={() => setIsOpen(false)}
          >
            Documentation
          </a>
          <a 
            href="#contact" 
            className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-100 hover:text-syn-primary"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button asChild variant="outline" className="w-full justify-center">
              <a href="https://github.com/aman-jaglan/Synthesizer" className="flex items-center gap-2">
                <Github size={16} />
                <span>GitHub</span>
              </a>
            </Button>
            <Button asChild className="w-full justify-center">
              <a href="https://pypi.org/project/synpro/">
                Install
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
