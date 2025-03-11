
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-28 pb-12 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Calibrated with data from 100's of LinkedIn Top Voices and best practices!
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Transform Your <span className="text-primary">LinkedIn</span> Profile
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Our AI-powered tools analyze and optimize your LinkedIn profile to make it stand out to recruiters and connections.
            </p>
            
            <div className="pt-4">
              <Button 
                size="lg" 
                className="h-12"
                onClick={() => scrollToSection('profile-analyzer')}
              >
                Analyze My Profile
              </Button>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md bg-gradient-radial from-accent/20 to-transparent blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
