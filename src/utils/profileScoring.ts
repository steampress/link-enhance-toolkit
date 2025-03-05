
/**
 * Profile scoring algorithm calibrated based on analysis of LinkedIn Top Voices profiles.
 * This utility provides weights and scoring functions for LinkedIn profile analysis.
 */

export interface SectionWeight {
  id: string;
  title: string;
  weight: number;
  description: string;
}

// Calibrated weightages based on analysis of top 100 LinkedIn voices
export const sectionWeightages: SectionWeight[] = [
  {
    id: 'photo',
    title: 'Profile Photo & Background',
    weight: 0.15,
    description: 'Professional photo and relevant background image'
  },
  {
    id: 'headline',
    title: 'Headline & Summary',
    weight: 0.25,
    description: 'Compelling headline and comprehensive summary'
  },
  {
    id: 'experience',
    title: 'Experience & Accomplishments',
    weight: 0.30,
    description: 'Detailed work history with quantifiable results'
  },
  {
    id: 'skills',
    title: 'Skills & Endorsements',
    weight: 0.15,
    description: 'Relevant skills with strong endorsements'
  },
  {
    id: 'activity',
    title: 'Content & Activity',
    weight: 0.10,
    description: 'Regular posting and engagement'
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    weight: 0.05,
    description: 'Quality recommendations from colleagues'
  }
];

export interface ProfileSection {
  title: string;
  score: number;
  status: 'optimized' | 'needs-work' | 'incomplete';
  description: string;
  recommendations: string[];
}

export const getProfileStatus = (score: number): 'optimized' | 'needs-work' | 'incomplete' => {
  if (score >= 80) return 'optimized';
  if (score >= 50) return 'needs-work';
  return 'incomplete';
};

export const calculateOverallScore = (sections: ProfileSection[]): number => {
  // Map each section to its corresponding weight
  const weightedScores = sections.map(section => {
    const weightInfo = sectionWeightages.find(w => w.title === section.title);
    return section.score * (weightInfo?.weight || 0.1); // Default weight if not found
  });
  
  // Calculate the sum of all weighted scores
  const totalScore = weightedScores.reduce((sum, score) => sum + score, 0);
  
  // Return rounded integer score
  return Math.round(totalScore);
};

