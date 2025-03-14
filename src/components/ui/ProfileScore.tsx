
import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const ProfileScore: React.FC<ProfileScoreProps> = ({ 
  score, 
  size = 'md',
  showLabel = true,
  className 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-green-500';
    if (score >= 55) return 'text-blue-500';
    if (score >= 40) return 'text-amber-500';
    if (score >= 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 85) return 'Top 1%';
    if (score >= 70) return 'Outstanding';
    if (score >= 55) return 'Excellent';
    if (score >= 40) return 'Good';
    if (score >= 25) return 'Progressing';
    return 'Getting Started';
  };
  
  const getScoreDescription = (score: number) => {
    if (score >= 85) return 'Your profile matches the quality of LinkedIn Top Voices for 2024';
    if (score >= 70) return 'Your profile shows exceptional posting frequency and engagement';
    if (score >= 55) return 'Your profile demonstrates strong content creation and networking';
    if (score >= 40) return 'Your profile has good activity and engagement potential';
    if (score >= 25) return 'Your profile is developing with more consistent posting';
    return 'Your profile has the foundation for a content strategy';
  };

  const sizesMap = {
    sm: {
      container: 'w-16 h-16',
      text: 'text-xl',
      thickness: 'border-3'
    },
    md: {
      container: 'w-24 h-24',
      text: 'text-2xl',
      thickness: 'border-5'
    },
    lg: {
      container: 'w-32 h-32',
      text: 'text-5xl',  // Increased from text-4xl
      thickness: 'border-6'
    },
  };

  const { container, text, thickness } = sizesMap[size];
  const scoreColor = getScoreColor(score);
  const scoreText = getScoreText(score);
  const scoreDescription = getScoreDescription(score);
  const rotation = (score / 100) * 360;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        className={cn(
          "relative rounded-full flex items-center justify-center", 
          container
        )}
        style={{
          background: `conic-gradient(${scoreColor} ${rotation}deg, #e5e7eb 0deg)`
        }}
      >
        <div className="absolute inset-0 rounded-full blur-sm opacity-30"
          style={{
            background: `conic-gradient(${scoreColor} ${rotation}deg, transparent 0deg)`
          }} 
        />
        <div className="bg-background rounded-full flex items-center justify-center w-[calc(100%-12px)] h-[calc(100%-12px)]">
          <span className={cn("font-bold", text, scoreColor)}>{score}%</span>
        </div>
      </div>
      {showLabel && (
        <div className="mt-2 text-center">
          <p className={cn("font-medium", scoreColor)}>{scoreText}</p>
          <p className="text-xs text-muted-foreground max-w-[200px]">{scoreDescription}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileScore;
