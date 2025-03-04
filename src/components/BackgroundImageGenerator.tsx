
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface BackgroundImageGeneratorProps {
  className?: string;
}

// Example background templates - in a production app, these might come from an API
const BACKGROUND_TEMPLATES = [
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&h=396&q=80',
  'https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&h=396&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&h=396&q=80',
  'https://images.unsplash.com/photo-1551737823-ddb9947f3710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&h=396&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&h=396&q=80',
];

// Industry-specific keywords to help modify the search query
const INDUSTRY_KEYWORDS = {
  'tech': ['coding', 'technology', 'software', 'programming', 'computer'],
  'finance': ['finance', 'banking', 'investment', 'trading', 'stocks'],
  'healthcare': ['healthcare', 'medical', 'hospital', 'doctor', 'wellness'],
  'creative': ['design', 'art', 'creative', 'studio', 'artwork'],
  'business': ['business', 'corporate', 'office', 'professional', 'meeting'],
  'education': ['education', 'learning', 'teacher', 'school', 'books'],
};

const BackgroundImageGenerator: React.FC<BackgroundImageGeneratorProps> = ({ className }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [backgroundOptions, setBackgroundOptions] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  const detectIndustry = (inputText: string): string => {
    // Simple industry detection based on keywords in the prompt
    const lowerInput = inputText.toLowerCase();
    
    for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        return industry;
      }
    }
    
    return 'business'; // Default to business if no specific industry detected
  };

  const generateImage = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your background image');
      return;
    }
    
    setIsGenerating(true);
    setBackgroundOptions([]);
    
    // Detect industry from the prompt
    const industry = detectIndustry(prompt);
    setSelectedIndustry(industry);
    
    // In a real app, this would call an AI image generation API
    // For now, we'll show pre-selected images based on the industry
    setTimeout(() => {
      // Get random selection of images from templates
      const shuffled = [...BACKGROUND_TEMPLATES].sort(() => 0.5 - Math.random());
      const selectedOptions = shuffled.slice(0, 3);
      
      setBackgroundOptions(selectedOptions);
      setGeneratedImage(selectedOptions[0]);
      setIsGenerating(false);
      toast.success('Background options generated! Choose the one you like best.');
    }, 2000);
  };

  const selectBackground = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
    toast.success('Background selected!');
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'linkedin-background.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`glass-panel rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Background Image Generator</h3>
      <p className="text-muted-foreground mb-6">
        Describe your ideal LinkedIn background image and let AI create it for you.
      </p>

      <div className="mb-6">
        <label htmlFor="image-prompt" className="block text-sm font-medium mb-2">
          Describe your ideal background (industry, style, theme)
        </label>
        <Input
          id="image-prompt"
          placeholder="e.g., Professional desk setup with computer and notebook in a bright office"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-3"
        />
        <Button 
          onClick={generateImage} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full md:w-auto"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image className="mr-2 h-4 w-4" />
              Generate Background
            </>
          )}
        </Button>
      </div>

      {backgroundOptions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">Select your preferred background:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {backgroundOptions.map((imageUrl, index) => (
              <div 
                key={index}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${generatedImage === imageUrl ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                onClick={() => selectBackground(imageUrl)}
              >
                <img 
                  src={imageUrl} 
                  alt={`Background option ${index + 1}`} 
                  className="w-full h-28 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {generatedImage && (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden w-full h-48 md:h-60">
            <img 
              src={generatedImage} 
              alt="Generated Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={downloadImage}
              className="flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundImageGenerator;
