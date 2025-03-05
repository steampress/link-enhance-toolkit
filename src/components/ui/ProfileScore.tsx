
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
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };
  
  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Your profile is well-optimized';
    if (score >= 60) return 'Your profile is above average';
    if (score >= 40) return 'Your profile needs improvement';
    return 'Your profile needs significant work';
  };

  const sizesMap = {
    sm: {
      container: 'w-16 h-16',
      text: 'text-xl',
      thickness: 'border-4'
    },
    md: {
      container: 'w-24 h-24',
      text: 'text-3xl',
      thickness: 'border-6'
    },
    lg: {
      container: 'w-32 h-32',
      text: 'text-4xl',
      thickness: 'border-8'
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
        <div className="bg-background rounded-full flex items-center justify-center w-[calc(100%-16px)] h-[calc(100%-16px)]">
          <span className={cn("font-bold", text, scoreColor)}>{score}%</span>
        </div>
      </div>
      {showLabel && (
        <div className="mt-2 text-center">
          <p className={cn("font-medium", scoreColor)}>{scoreText}</p>
          <p className="text-sm text-muted-foreground">{scoreDescription}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileScore;
