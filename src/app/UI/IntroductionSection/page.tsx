

import {  Sparkles, FileText, Image as ImageIcon, Edit } from "lucide-react"; // Importing additional icons


import React from "react";

import Image from "next/image";

const ServicesSection = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}

      {/* Main Section */}
      <section className="bg-white py-12 overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4">
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 mt-8 lg:mt-0">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/buildsec.png"
                alt="Ai builder"
                width={500}
                height={400}
                loading="lazy"
                className="w-full h-36 sm:h-40 object-cover"
              />
            </div>

            <div className="col-span-2 rounded-lg overflow-hidden">
              <Image
                src="/overview.png"
                alt="Builder over view"
                width={500}
                height={400}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
          {/* Left Text Section */}
          <div className="lg:w-1/2 space-y-4">
            <div className="text-blue-600 text-sm font-semibold">
              

            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
            Turn Your Ideas Into Landing Pages with AI
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
            Experience seamless Landing Page creation by simply providing text prompts or screenshots. AI takes care of the rest.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <a href="/signup" className="bg-blue-700 text-white px-6 py-3 rounded-lg">
                Get Started
              </a>
            
              
            </div>
            
          </div>


        </div>
      </section>

      {/* Categories Section */}


    </div>
  );
};

export default ServicesSection;
