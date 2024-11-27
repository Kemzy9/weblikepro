'use client';
import React, { useState } from "react";
import { FiSearch, FiImage } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import Image from "next/image";


interface GeneratedImage {
  id: string;
}
interface GalleryProps {
  onSelectImage: (file: File, imageUrl: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onSelectImage }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [incomingImages, setIncomingImages] = useState<GeneratedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }

    try {
      const response = await fetch('/api/users/generate/weblike-fast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate images.');
      }

      const { images } = await response.json();
      setIncomingImages(images);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
      alert('Image generation failed. Please try again later.');
    }
  };

  const handleSelectImage = async (image: GeneratedImage) => {
    try {
      const imageUrl = `/api/users/generate/weblike-fast?id=${image.id}`;
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const blob = await response.blob();
      const file = new File([blob], `image-${image.id}.jpg`, { type: blob.type });
      setSelectedImageId(image.id);
      onSelectImage(file, imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-neutral-900" >
      <h2 className="text-2xl font-bold mb-6 text-white">Theme</h2>
      <div className="mb-8 bg-neutral-900 rounded-lg shadow-sm p-6">
        <div className="relative flex flex-col items-center">
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 pr-12 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition duration-200"
            placeholder="Enter your prompt here"
          />
          <button
            className="text-white bg-gradient-to-r from-violet-400 to-violet-600 hover:bg-gradient-to-l hover:from-teal-200 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-e-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center space-x-1"
            type="button"
            onClick={handleGenerate}
          >
            <Sparkles className="text-xl text-yellow-400 animate-pulse" />
            <span>Generate</span>
          </button>
        </div>
      </div>
      <div className="bg-neutral-900 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6 text-white"></h3>
        {incomingImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {incomingImages.map((image) => (
              <div
                key={image.id}
                className={`cursor-pointer overflow-hidden rounded-lg transition duration-200 hover:shadow-lg ${
                  selectedImageId === image.id ? 'ring-4 ring-indigo-500' : ''
                }`}
                onClick={() => handleSelectImage(image)}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={`/api/users/generate/weblike-fast?id=${image.id}`}
                    alt={`Generated Image`}
                    width={500}  // Specify the width (adjust as needed)
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiImage className="mx-auto text-5xl text-white mb-4" />
            <p className="text-white">No theme generated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
