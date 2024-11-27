import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GeneratedComponent: React.FC = () => {
  return (
    <div className="min-h-screen relative  bg-[#1a1919] overflow-hidden">
      <style>
        {`
          .hero-gradient {
            background: linear-gradient(
              125deg,
              rgba(0, 220, 130, 0.15) 0%,
              rgba(54, 228, 218, 0.15) 50%,
              rgba(0, 71, 225, 0.15) 100%
            );
          }

          .text-glow {
            text-shadow: 0 0 20px rgba(0, 220, 130, 0.5);
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 6s ease-in-out 2s infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(3deg); }
          }

          .gradient-border {
            position: relative;
            background: linear-gradient(#0A0A0A, #0A0A0A) padding-box,
                        linear-gradient(to right, #00DC82, #36E4DA) border-box;
            border: 2px solid transparent;
          }

          .typing-cursor {
            animation: blink 1s step-end infinite;
          }

          @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: #00DC82 }
          }

          .grid-background {
            background-size: 30px 30px;
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            animation: gridMove 15s linear infinite;
          }

          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 30px 30px; }
          }

          .orbit {
            animation: orbit 20s linear infinite;
          }

          @keyframes orbit {
            from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
          }

          .code-window {
            background: rgba(30, 30, 30, 0.95);
            border: 1px solid rgba(255,255,255,0.1);
          }

          .typing-effect {
            overflow: hidden;
            border-right: 2px solid #00DC82;
            white-space: nowrap;
            animation: typing 3.5s steps(40, end), blink .75s step-end infinite;
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: #00DC82 }
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 hero-gradient opacity-40"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#00DC82] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-[#0047E1] rounded-full blur-[120px] opacity-20 animate-pulse"></div>

        {/* Navigation */}
        <nav className="relative z-50 container mx-auto px-6 py-8">
          <div className="glass-effect rounded-2xl p-4 flex justify-between items-center border border-white/10">
            <div className="text-2xl font-bold gradient-text">weblike.pro</div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Work</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a>
              </div>
              <Link href="/login">
              <button className="modern-gradient text-black px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
                Start Project
              </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="container mx-auto px-6 pt-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-block glass-effect px-4 py-2 rounded-full">
                <span className="text-[#00DC82] flex items-center">
                  <span className="w-2 h-2 bg-[#00DC82] rounded-full mr-2 animate-pulse"></span>
                  Web Development • Design • AI Integration
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  We Build
                  <br />
                  <span className="gradient-text text-glow">Digital</span>
                  <br />
                  Experiences
                </h1>
                <p className="text-xl text-gray-400 max-w-xl">
                  Transform your vision into reality with our cutting-edge web development 
                  and design solutions. We create stunning, high-performance digital experiences 
                  that drive results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <button className="modern-gradient text-black px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center">
                  <span>Get Started</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                </Link>
                <button className="glass-effect text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center">
                  <span>View Projects</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: "150+", label: "Projects Completed" },
                  { number: "98%", label: "Client Satisfaction" },
                  { number: "15+", label: "Expert Developers" }
                ].map((stat, index) => (
                  <div key={index} className="glass-effect p-4 rounded-xl text-center">
                    <div className="gradient-text text-2xl font-bold">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Updated with unique elements */}
            <div className="relative h-[600px]">
              {/* Main 3D-like Container */}
              <div className="relative w-full h-full">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 grid-background rounded-3xl"></div>

                {/* Central Code Window */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] code-window rounded-xl p-6 z-20">
                  {/* Window Controls */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <span>🔥 main.tsx</span>
                      <span className="px-2 py-1 rounded-md bg-[#2d2d2d]">React</span>
                    </div>
                  </div>

                  {/* Code Content */}
                  <div className="space-y-4 font-mono text-sm">
                    <div className="text-blue-400">import <span className="text-white">{}</span> <span className="text-green-400">Motion</span> <span className="text-white">{}</span> <span className="text-blue-400">from</span> <span className="text-orange-300">framer-motion</span>;</div>
                    
                    <div className="typing-effect text-purple-400">
                      const <span className="text-blue-400">WeblikeProject</span> = <span className="text-orange-300">async</span> () =&gt; {'{'}</div>
                    
                    <div className="pl-4 text-gray-300">
                      <div>const stack = {}
                        <div className="pl-4 text-green-400">
                          frontend: [react],<br/>
                          backend: [no],<br/>
                          design: [yes]
                        </div>
                      {}</div>
                    </div>

                    <div className="pl-4 text-purple-400">
                      return <span className="text-orange-300">buildAmazing</span>(stack);
                    </div>
                    
                    <div className="text-purple-400">{};</div>
                  </div>
                </div>

                {/* Orbiting Tech Elements */}
                {[].map((emoji, index) => (
                  <div
                    key={index}
                    className={`absolute left-1/2 top-1/2 orbit`}
                    style={{
                      animationDelay: `${index * -5}s`,
                    }}
                  >
                    <div className="glass-effect p-4 rounded-xl transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
                      <div className="text-2xl">{emoji}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* ... rest of the sections ... */}
    </div>
  );
};

export default GeneratedComponent;
