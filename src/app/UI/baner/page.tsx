'use client';

import React from 'react';

const BuildByBanner = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://weblike.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full bg-black/90 px-4 py-2 text-sm text-white transition-all hover:bg-black"
      >
        <span className="font-medium">Built by</span>
        <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text font-semibold text-transparent">
          weblike.ai
        </span>
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  );
};

export default BuildByBanner;