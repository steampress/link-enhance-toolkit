
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

  const getOptimizationTarget = (title: string): { tab: string, url?: string, isExternal?: boolean } => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('photo')) {
      return { tab: 'profile-photo' };
    } else if (titleLower.includes('background')) {
      return { tab: 'background' };
    } else if (titleLower.includes('headline') || titleLower.includes('summary') || 
               titleLower.includes('experience') || titleLower.includes('accomplishments')) {
      return { tab: 'content' };
    } else if (titleLower.includes('skills') || titleLower.includes('endorsements')) {
      return { 
        tab: '', 
        url: 'https://www.forbes.com/sites/robinryan/2019/03/14/baby-boomers-how-to-get-valuable-linkedin-recommendations-and-endorsements/',
        isExternal: true 
      };
    } else if (titleLower.includes('content') || titleLower.includes('activity')) {
      return { 
        tab: '', 
        url: 'https://www.linkedin.com/pulse/11-hacks-writing-more-engaging-linkedin-posts-matt-cordas-02eie/',
        isExternal: true 
      };
    }
    return { tab: 'sections' };
  };

  const handleOptimize = () => {
    const { tab, url, isExternal } = getOptimizationTarget(title);
    
    if (isExternal && url) {
      window.open(url, '_blank');
    } else if (tab) {
      console.log(`Attempting to switch to tab: ${tab}`);
      
      // Get the tabs root and its value
      const tabsList = document.querySelector('[data-tabs="profile-analyzer"]');
      if (!tabsList) {
        console.error("Tabs container not found");
        return;
      }
      
      // Find the correct tab trigger
      const tabTrigger = tabsList.querySelector(`[data-value="${tab}"]`);
      if (tabTrigger instanceof HTMLElement) {
        console.log(`Found tab trigger for ${tab}, clicking it...`);
        
        // Create and dispatch a custom event that ProfileAnalyzer will listen for
        const event = new CustomEvent('tabchange', { 
          detail: { tabValue: tab },
          bubbles: true
        });
        tabTrigger.dispatchEvent(event);
        
        // Also perform a direct click for backup
        tabTrigger.click();
      } else {
        console.error(`Tab trigger for ${tab} not found`);
        
        // Fallback method - try to find the TabsTrigger by its content
        const allTriggers = document.querySelectorAll('[role="tab"]');
        for (const trigger of allTriggers) {
          if (trigger.textContent?.toLowerCase().includes(tab.replace('-', ' '))) {
            console.log(`Found tab by content: ${trigger.textContent}`);
            if (trigger instanceof HTMLElement) {
              trigger.click();
              break;
            }
          }
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