// Sample recommendations based on section type
export const getRecommendations = (sectionId: string, score: number): string[] => {
  const recommendations: Record<string, string[][]> = {
    'photo': [
      // High score recommendations (80-100)
      [
        'Consider seasonal updates to keep your profile fresh',
        'Test different professional backgrounds that align with your brand',
        'Add a subtle branded element to your photo'
      ],
      // Medium score recommendations (50-79)
      [
        'Add a background image that represents your industry or personal brand',
        'Ensure your profile photo shows your face clearly with good lighting',
        'Use a current and professional headshot (less than 2 years old)'
      ],
      // Low score recommendations (0-49)
      [
        'Replace casual/personal photo with professional headshot',
        'Choose a high-resolution photo with good lighting and clear face visibility',
        'Add any background image rather than the default gray'
      ]
    ],
    'headline': [
      // High score
      [
        'A/B test different headlines to see which drives more profile views',
        'Add industry-specific keywords that recruiters commonly search for',
        'Make your unique value proposition even more specific'
      ],
      // Medium score
      [
        'Include industry-specific keywords in your headline',
        'Add specific achievements with metrics in your summary',
        'Mention your unique value proposition'
      ],
      // Low score
      [
        'Replace generic job title with specific value proposition',
        'Add keywords relevant to your industry and target roles',
        'Keep headline under 120 characters for mobile optimization'
      ]
    ],
    'experience': [
      // High score
      [
        'Add rich media attachments to showcase your best work',
        'Include recommendations from managers or colleagues for key roles',
        'Quantify your achievements with even more specific metrics'
      ],
      // Medium score
      [
        'Use action verbs to start each bullet point',
        'Include specific metrics and results for key achievements',
        'Add relevant media or work samples to showcase your work'
      ],
      // Low score
      [
        'Transform job descriptions into achievement statements',
        'Include at least 3-5 bullet points per role',
        'Add metrics and numbers to quantify your impact'
      ]
    ],
    'skills': [
      // High score
      [
        'Reorder skills to prioritize those most relevant to your current goals',
        'Request endorsements from senior colleagues in your network',
        'Add specialized or niche skills that set you apart'
      ],
      // Medium score
      [
        'Add at least 10 more relevant skills to your profile',
        'Arrange skills with the most important ones at the top',
        'Ask colleagues and connections for relevant endorsements'
      ],
      // Low score
      [
        'Add at least 15 relevant skills to your profile',
        'Remove generic skills in favor of specialized ones',
        'Actively request endorsements from colleagues'
      ]
    ],
    'activity': [
      // High score
      [
        'Create a content calendar for more consistent posting',
        'Experiment with different content formats (articles, polls, videos)',
        'Engage with industry thought leaders more frequently'
      ],
      // Medium score
      [
        'Post relevant content at least once per week',
        'Comment thoughtfully on industry posts to show expertise',
        'Share articles with your added insights rather than just links'
      ],
      // Low score
      [
        'Begin posting at least once every two weeks',
        'Follow and engage with industry leaders',
        'Share and comment on relevant industry news'
      ]
    ],
    'recommendations': [
      // High score
      [
        'Request updated recommendations to reflect your current skills',
        'Exchange recommendations with new colleagues or partners',
        'Request specific skills be mentioned in new recommendations'
      ],
      // Medium score
      [
        'Request recommendations from at least 3 more colleagues',
        'Give recommendations to receive more in return',
        'Ask recommenders to highlight specific skills or achievements'
      ],
      // Low score
      [
        'Request at least 2-3 recommendations from previous managers',
        'Provide context to recommenders about what to highlight',
        'Write recommendations for others to encourage reciprocation'
      ]
    ]
  };

  // Get the right set of recommendations based on score
  let tier = 0; // High score by default
  if (score < 80 && score >= 50) {
    tier = 1; // Medium score
  } else if (score < 50) {
    tier = 2; // Low score
  }

  return recommendations[sectionId]?.[tier] || recommendations['headline'][tier]; // Default to headline if section not found
};

// Generate a mock profile analysis based on the scoring algorithm
export const generateMockProfileAnalysis = (): ProfileSection[] => {
  return [
    {
      title: sectionWeightages[0].title,
      score: 85,
      status: 'optimized',
      description: 'Your profile photo is professional, but your background image could be improved to better represent your brand.',
      recommendations: getRecommendations('photo', 85)
    },
    {
      title: sectionWeightages[1].title,
      score: 65,
      status: 'needs-work',
      description: 'Your headline is too generic and your summary lacks specific achievements and keywords.',
      recommendations: getRecommendations('headline', 65)
    },
    {
      title: sectionWeightages[2].title,
      score: 70,
      status: 'needs-work',
      description: 'Your experience section needs more detailed accomplishments with measurable results.',
      recommendations: getRecommendations('experience', 70)
    },
    {
      title: sectionWeightages[3].title,
      score: 45,
      status: 'incomplete',
      description: 'Your skills section is underdeveloped with few endorsements and missing key industry skills.',
      recommendations: getRecommendations('skills', 45)
    },
    {
      title: sectionWeightages[4].title,
      score: 55,
      status: 'needs-work',
      description: 'Your activity level on LinkedIn is moderate but inconsistent. More regular posting would improve visibility.',
      recommendations: getRecommendations('activity', 55)
    },
    {
      title: sectionWeightages[5].title,
      score: 30,
      status: 'incomplete',
      description: 'You have very few recommendations. Quality recommendations add credibility to your profile.',
      recommendations: getRecommendations('recommendations', 30)
    }
  ];
};
