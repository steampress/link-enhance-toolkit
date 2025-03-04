
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image, Camera, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ProfilePhotoEnhancerProps {
  className?: string;
}

const ProfilePhotoEnhancer: React.FC<ProfilePhotoEnhancerProps> = ({ className }) => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [enhancedPhoto, setEnhancedPhoto] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setOriginalPhoto(reader.result as string);
        setEnhancedPhoto(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const enhancePhoto = () => {
    if (!originalPhoto) return;
    
    setIsEnhancing(true);
    
    // Simulate enhancement process (would integrate with real AI service in production)
    setTimeout(() => {
      setEnhancedPhoto(originalPhoto);
      setIsEnhancing(false);
      toast.success('Photo enhanced successfully!');
    }, 2000);
  };

  const downloadPhoto = () => {
    if (!enhancedPhoto) return;
    
    const link = document.createElement('a');
    link.href = enhancedPhoto;
    link.download = 'enhanced-linkedin-profile-photo.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`glass-panel rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Profile Photo Enhancer</h3>
      <p className="text-muted-foreground mb-6">
        Upload your profile photo to get an AI-enhanced version that makes a professional impression.
      </p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-2">Original Photo</div>
          {originalPhoto ? (
            <div className="relative rounded-lg overflow-hidden w-48 h-48 mb-4">
              <img src={originalPhoto} alt="Original" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-lg flex items-center justify-center w-48 h-48 mb-4">
              <Camera className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <Button 
            variant="outline" 
            onClick={triggerFileInput}
            className="flex items-center"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-2">Enhanced Photo</div>
          {enhancedPhoto ? (
            <div className="relative rounded-lg overflow-hidden w-48 h-48 mb-4 shadow-lg">
              <img src={enhancedPhoto} alt="Enhanced" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-lg flex items-center justify-center w-48 h-48 mb-4">
              <Image className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <div className="flex gap-2">
            <Button 
              onClick={enhancePhoto} 
              disabled={!originalPhoto || isEnhancing}
              className="flex items-center"
            >
              {isEnhancing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Image className="mr-2 h-4 w-4" />
                  Enhance Photo
                </>
              )}
            </Button>
            {enhancedPhoto && (
              <Button 
                variant="outline" 
                onClick={downloadPhoto}
                className="flex items-center"
              >
                Download
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoEnhancer;
