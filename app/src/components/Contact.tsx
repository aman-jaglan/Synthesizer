
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Github, Mail, ExternalLink } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">Get in Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions or need support? We're here to help!
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-background/80 backdrop-blur-sm p-6 card-hover">
            <div className="flex flex-col h-full">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                <Github className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GitHub Issues</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Found a bug or want to suggest a new feature? Open an issue on our GitHub repository.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://github.com/aman-jaglan/Synthesizer/issues" className="flex items-center justify-center gap-2">
                  <span>Open an Issue</span>
                  <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm p-6 card-hover">
            <div className="flex flex-col h-full">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Need direct assistance? Contact the creator of SynPro via email.
              </p>
              <Button asChild className="w-full">
                <a href="mailto:amanwork2025@gmail.com" className="flex items-center justify-center gap-2">
                  <span>Contact via Email</span>
                  <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            SynPro is created by Aman Jaglan and is released under the MIT License.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
