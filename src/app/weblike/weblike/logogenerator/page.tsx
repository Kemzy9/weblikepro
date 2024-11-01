'use client';
import React, { useState } from "react";
import { ImageIcon, Zap, Eraser, Type, Triangle, User, Shield, Coffee, BugIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import Image from "next/image";
interface LogoGeneratorProps {}

const LogoGenerator: React.FC<LogoGeneratorProps> = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageType, setImageType] = useState<string>('default');
  const [selectedLogoType, setSelectedLogoType] = useState<any>(null);
  const [generatedImageId, setGeneratedImageId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRemovingBackground, setIsRemovingBackground] = useState<boolean>(false);

  const logoTypes = [
    { value: 'default', label: 'Default', icon: ImageIcon, description: 'A general logo design' },
    { value: '3d', label: '3D Logo', icon: Zap, description: 'Three-dimensional design for a modern and dynamic look' },
    { value: 'wordmark', label: 'Wordmark', icon: Type, description: 'Text-based logo design (e.g., Google, Coca-Cola)' },
    { value: 'monogram', label: 'Lettermark', icon: Eraser, description: 'Logo made of initials or letters (e.g., HBO, IBM)' },
    { value: 'pictorial', label: 'Pictorial', icon: ImageIcon, description: 'Graphic symbol representing the brand (e.g., Apple, Twitter)' },
    { value: 'abstract', label: 'Abstract', icon: Triangle, description: 'Conceptual symbol representing the brand (e.g., Nike swoosh)' },
    { value: 'mascot', label: 'Mascot', icon: User, description: 'Character-based logo representing the brand (e.g., KFC)' },
    { value: 'combination', label: 'Combination', icon: BugIcon, description: 'Logo combining text with an icon or symbol (e.g., Adidas)' },
    { value: 'emblem', label: 'Emblem', icon: Shield, description: 'Text inside a symbol or badge (e.g., Starbucks, Harley-Davidson)' },
  ];

  const handleLogoTypeClick = (type: any) => {
    setImageType(type.value);
    setSelectedLogoType(type);
  };

  const handleGenerate = async () => {
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }
    setIsGenerating(true);
    try {
      let fullPrompt = prompt;
      switch (imageType) {
        case '3d':
          fullPrompt = `Generate 3D logo: ${prompt}`;
          break;
        case 'wordmark':
          fullPrompt = `Wordmark Logotype: ${prompt}`;
          break;
        case 'monogram':
          fullPrompt = `Generate Monogram Logos Lettermark: ${prompt}`;
          break;
        case 'pictorial':
          fullPrompt = `Generate Pictorial Mark logo: ${prompt}`;
          break;
        case 'abstract':
          fullPrompt = `Generate logo Abstract Mark: ${prompt}`;
          break;
        case 'mascot':
          fullPrompt = `Mascot Logo: ${prompt}`;
          break;
        case 'combination':
          fullPrompt = `Generate Combination Mark logo: ${prompt}`;
          break;
        case 'emblem':
          fullPrompt = `Emblem Logo: ${prompt}`;
          break;
        default:
          fullPrompt = prompt;
      }

      const response = await fetch(`/api/users/generate/flux`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image.');
      }

      const { images } = await response.json();
      if (images && images.length > 0) {
        setGeneratedImageId(images[0].id);
      } else {
        throw new Error('No image generated.');
      }
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
      alert('Image generation failed. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!generatedImageId) return;
    setIsRemovingBackground(true);
    try {
      const response = await fetch(`/api/users/generate/flux?id=${generatedImageId}`);
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      const img = new globalThis.Image(); // Fix: Added globalThis to access the Image constructor
      img.src = URL.createObjectURL(blob);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Get the color of the top-left pixel (assumed to be background)
        const bgColor = {
          r: data[0],
          g: data[1],
          b: data[2],
        };

        // Define a threshold for color matching
        const threshold = 30;

        // Loop through all pixels
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If the pixel color is close to the background color, make it transparent
          if (
            Math.abs(r - bgColor.r) < threshold &&
            Math.abs(g - bgColor.g) < threshold &&
            Math.abs(b - bgColor.b) < threshold
          ) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const processedImageUrl = canvas.toDataURL('image/png');
        setGeneratedImageId(processedImageUrl);
        setIsRemovingBackground(false);
      };

      img.onerror = () => {
        throw new Error('Failed to load image');
      };
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
      alert('Background removal failed. Please try again later.');
      setIsRemovingBackground(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Logo Generator</h2>
      <div className="flex space-x-6">
        <div className="w-1/4 border-r pr-4">
          <h3 className="text-lg font-semibold mb-4">Logo Type</h3>
          <div className="space-y-2">
            {logoTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleLogoTypeClick(type)}
                className={`flex items-center w-full p-2 rounded-md transition-all ${
                  imageType === type.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <type.icon className="w-5 h-5 mr-2" />
                <span className="text-sm">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-grow space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="prompt">
              Describe Your Logo
            </label>
            <input
              id="prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="E.g., A modern tech company logo with vibrant colors"
            />
          </div>
          <div className="bg-indigo-200 p-4 rounded-md">
            <h4 className="font-medium mb-2">Selected Logo Type: {selectedLogoType?.label || 'None'}</h4>
            <p className="text-sm text-gray-600">{selectedLogoType?.description || 'Select a logo type to see its description.'}</p>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center text-lg"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Zap className="animate-spin mr-2" size={24} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles/>
                Generate Logo
              </>
            )}
          </button>
        </div>
      </div>
      {generatedImageId && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Generated Logo</h3>
          <div className="flex items-center justify-between mb-4">
            <Image
              src={generatedImageId.startsWith('data:') ? generatedImageId : `/api/users/generate/flux?id=${generatedImageId}`}
              alt="Generated Logo" 
              width={500}
              height={300}
              className="w-1/2 h-auto rounded-lg shadow-md"
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center"
              onClick={handleRemoveBackground}
              disabled={isRemovingBackground}
            >
              {isRemovingBackground ? (
                <>
                  <Zap className="animate-spin mr-2" size={20} />
                  Removing...
                </>
              ) : (
                <>
                  <Eraser className="mr-2" size={20} />
                  Remove Background
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoGenerator;
