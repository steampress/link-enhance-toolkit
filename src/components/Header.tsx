
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for better positioning
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        scrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="font-semibold text-lg">LinkedPro</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-foreground/80 hover:text-primary transition-colors"
            onClick={(e) => scrollToSection('features', e)}
          >
            Features
          </a>
          <a 
            href="#profile-analyzer" 
            className="text-foreground/80 hover:text-primary transition-colors"
            onClick={(e) => scrollToSection('profile-analyzer', e)}
          >
            Profile Analyzer
          </a>
          <a 
            href="#testimonials" 
            className="text-foreground/80 hover:text-primary transition-colors"
            onClick={(e) => scrollToSection('testimonials', e)}
          >
            Testimonials
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
