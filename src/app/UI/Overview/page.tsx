'use client';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const Overview: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b bg-white">
      {/* Background with subtle visual gradient */}


      <section className="relative flex flex-col lg:flex-row-reverse flex-1 pt-24 lg:pt-32 text-center lg:text-left z-10">
        <div className="flex flex-col lg:flex-row w-full py-12 px-6 lg:px-16 space-y-8 lg:space-y-0 lg:space-x-10">
          {/* Left Column - Text and Buttons */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 lg:space-y-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-wide">
              Create a Unique Logo

              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                for Your Brand in Minutes!
              </span>
            </h1>
            <p className="text-gray-700 text-lg lg:text-xl font-light">
              Ready to stand out? Our AI logo generator lets you create a custom logo that reflects your brands personality in just a few minutes-just enter your brand name and let our AI do the rest!
            </p>
            <p className="text-xl leading-relaxed max-w-md mb-6 flex items-center">
              <CheckCircle className="text-pink-500 mr-2" /> {/* Checkmark icon */}
              Unique Logo : Get logos tailored specifically to your brand.
            </p>
            <p className="text-xl leading-relaxed max-w-md mb-6 flex items-center">
              <CheckCircle className="text-pink-500 mr-2" /> {/* Checkmark icon */}
              Fast and Easy: Simple prompts lead to stunning results.
            </p>
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-6 justify-center lg:justify-start">
              <a
                href="#"
                className="px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-full shadow-lg transform transition-transform hover:scale-110 hover:shadow-xl"
              >
                Get Started
              </a>
          
            </div>
            
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src="/h2.png"
              alt="Modern web solutions"
              width={500}
              height={200}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>



        {/* Right Side with Image */}

      </section>
      <div className="flex flex-col lg:flex-row w-full py-12 px-6 lg:px-16 space-y-8 lg:space-y-0 lg:space-x-10">
        {/* Left Column - Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <Image
            src="/themgenerator.png"
            alt="Modern web solutions"
            width={500}
            height={300} // Adjusted height for better aspect ratio
            loading="lazy"
            className="object-cover w-70 h-80 rounded-lg shadow-md" // Added rounded corners and shadow
          />
        </div>

        {/* Right Column - Text and Buttons */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 lg:space-y-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-wide">
            Create Stunning Themes for Your Landing Page in Seconds!
          </h1>
          <p className="text-gray-700 text-lg lg:text-xl font-light">
            Transform your Landing Pages look effortlessly with our AI theme generator. Input your preferences, and watch as our AI crafts beautiful.
          </p>
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-6 justify-center lg:justify-start">
            <a
              href="/signup"
              className="px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] text-white font-semibold rounded-full shadow-lg transform transition-transform hover:scale-110 hover:shadow-xl"
            >
              Get Started
            </a>
          
          </div>
          
        </div>
      </div>


    </div>
  );
};

export default Overview;
