"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from next/router
import Image from 'next/image';
import { KeywordRoute } from '@/lib/keyword';
import { keywordRoutes } from '@/models/keyword';

// Change to default export and remove React.FC
const KeywordPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['all', ...Array.from(new Set(keywordRoutes.map(route => route.category)))];

  const filteredRoutes = keywordRoutes.filter(route => {
    const matchesCategory = selectedCategory === 'all' || route.category === selectedCategory;
    const matchesSearch = route.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleKeywordClick = (route: KeywordRoute) => {
    router.push(route.url);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutes.map((route) => (
          <div
            key={route.keyword}
            className="border rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleKeywordClick(route)}
          >
            <div className="relative h-48">
              <Image
                src={route.image}
                alt={route.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{route.title}</h3>
              <p className="text-gray-600 mb-4">{route.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{route.views} views</span>
                <span>{route.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordPage;