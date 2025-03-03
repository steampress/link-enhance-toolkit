import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TipProps {
  title: string;
  description: string;
  tag: string;
  className?: string;
}

export const Tip: React.FC<TipProps> = ({ 
  title, 
  description, 
  tag,
  className 
}) => {
  return (
    <Card className={cn("h-full border border-border/50 transition-all duration-300 hover:border-accent/40 hover:shadow-soft", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary font-semibold">
            {tag}
          </span>
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const OptimizationTips: React.FC = () => {
  const tips = [
    {
      title: "Use Action Verbs",
      description: "Begin bullets with powerful action verbs like 'Achieved', 'Delivered', 'Transformed' to make your accomplishments stand out.",
      tag: "Content",
    },
    {
      title: "Quantify Achievements",
      description: "Include numbers and percentages to demonstrate your impact, e.g., 'Increased sales by 25%' rather than just 'Increased sales'.",
      tag: "Impact",
    },
    {
      title: "Optimize Your Headline",
      description: "Go beyond just your job title. Include your specialty, value proposition, and keywords relevant to your industry.",
      tag: "Visibility",
    },
    {
      title: "Professional Photo",
      description: "Use a high-quality, professional headshot with good lighting and a simple background. Dress professionally and smile.",
      tag: "Appearance",
    },
    {
      title: "Customize Your URL",
      description: "Create a personalized LinkedIn URL with your name to enhance your professional brand and make it easier to share.",
      tag: "Branding",
    },
    {
      title: "Skills Section",
      description: "Include a mix of hard skills (technical abilities) and soft skills (interpersonal traits) that are most relevant to your industry.",
      tag: "Keywords",
    },
  ];

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="section-heading">Expert Optimization Tips</h2>
          <p className="text-lg text-muted-foreground">
            Apply these proven strategies to make your LinkedIn profile stand out from the competition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <Tip
              key={index}
              {...tip}
              className="animate-fade-up"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizationTips;
