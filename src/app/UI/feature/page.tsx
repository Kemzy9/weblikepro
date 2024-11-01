'use client'
import Image from 'next/image';
import React from 'react';
import { CheckCircle } from 'lucide-react'; // Import the check circle icon

const Section10: React.FC = () => {
  return (
    <div className="bg-darkblue flex overflow-hidden items-center justify-center min-h-screen relative text-white px-9">

      {/* Top Left Triangle */}
      <div className="absolute top-0 left-0 triangle top-left-triangle"></div>

      {/* Top Right Triangle */}
      <div className="absolute top-0 right-0 triangle top-right-triangle"></div>

      {/* Bottom Left Triangle */}
      <div className="absolute bottom-0 left-0 triangle bottom-left-triangle"></div>

      {/* Bottom Right Triangle */}
      <div className="absolute bottom-0 right-0 triangle bottom-right-triangle"></div>

      {/* Content Layout - Two Columns */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side Image */}
        <div className="w-auto h-auto perspective" style={{ perspective: '1000px' }}>
                        <video
                            src="/weblike-Ai-image-generator.mp4"
                            width="900"
                            height="400"
                            autoPlay
                            loop
                            muted
                            className=""
                        />
                    </div>

        {/* Right Side Text */}
        <div className="text-black flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-4 tracking-widest">
            Create Stunning Images in Seconds
          </h1>
          <p className="text-lg leading-relaxed max-w-md mb-4">
            Need high-quality images fast? Our AI-powered tool can generate unique visuals for your Landing Page in seconds. Just type in what you want, and AI will handle the rest.
          </p>
          <p className="text-lg leading-relaxed max-w-md mb-4 flex items-center">
            <CheckCircle className="text-pink-500 mr-2" /> {/* Checkmark icon */}
            Add Colors, themes, and more, all tailored to your brand.
          </p>
          <p className="text-lg leading-relaxed max-w-md mb-4 flex items-center">
            <CheckCircle className="text-pink-500 mr-2" /> {/* Checkmark icon */}
            Fast and Easy: Get pro-level images instantly.
          </p>
          <button className="px-8 py-3 bg-pink-500 rounded-full text-white text-lg font-semibold transition-transform transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>

      <style jsx>{`
        .triangle {
          width: 0;
          height: 0;
          border-style: solid;
        }

        .top-left-triangle {
          border-width: 0 200px 200px 0;
          border-color: transparent #ff5a79 transparent transparent;
        }

        .top-right-triangle {
          border-width: 0 0 200px 200px;
          border-color: transparent transparent #fdd835 transparent;
        }

        .bottom-left-triangle {
          border-width: 200px 200px 0 0;
          border-color: #007cf0 transparent transparent transparent;
        }

        .bottom-right-triangle {
          border-width: 200px 0 0 200px;
          border-color: transparent transparent transparent #00dfd8;
        }
      `}</style>
    </div>
  );
};

export default Section10;
