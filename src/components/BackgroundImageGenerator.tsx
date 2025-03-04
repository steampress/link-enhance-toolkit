
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface BackgroundImageGeneratorProps {
  className?: string;
}

const BackgroundImageGenerator: React.FC<BackgroundImageGeneratorProps> = ({ className }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your background image');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate image generation (would integrate with real AI service in production)
    setTimeout(() => {
      // Use a placeholder image for demo purposes
      setGeneratedImage('https://source.unsplash.com/random/1584x396/?professional,workspace');
      setIsGenerating(false);
      toast.success('Background image generated!');
    }, 3000);
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
