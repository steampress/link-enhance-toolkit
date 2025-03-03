
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProfileScore from '@/components/ui/ProfileScore';
import ProfileSection from '@/components/ProfileSection';
import { toast } from 'sonner';

const ProfileAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const [profileContent, setProfileContent] = useState('');

  const handleAnalyze = () => {
    if (!profileUrl && !profileContent) {
      toast.error('Please enter either a LinkedIn URL or paste your profile content');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      toast.success('Profile analysis completed!');
    }, 2500);
  };
  
  const sections = [
    {
      title: 'Profile Photo & Background',
      score: 85,
      status: 'optimized' as const,
      description: 'Your profile photo is professional, but your background image could be improved to better represent your brand.',
      recommendations: [
        'Add a background image that represents your industry or personal brand',
        'Ensure your profile photo shows your face clearly with good lighting'
      ]
    },
    {
      title: 'Headline & Summary',
      score: 65,
      status: 'needs-work' as const,
      description: 'Your headline is too generic and your summary lacks specific achievements and keywords.',
      recommendations: [
        'Include industry-specific keywords in your headline',
        'Add specific achievements with metrics in your summary',
        'Mention your unique value proposition'
      ]
    },
    {
      title: 'Experience & Accomplishments',
      score: 70,
      status: 'needs-work' as const,
      description: 'Your experience section needs more detailed accomplishments with measurable results.',
      recommendations: [
        'Use action verbs to start each bullet point',
        'Include specific metrics and results for key achievements',
        'Add relevant media or work samples to showcase your work'
      ]
    },
    {
      title: 'Skills & Endorsements',
      score: 45,
      status: 'incomplete' as const,
      description: 'Your skills section is underdeveloped with few endorsements and missing key industry skills.',
      recommendations: [
        'Add at least 10 more relevant skills to your profile',
        'Arrange skills with the most important ones at the top',
        'Ask colleagues and connections for relevant endorsements'
      ]
    }
  ];

  return (
    <section id="profile-analyzer" className="py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="section-heading">Analyze Your LinkedIn Profile</h2>
          <p className="text-lg text-muted-foreground">
            Get personalized recommendations to optimize your profile and stand out to recruiters
          </p>
        </div>
        
        {!isAnalyzed ? (
          <div className="max-w-2xl mx-auto glass-panel rounded-2xl p-8">
            <div className="grid gap-6">
              <div>
                <label htmlFor="linkedin-url" className="label-text">
                  LinkedIn Profile URL
                </label>
                <Input
                  id="linkedin-url"
                  className="input-field"
                  placeholder="https://www.linkedin.com/in/username"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                />
              </div>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="mx-4 flex-shrink text-muted-foreground text-sm">OR</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              
              <div>
                <label htmlFor="profile-content" className="label-text">
                  Paste Your Profile Content
                </label>
                <Textarea
                  id="profile-content"
                  className="input-field min-h-40"
                  placeholder="Paste the content from your LinkedIn profile..."
                  value={profileContent}
                  onChange={(e) => setProfileContent(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleAnalyze} 
                className="w-full mt-4"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze My Profile'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-up">
            <div className="glass-panel rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left md:flex-1">
                  <h3 className="text-xl font-semibold mb-2">Your Profile Score</h3>
                  <p className="text-muted-foreground max-w-md">
                    Based on our analysis, your LinkedIn profile scores well in some areas but has room for improvement.
                  </p>
                  <Button className="mt-6" onClick={() => setIsAnalyzed(false)}>
                    Analyze Another Profile
                  </Button>
                </div>
                <ProfileScore score={67} size="lg" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section, index) => (
                <ProfileSection
                  key={index}
                  {...section}
                  className="animate-fade-up"
                  animationDelay={`${index * 0.1}s`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileAnalyzer;
