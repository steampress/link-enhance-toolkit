
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProfileAnalyzer from '@/components/ProfileAnalyzer';
import OptimizationTips from '@/components/OptimizationTips';
import Footer from '@/components/Footer';
import BlurBackground from '@/components/BlurBackground';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const features = [
    {
      title: 'Profile Analysis',
      description: 'Get a comprehensive analysis of your LinkedIn profile with detailed scoring for each section.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2V8H8V2H10ZM6 12V18H4V12H6ZM18 6V18H16V6H18ZM14 10V18H12V10H14Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Content Optimization',
      description: 'Discover how to enhance your profile content with actionable recommendations for each section.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 3H3V6.5H6.5V3ZM8 3V6.5H21V3H8ZM6.5 8H3V11.5H6.5V8ZM8 8V11.5H21V8H8ZM6.5 13H3V16.5H6.5V13ZM8 13V16.5H21V13H8ZM6.5 18H3V21.5H6.5V18ZM8 18V21.5H21V18H8Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Keyword Enhancement',
      description: 'Find the most effective industry-specific keywords to help your profile appear in more searches.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5 21.5L16.8 16.8M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Visual Improvement',
      description: 'Learn how to enhance your profile's visual elements including photos, media, and layout.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8.5H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Network Growth',
      description: 'Strategies to expand your professional network and get more profile views and connection requests.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Recruiter Insights',
      description: 'Understand how recruiters search for candidates and how to position your profile to be discovered.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16V21M12 21H7M12 21H17M17 16V14C17 13.4477 16.5523 13 16 13H8C7.44772 13 7 13.4477 7 14V16M15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen">
      <BlurBackground />
      <Header />
      
      <main>
        <Hero />
        
        <section id="features" className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-heading">Optimize Every Aspect of Your Profile</h2>
              <p className="text-lg text-muted-foreground">
                Our comprehensive toolkit helps you enhance your LinkedIn presence and maximize opportunities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  {...feature}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </section>
        
        <ProfileAnalyzer />
        
        <OptimizationTips />
        
        <section className="py-20">
          <div className="container-custom">
            <div className="glass-panel rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                    Ready to Stand Out?
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Transform Your LinkedIn Profile Today
                  </h2>
                  <p className="text-muted-foreground">
                    Join thousands of professionals who have enhanced their LinkedIn presence and attracted more opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button className="btn-primary h-12 px-6">
                      Get Started
                    </button>
                    <button className="btn-outline h-12 px-6">
                      Learn More
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-end">
                  <div className="relative">
                    <div className="absolute -z-10 inset-0 bg-gradient-radial from-accent/10 to-transparent blur-xl opacity-70" />
                    <div className="glass-card p-6 max-w-sm text-left">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5286 20 9.14629 19.6916 7.94363 19.1486C7.60579 19.0096 7.43687 18.9401 7.32542 18.9392C7.21397 18.9382 7.13063 18.9668 6.96394 19.0239C6.79726 19.081 6.5967 19.1973 6.19558 19.4299L3.5 21L4.5286 17.9142C4.75212 17.2184 4.86387 16.8705 4.85465 16.6701C4.84542 16.4698 4.82222 16.3755 4.73449 16.1379C4.3126 15.1952 4.07103 14.1404 4.07103 13.034C4.07103 8.616 7.9386 5 12.1585 5C15.5305 5 18.4476 7.17615 19.6178 10.1256" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Testimonial</div>
                          <h4 className="font-semibold">Sarah Johnson</h4>
                          <p className="text-sm text-muted-foreground">Marketing Director</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "After optimizing my LinkedIn profile with LinkedPro, I received 3x more recruiter messages and landed my dream job within a month!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
