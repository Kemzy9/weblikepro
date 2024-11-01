'use client';
import React, { useState } from "react";
import { ImageIcon, Zap, Sparkles, Camera, Megaphone, Layout } from 'lucide-react';
import Image from "next/image";

const Gallery: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [generatedImageId, setGeneratedImageId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [imageType, setImageType] = useState<string>('photo');

  const imageTypes = [
    { value: 'image', icon: Camera, label: 'Photo', prompt: 'generate image' },
  


  ];

  const handleGenerate = async () => {
    if (!userPrompt) {
      alert('Please enter a prompt.');
      return;
    }
    setIsGenerating(true);
    try {
      const selectedType = imageTypes.find(type => type.value === imageType);
      const fullPrompt = `${selectedType?.prompt}, ${userPrompt}`;

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

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.dataTransfer.setData('text/plain', e.currentTarget.src);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center flex items-center justify-center">
        <Sparkles className="text-blue-600 mr-2" size={28} />
        AI Image Generator
      </h2>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select image type
          </label>
          <div className="flex flex-wrap gap-4">
            {imageTypes.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  value={option.value}
                  checked={imageType === option.value}
                  onChange={(e) => setImageType(e.target.value)}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center p-3 rounded-md transition-colors ${
                  imageType === option.value
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}>
                  <option.icon size={20} className="mr-2" />
                  {option.label}
                </div>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="prompt">
            Enter your prompt
          </label>
          <input
            id="prompt"
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder={`Describe the ${imageType} you want to generate`}
          />
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Zap className="animate-spin mr-3" size={20} />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="mr-3" size={20} />
              Generate {imageType.charAt(0).toUpperCase() + imageType.slice(1)}
            </>
          )}
        </button>
      </div>
      {generatedImageId && (
        <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Generated {imageType.charAt(0).toUpperCase() + imageType.slice(1)}</h3>
          <div className="relative aspect-square overflow-hidden rounded-md shadow-md">
            <Image
              src={`/api/users/generate/flux?id=${generatedImageId}`}
              alt={`Generated ${imageType}`} 
              className="w-full h-full object-cover"
              draggable="true"
              width={500}  // Specify the width (adjust as needed)
              height={300}
              onDragStart={handleDragStart}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
