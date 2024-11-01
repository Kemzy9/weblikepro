// src/app/weblike/weblike/gallery/page.tsx
'use client';
import Gallery from './Gallery';

export default function GalleryPage() {
  const handleSelectImage = (file: File, imageUrl: string) => {
    // Handle the image selection here or pass it to a parent component
    console.log('Selected image:', file, imageUrl);
  };

  return <Gallery onSelectImage={handleSelectImage} />;
}