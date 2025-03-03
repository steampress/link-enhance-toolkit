
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileSectionProps {
  title: string;
  score: number;
  status: 'optimized' | 'needs-work' | 'incomplete';
  description: string;
  recommendations: string[];
  className?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  score,
  status,
  description,
  recommendations,
  className
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

  return (
    <div className={cn("glass-card p-6", className)}>
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
      
      <Button variant="outline" size="sm" className="w-full mt-2">
        Optimize This Section
      </Button>
    </div>
  );
};

export default ProfileSection;
