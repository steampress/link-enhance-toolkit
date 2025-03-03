
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-24 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-foreground border border-accent/20 text-sm font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Elevate Your Professional Presence
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Transform Your <span className="text-primary">LinkedIn</span> Profile
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Our AI-powered tools analyze and optimize your LinkedIn profile to make it stand out to recruiters and connections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-12">
                Analyze My Profile
              </Button>
              <Button variant="outline" size="lg" className="h-12">
                Learn More
              </Button>
            </div>
            
            <div className="pt-6 text-muted-foreground">
              <p className="text-sm">Trusted by professionals from</p>
              <div className="flex flex-wrap gap-6 items-center pt-3">
                <div className="text-foreground/70 font-semibold">Microsoft</div>
                <div className="text-foreground/70 font-semibold">Google</div>
                <div className="text-foreground/70 font-semibold">Amazon</div>
                <div className="text-foreground/70 font-semibold">Meta</div>
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md bg-gradient-radial from-accent/20 to-transparent blur-2xl" />
            <div className="glass-panel rounded-2xl w-full max-w-md p-1">
              <div className="bg-background rounded-xl shadow-inner overflow-hidden">
                <div className="bg-primary/5 h-24 relative">
                  <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                    <div className="w-20 h-20 rounded-full border-4 border-background bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">LP</span>
                    </div>
                  </div>
                </div>
                <div className="pt-14 pb-6 px-6">
                  <h3 className="text-xl font-semibold">LinkedIn Profile</h3>
                  <p className="text-sm text-muted-foreground mt-1">Product Manager</p>
                  <div className="mt-6 space-y-2">
                    <div className="h-2.5 bg-secondary rounded animate-pulse-slow w-full" />
                    <div className="h-2.5 bg-secondary rounded animate-pulse-slow w-3/4" style={{ animationDelay: '0.2s' }} />
                    <div className="h-2.5 bg-secondary rounded animate-pulse-slow w-5/6" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-center">
                      <div className="font-medium">Profile Strength</div>
                      <div className="text-2xl font-bold text-primary mt-1">67%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Optimization</div>
                      <div className="text-2xl font-bold text-accent mt-1">8/12</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
