
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface ProfileSectionProps {
  title: string;
  score: number;
  status: 'optimized' | 'needs-work' | 'incomplete';
  description: string;
  recommendations: string[];
  className?: string;
  animationDelay?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  score,
  status,
  description,
  recommendations,
  className,
  animationDelay
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized': return 'text-green-500 bg-green-50';
      case 'needs-work': return 'text-amber-500 bg-amber-50';
      case 'incomplete': return 'text-red-500 bg-red-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimized': return 'Optimized';
      case 'needs-work': return 'Needs Work';
      case 'incomplete': return 'Incomplete';
      default: return 'Unknown';
    }
  };

  // Define the optimization targets based on section title
  const getOptimizationTarget = (title: string): { tab: string, url?: string, isExternal?: boolean } => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('photo') || titleLower.includes('background')) {
      return { tab: 'profile-photo' };
    } else if (titleLower.includes('headline') || titleLower.includes('summary')) {
      return { tab: 'content' };
    } else if (titleLower.includes('experience') || titleLower.includes('accomplishments')) {
      return { tab: 'content' };
    } else if (titleLower.includes('skills') || titleLower.includes('endorsements')) {
      return { 
        tab: '', 
        url: 'https://www.linkedin.com/help/linkedin/answer/a566049/request-a-recommendation',
        isExternal: true 
      };
    } else if (titleLower.includes('content') || titleLower.includes('activity')) {
      return { 
        tab: '', 
        url: 'https://www.linkedin.com/business/sales/blog/profile-best-practices/17-steps-to-a-better-linkedin-profile-in-2017',
        isExternal: true 
      };
    }
    
    // Default case
    return { tab: 'sections' };
  };

  const handleOptimize = () => {
    const { tab, url, isExternal } = getOptimizationTarget(title);
    
    if (isExternal && url) {
      window.open(url, '_blank');
    } else if (tab) {
      // Find the parent ProfileAnalyzer component and set its activeTab
      const profileAnalyzerTabs = document.querySelector('[data-tabs="profile-analyzer"]');
      if (profileAnalyzerTabs) {
        const tabTrigger = profileAnalyzerTabs.querySelector(`[data-value="${tab}"]`);
        if (tabTrigger && tabTrigger instanceof HTMLElement) {
          tabTrigger.click();
        }
      }
    }
  };

  return (
    <div 
      className={cn("glass-card p-6", className)}
      style={animationDelay ? { animationDelay } : undefined}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center space-x-4">
          <span 
            className={cn(
              "text-sm px-2 py-0.5 rounded font-medium",
              getStatusColor(status)
            )}
          >
            {getStatusText(status)}
          </span>
          <span className="font-semibold">{score}%</span>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          {recommendations.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-auto"
          onClick={handleOptimize}
        >
          {getOptimizationTarget(title).isExternal && (
            <ExternalLink className="h-4 w-4 mr-2" />
          )}
          Optimize This Section
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
