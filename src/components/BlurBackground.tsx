
import React from 'react';

const BlurBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse-slow" 
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" 
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" 
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
};

export default BlurBackground;
