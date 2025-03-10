import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProfileScore from '@/components/ui/ProfileScore';
import ProfileSection from '@/components/ProfileSection';
import ProfilePhotoEnhancer from '@/components/ProfilePhotoEnhancer';
import BackgroundImageGenerator from '@/components/BackgroundImageGenerator';
import GuidedProfileEditor from '@/components/GuidedProfileEditor';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sectionWeightages, generateMockProfileAnalysis, calculateOverallScore, ProfileSection as ProfileSectionType } from '@/utils/profileScoring';

const ProfileAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const [profileContent, setProfileContent] = useState('');
  const [activeTab, setActiveTab] = useState('sections');
  const [sections, setSections] = useState<ProfileSectionType[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const demoSections = generateMockProfileAnalysis();
    setSections(demoSections);
    setOverallScore(calculateOverallScore(demoSections));
  }, []);

  useEffect(() => {
    console.log("Current active tab:", activeTab);
    
    const allTabTriggers = document.querySelectorAll('[data-value]');
    console.log("Available tabs:", Array.from(allTabTriggers).map(el => ({
      value: el.getAttribute('data-value'),
      text: el.textContent
    })));
  }, [activeTab]);

  const handleAnalyze = () => {
    if (!profileUrl && !profileContent) {
      toast.error('Please enter either a LinkedIn URL or paste your profile content');
      return;
    }
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analysisInput = profileContent || 
                           `LinkedIn URL: ${profileUrl} - We would fetch content from this URL in a real implementation`;
      
      const analyzedSections = generateMockProfileAnalysis(analysisInput);
      setSections(analyzedSections);
      setOverallScore(calculateOverallScore(analyzedSections));
      
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      toast.success('Profile analysis completed!');
    }, 2500);
  };

  return (
    <section id="profile-analyzer" className="py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="section-heading">Analyze Your LinkedIn Profile</h2>
          <p className="text-lg text-muted-foreground">
            Get personalized recommendations to optimize your profile and stand out to recruiters
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
            Calibrated with data from top 100 LinkedIn Voices
          </div>
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
            <div className="glass-panel rounded-2xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <ProfileScore score={overallScore} size="md" />
                <div className="text-center md:text-left md:flex-1">
                  <h3 className="text-xl font-semibold mb-1">Your Profile Score</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Based on our analysis calibrated with top LinkedIn voices, your profile scores {overallScore}%. Here's how we calculate your score:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {sectionWeightages.map((section) => (
                      <div key={section.id} className="bg-secondary/10 px-2 py-1 rounded text-xs flex items-center justify-between">
                        <span className="font-medium truncate mr-1">{section.title.split(' ')[0]}</span>
                        <span className="text-muted-foreground whitespace-nowrap">{Math.round(section.weight * 100)}%</span>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-4 w-full sm:w-auto" onClick={() => setIsAnalyzed(false)}>
                    Analyze Another Profile
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs 
              defaultValue="sections" 
              className="mb-6" 
              value={activeTab} 
              onValueChange={setActiveTab}
              data-tabs="profile-analyzer"
            >
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-4">
                <TabsTrigger value="sections" data-value="sections">Profile Sections</TabsTrigger>
                <TabsTrigger value="profile-photo" data-value="profile-photo">Profile Photo</TabsTrigger>
                <TabsTrigger value="background" data-value="background">Background</TabsTrigger>
                <TabsTrigger value="content" data-value="content">Content Editor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sections">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.map((section, index) => (
                    <ProfileSection
                      key={index}
                      {...section}
                      className="animate-fade-up flex flex-col"
                      animationDelay={`${index * 0.1}s`}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="profile-photo">
                <ProfilePhotoEnhancer className="animate-fade-up" />
              </TabsContent>
              
              <TabsContent value="background">
                <BackgroundImageGenerator className="animate-fade-up" />
              </TabsContent>
              
              <TabsContent value="content">
                <div className="space-y-6 animate-fade-up">
                  <GuidedProfileEditor section="headline" />
                  <GuidedProfileEditor section="summary" />
                  <GuidedProfileEditor section="experience" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileAnalyzer;
