
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Camera, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ProfilePhotoEnhancerProps {
  className?: string;
}

const ProfilePhotoEnhancer: React.FC<ProfilePhotoEnhancerProps> = ({ className }) => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [enhancedPhoto, setEnhancedPhoto] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    
    // Create an image element from the original photo
    const img = document.createElement('img');
    img.onload = () => {
      // Create a canvas for processing
      const canvas = canvasRef.current;
      if (!canvas) {
        setIsEnhancing(false);
        toast.error('Canvas not available');
        return;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsEnhancing(false);
        toast.error('Canvas context not available');
        return;
      }
      
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);
      
      // Get the image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Remove background using a simple color threshold method
      // This is a simplified approach - more sophisticated ML-based approaches would be better in production
      removeBackground(imageData, data);
      
      // Put the modified image data back on the canvas
      ctx.putImageData(imageData, 0, 0);
      
      // Set the enhanced photo from the canvas
      setEnhancedPhoto(canvas.toDataURL('image/png'));
      setIsEnhancing(false);
      toast.success('Photo enhanced with background removed!');
    };
    
    img.src = originalPhoto;
  };
  
  const removeBackground = (imageData: ImageData, data: Uint8ClampedArray) => {
    // Simple background removal using edge detection and color thresholds
    // In a production app, you'd want to use a more sophisticated ML-based approach
    const width = imageData.width;
    const height = imageData.height;
    
    // Calculate the center of the image
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    
    // Assume the center of the image is part of the foreground (person)
    // Get color of the center pixel (this is a simplification)
    const centerIdx = (centerY * width + centerX) * 4;
    const centerR = data[centerIdx];
    const centerG = data[centerIdx + 1];
    const centerB = data[centerIdx + 2];
    
    // Process each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        
        // Calculate color distance from center pixel
        const colorDistance = Math.sqrt(
          Math.pow(r - centerR, 2) + 
          Math.pow(g - centerG, 2) + 
          Math.pow(b - centerB, 2)
        );
        
        // Calculate distance from edges
        const edgeDistX = Math.min(x, width - x);
        const edgeDistY = Math.min(y, height - y);
        const edgeFactor = Math.min(edgeDistX, edgeDistY) / Math.min(width, height) * 30;
        
        // If color is very different from center or close to edge, make it transparent
        // This is a simplified approach that may have varying results
        if (colorDistance > 80 + edgeFactor) {
          // Set to white with some transparency
          data[idx] = 255;     // Red
          data[idx + 1] = 255; // Green
          data[idx + 2] = 255; // Blue
          data[idx + 3] = 0;   // Alpha (transparent)
        }
      }
    }
  };

  const downloadPhoto = () => {
    if (!enhancedPhoto) return;
    
    const link = document.createElement('a');
    link.href = enhancedPhoto;
    link.download = 'enhanced-linkedin-profile-photo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`glass-panel rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Profile Photo Enhancer</h3>
      <p className="text-muted-foreground mb-6">
        After testing multiple free tools, I found <a href="https://picofme.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">picofme.io</a> to be the most reliable and easy to use. Check it out for yourself! If you just want minor polishing, use the tool below.
      </p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

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
            <div className="relative rounded-lg overflow-hidden w-48 h-48 mb-4 shadow-lg" style={{ backgroundColor: 'white' }}>
              <img src={enhancedPhoto} alt="Enhanced" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-lg flex items-center justify-center w-48 h-48 mb-4">
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
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
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Remove Background
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
