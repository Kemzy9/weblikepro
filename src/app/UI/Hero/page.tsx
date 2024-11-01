'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/UI/logo/page';
import Head from 'next/head';
import StructuredData from '@/app/structuredata/page'
const HeroSection: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">


   <Head>
        <title>Weblike AI  - AI-Powered Landing Page Builder | Create Ai web page& landing Pages Instantly</title>
        <meta name="description" content="Create professional and ultra unique landing pages instantly with Weblike ai 's AI-powered web builder. Transform your ideas into high-converting pages without coding or design skills." />
        <meta name="keywords" content="landing page builder, AI landing pages, website builder, conversion optimization, custom landing pages, web design, Weblike ai " />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:title" content="Weblike ai  - Create Custom Landing Pages with AI" />
        <meta property="og:description" content="Build professional landing pages in minutes with our AI-powered platform. No coding required. Start converting more visitors today!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://weblike.ai/twitter-card.png" />
        <meta property="og:url" content="https://weblike.ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@weblikeai" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href="https://weblike.ai" />
        {/* Add these lines to include your favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <StructuredData />
        
      </Head>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-2 flex justify-between items-center">
        {/* Logo and brand name */}
        <div className="flex items-center space-x-4">
          <Logo />
          <span className="ml-2 text-xl font-semibold text-white">Weblike</span>
        </div>
       

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/signup" className="text-black bg-white shadow-lg hover:shadow-xl font-extralight rounded-full text-lg px-4 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
            Sign In
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden bg-purple-400 text-white p-2 rounded">
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-slate-400 text-white z-20">
          <nav className="flex flex-col items-center py-4">
            <Link href="/signup" className="block py-2 px-4 text-lg">Sign In</Link>
            <Link href="/about" className="block py-2 px-4 text-lg">About</Link>
            <Link href="/blogs" className="block py-2 px-4 text-lg">Blogs</Link>
          </nav>
        </div>
      )}

      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-indigo-600"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
      />

  

<main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 pt-24 lg:pt-32 z-10 font-sans">
  {/* Left side - Text content */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 lg:space-y-12 text-center lg:text-left">
    <h1 className="text-4xl lg:text-4xl font-normal text-white leading-tight tracking-tight">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-light">
        Instant
      </span>
      <br />
      <span className="font-extrabold">Landing Pages</span>
      <br />
      <span className="text-3xl lg:text-5xl font-medium text-blue-200 tracking-wide">
        Achieve Results Faster
      </span>
    </h1>

    <div className="space-y-6">
      <p className="text-white text-xl lg:text-xl font-light leading-relaxed">
        <span className="font-medium text-blue-300 uppercase tracking-wider">Create, iterate, and optimize</span> your pages instantly—transform every campaign into a success story.
        Say goodbye to generic layouts—every landing page Weblike make is a fresh original.
      </p>

      <p className="text-white text-lg lg:text-xl font-normal tracking-wide">
        From Text to Landing Page in Minutes.
      </p>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6">
        <p className="text-blue-100 text-lg lg:text-xl font-light">
          Just describe your idea, and AI instantly generates your Landing Page.
          <span className="block mt-2 font-medium text-yellow-300 tracking-wide">No generic layouts, No designers or developers needed.</span>
        </p>
      </div>
    </div>

    <div className="flex justify-center lg:justify-start items-center space-x-4">
      <Link href="/signup" className="px-8 py-4  bg-white text-black font-medium rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:to-purple-700 uppercase tracking-wider">
        Get Started
      </Link>
      <span className="text-white text-sm lg:text-base font-light tracking-wide">
        Start creating in minute
      </span>
    </div>
  </div>

  {/* Right side - Image */}
  <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
    <div className="flex justify-center lg:justify-end overflow-hidden">
      <Image
        src="/AI web builder Image.png"
        alt="AI web builder Image"
        width={400}
        height={300}
        loading="lazy"
        className="w-90 h-90 transform transition-transform duration-500 hover:scale-105"
      />
    </div>
  </div>
</main>

      {/* Footer section with video */}
      <footer className="relative text-center text-white z-10 mt-12 lg:mt-16">
        <h2 className="text-4xl font-normal lg:text-3xl mb-4">
          Click, Build, Convert—All in One Go
        </h2>
        <h3 className="text-xl lg:text-2xl text-blue-100 mb-6">

          <p className="text-xl lg:text-2xl text-blue-100 mb-6">
            Quickly build landing pages that align with your brand and boost conversion rates.
          </p>

        </h3>


        {/* Video positioned directly below the text */}
        <div className="w-full max-w-5xl mx-auto perspective" style={{ perspective: '1000px' }}>
          <video
            src="/weblike-ai-image.mp4"
            width="100%"
            height="auto"
            autoPlay
            loop
            muted
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
