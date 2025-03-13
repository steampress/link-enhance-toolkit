
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateMockProfileAnalysis, calculateOverallScore, ProfileSection as ProfileSectionType, sectionWeightages } from '@/utils/profileScoring';
import ProfileScore from '@/components/ui/ProfileScore';
import ProfileSection from '@/components/ProfileSection';
import ProfilePhotoEnhancer from '@/components/ProfilePhotoEnhancer';
import BackgroundImageGenerator from '@/components/BackgroundImageGenerator';
import GuidedProfileEditor from '@/components/GuidedProfileEditor';

const ProfileAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
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
    
    const handleTabChange = (e: CustomEvent) => {
      if (e.detail && e.detail.tabValue) {
        console.log("Received tab change event for:", e.detail.tabValue);
        setActiveTab(e.detail.tabValue);
      }
    };
    
    document.addEventListener('tabchange', handleTabChange as EventListener);
    return () => {
      document.removeEventListener('tabchange', handleTabChange as EventListener);
    };
  }, []);

  const handleAnalyze = () => {
    if (!profileUrl) {
      toast.error('Please enter your LinkedIn profile URL');
      return;
    }

    if (!profileUrl.includes('linkedin.com/in/')) {
      toast.error('Please enter a valid LinkedIn profile URL');
      return;
    }
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analyzedSections = generateMockProfileAnalysis(profileUrl);
      setSections(analyzedSections);
      setOverallScore(calculateOverallScore(analyzedSections));
      
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      toast.success('Profile analysis completed!');
    }, 2500);
  };

  return (
    <section id="profile-analyzer" className="py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="section-heading">Analyze Your LinkedIn Profile</h2>
          <p className="text-lg text-muted-foreground">
            Get personalized recommendations to optimize your profile and stand out to recruiters
          </p>
        </div>
        
        {!isAnalyzed ? (
          <div className="max-w-xl mx-auto glass-panel rounded-2xl p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="linkedin-url" className="label-text">
                  Enter Your LinkedIn Profile URL
                </label>
                <div className="mt-2">
                  <Input
                    id="linkedin-url"
                    className="input-field"
                    placeholder="https://www.linkedin.com/in/username"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Example: https://www.linkedin.com/in/your-username
                </p>
              </div>
              
              <Button 
                onClick={handleAnalyze} 
                className="w-full"
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
              
              <TabsContent value="sections" className="animate-fade-up">
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
              
              <TabsContent value="profile-photo" className="animate-fade-up">
                <ProfilePhotoEnhancer className="animate-fade-up" />
              </TabsContent>
              
              <TabsContent value="background" className="animate-fade-up">
                <BackgroundImageGenerator className="animate-fade-up" />
              </TabsContent>
              
              <TabsContent value="content" className="animate-fade-up">
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
