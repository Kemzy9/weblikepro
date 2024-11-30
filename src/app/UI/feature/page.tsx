"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GeneratedComponent: React.FC = () => {
  // State for dynamic elements
  const [streams, setStreams] = useState<Array<{
    left: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);
  
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);

  // Generate dynamic elements on client-side only
  useEffect(() => {
    // Generate streams
    const newStreams = Array(10).fill(null).map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    }));
    setStreams(newStreams);

    // Generate particles
    const newParticles = Array(15).fill(null).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${8 + Math.random() * 4}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0A0A]">
        <style jsx global>{`
   
          .modern-gradient {
            background: linear-gradient(125deg, #00DC82 0%, #36E4DA 50%, #0047E1 100%);
          }

          .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .neon-glow {
            box-shadow: 0 0 15px rgba(0, 220, 130, 0.5);
          }

          .floating-card {
            animation: float 6s ease-in-out infinite;
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(3deg); }
          }

          .gradient-text {
            background: linear-gradient(to right, #00DC82, #36E4DA);
            -webkit-background-clip: text;
            color: transparent;
          }

          .code-block {
            background: #1E1E1E;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
          }

          .typing-animation {
            overflow: hidden;
            border-right: 2px solid #00DC82;
            white-space: nowrap;
            animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          .tech-card {
            transition: all 0.3s ease;
          }

          .tech-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 220, 130, 0.2);
          }

          @keyframes float-delay {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(-3deg); }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delay {
            animation: float-delay 8s ease-in-out infinite;
          }

          .animated-gradient-background {
            background: linear-gradient(
              -45deg,
              rgba(0, 220, 130, 0.1),
              rgba(54, 228, 218, 0.1),
              rgba(0, 71, 225, 0.1),
              rgba(0, 220, 130, 0.1)
            );
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            position: absolute;
            inset: 0;
          }

          .glow-line {
            position: absolute;
            width: 100%;
            height: 1px;
            background: linear-gradient(
              90deg,
              transparent,
              #00DC82,
              transparent
            );
            animation: glow-line-x 3s ease-in-out infinite;
          }

          .glow-line-vertical {
            position: absolute;
            width: 1px;
            height: 100%;
            background: linear-gradient(
              180deg,
              transparent,
              #36E4DA,
              transparent
            );
            animation: glow-line-y 3s ease-in-out infinite;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes glow-line-x {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes glow-line-y {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          .feature-card {
            position: relative;
            overflow: hidden;
          }

          .feature-card::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #00DC82, #36E4DA, #0047E1);
            background-size: 200% 200%;
            animation: gradient 15s ease infinite;
            z-index: -1;
            border-radius: inherit;
          }

          .feature-card::after {
            content: '';
            position: absolute;
            inset: 1px;
            background: rgba(10, 10, 10, 0.9);
            border-radius: inherit;
            z-index: -1;
          }

          .cyber-grid {
            background-image: 
              linear-gradient(rgba(0, 220, 130, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 220, 130, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridMove 20s linear infinite;
          }

          .floating-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00DC82;
            border-radius: 50%;
            animation: particleFloat 8s infinite;
          }

          .cyber-line {
            position: absolute;
            background: linear-gradient(90deg, transparent, #00DC82, transparent);
            height: 1px;
            width: 100%;
            animation: scanline 3s linear infinite;
          }

          .matrix-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, 
              rgba(0, 220, 130, 0.1) 0%,
              rgba(0, 71, 225, 0.05) 50%,
              transparent 70%
            );
            animation: pulse 4s ease-in-out infinite;
          }

          .hex-grid {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.05' fill='%2300DC82'/%3E%3C/svg%3E");
            animation: hexMove 20s linear infinite;
          }

          .glowing-orb {
            position: absolute;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle at center,
              rgba(0, 220, 130, 0.2) 0%,
              rgba(0, 71, 225, 0.1) 50%,
              transparent 70%
            );
            border-radius: 50%;
            filter: blur(40px);
            animation: orbFloat 10s ease-in-out infinite;
          }

          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 50px 50px; }
          }

          @keyframes particleFloat {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { transform: translateY(-100vh) translateX(100px); opacity: 1; }
          }

          @keyframes scanline {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(100vh); opacity: 0; }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }

          @keyframes hexMove {
            0% { background-position: 0 0; }
            100% { background-position: 60px 60px; }
          }

          @keyframes orbFloat {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(100px, 100px); }
            50% { transform: translate(0, 200px); }
            75% { transform: translate(-100px, 100px); }
          }

          .feature-section {
            position: relative;
            background: #0A0A0A;
            overflow: hidden;
          }

          .feature-card {
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 220, 130, 0.1);
            transition: all 0.3s ease;
          }

          .feature-card:hover {
            border-color: rgba(0, 220, 130, 0.5);
            box-shadow: 0 0 30px rgba(0, 220, 130, 0.2);
          }

          .neural-network {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle at 2px 2px, rgba(0, 220, 130, 0.05) 1px, transparent 0);
            background-size: 40px 40px;
            animation: networkPulse 4s ease-in-out infinite;
          }

          .data-stream {
            position: absolute;
            width: 2px;
            height: 100px;
            background: linear-gradient(to bottom, transparent, #00DC82, transparent);
            filter: blur(1px);
            opacity: 0;
            animation: dataFlow 3s linear infinite;
          }

          .ai-circuit {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(90deg, rgba(0, 220, 130, 0.03) 1px, transparent 1px),
              linear-gradient(rgba(0, 220, 130, 0.03) 1px, transparent 1px);
            background-size: 100px 100px;
            mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);
            animation: circuitPulse 10s linear infinite;
          }

          .quantum-particles {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 220, 130, 0.5);
            border-radius: 50%;
            filter: blur(1px);
            animation: quantumFloat 8s ease-in-out infinite;
          }

          @keyframes networkPulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }

          @keyframes dataFlow {
            0% { transform: translateY(-100%) translateX(0); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
          }

          @keyframes circuitPulse {
            0% { transform: translateX(0) translateY(0); }
            100% { transform: translateX(-100px) translateY(-100px); }
          }

          @keyframes quantumFloat {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            25% { transform: translate(100px, -50px) scale(1.5); opacity: 0.6; }
            50% { transform: translate(200px, 0) scale(1); opacity: 0.3; }
            75% { transform: translate(100px, 50px) scale(1.5); opacity: 0.6; }
          }

          .intelligent-mesh {
            position: absolute;
            inset: 0;
            background: 
              repeating-linear-gradient(
                45deg,
                rgba(0, 220, 130, 0.03) 0px,
                rgba(0, 220, 130, 0.03) 1px,
                transparent 1px,
                transparent 40px
              );
            animation: meshMove 20s linear infinite;
          }

          @keyframes meshMove {
            0% { background-position: 0 0; }
            100% { background-position: 100px 100px; }
          }
                  `}</style>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="relative">
            <div className="floating-card rounded-2xl p-8">
              <div className="code-block p-6 text-sm text-gray-300">
                <pre>
                  <code>
                    {`// Your vision, our code
const Future = {
  design: "Stunning",
  performance: "Lightning",
  features: ["AI", "Web3", "Mobile"],
  deploy: () => "Success! 🚀"
};`}
                  </code>
                </pre>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 right-10 w-72 h-72 modern-gradient rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
          </div>
          <div className="space-y-8">
            <div className="inline-block glass-effect px-4 py-2 rounded-full">
              <span className="text-[#00DC82]">Web Development  Design AI Integration</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Website Creation, <br />
              <span className="gradient-text">One Click at a Time</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
            Building websites has never been this easy. Just click, create, and launch!
            </p>
            <div className="flex space-x-4">
            <Link href="/login">
              <button className="modern-gradient text-black px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity">
                Start Building
              </button>
              </Link>
              <Link href="/login">
              <button className="glass-effect text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors">
                View Projects
              </button>
              </Link>
              
            </div>
          </div>

        </div>

      </div>


      {/* Floating Elements */}
      <div className="absolute top-40 left-20 w-64 h-64 modern-gradient rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-40 right-20 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

      {/* Enhanced Features Section */}
      <div className="feature-section py-32">
        {/* Layered Background Effects */}
        <div className="cyber-grid absolute inset-0 opacity-30"></div>
        <div className="hex-grid absolute inset-0 opacity-20"></div>
        <div className="matrix-bg"></div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Scanning Lines */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="cyber-line"
            style={{
              top: `${33 * (i + 1)}%`,
              animationDelay: `${i * 1}s`
            }}
          ></div>
        ))}

        {/* Glowing Orbs */}
        <div className="glowing-orb" style={{ top: '20%', left: '20%' }}></div>
        <div className="glowing-orb" style={{ bottom: '20%', right: '20%', animationDelay: '-5s' }}></div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative inline-block">
              Powerful <span className="gradient-text">AI Features</span>
              <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00DC82] to-transparent"></div>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transform your web development workflow with our cutting-edge AI-powered tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI Code Generation",
                description: "Generate clean, optimized code automatically",
                features: ["Html", "Tailwind CSS", "Javascript"],
                gradient: "from-[#00DC82] to-[#36E4DA]"
              },
              {
                icon: "🎨",
                title: "Smart Pattern System",
                description: "AI-powered design suggestions and components",
                features: ["Custom Themes", "Responsive Layout", "Animation Library", "Export"],
                gradient: "from-[#36E4DA] to-[#0047E1]"
              },
              {
                icon: "⚡",
                title: "Performance Optimization",
                description: "Automatic performance tuning and optimization",
                features: ["Speed Analysis", "Code Splitting", "Image Optimization", "SEO Tools"],
                gradient: "from-[#0047E1] to-[#00DC82]"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative z-10">
                  <div className="text-4xl mb-6 relative inline-block">
                    <span className="relative z-10">{feature.icon}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00DC82] to-[#36E4DA] opacity-20 blur-lg"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 mb-6">{feature.description}</p>

                  {/* Feature List */}
                  <ul className="space-y-3">
                    {feature.features.map((item, fIndex) => (
                      <li key={fIndex} className="flex items-center space-x-3">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00DC82] to-[#36E4DA]"></span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover Button */}
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href="/login">
                    <button className="w-full modern-gradient text-black py-3 rounded-xl font-medium hover:opacity-90 transition-opacity neon-glow">
                      Learn More
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-32 grid md:grid-cols-4 gap-8">
            {[
              { number: "99%", label: "Faster Development" },
              { number: "50+", label: "AI Templates" },
              { number: "24/7", label: "AI Support" },
              { number: "100k+", label: "Happy Developers" }
            ].map((stat, index) => (
              <div key={index} className="text-center glass-effect p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Interactive Demo Button */}
          <div className="mt-20 text-center">
          <Link href="/login">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white glass-effect rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00DC82] to-[#0047E1] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Try Interactive Demo
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
            </Link >
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-0 w-24 h-24 glass-effect rounded-full animate-float opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-32 h-32 glass-effect rounded-full animate-float-delay opacity-20"></div>
      </div>

      {/* New Services Section */}
      
      {/* Pricing Section */}
      <div className="container mx-auto px-6 py-32 relative">
        {/* Background Effects */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] modern-gradient rounded-full blur-[150px] opacity-20"></div>

        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Choose Your <span className="gradient-text">Perfect Plan</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Start building your AI-powered website today with our flexible pricing options
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Starter Plan */}
          <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 modern-gradient"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-white">$29</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {["3 AI-powered templates", 'Basic customization', 'Analytics dashboard', '24/7 Support'].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-[#00DC82]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/signup">
            <button className="w-full glass-effect text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
              Get Started
            </button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="glass-effect rounded-2xl p-8 transform scale-105 relative overflow-hidden">
            <div className="absolute -top-6 right-6 rotate-12">
              <span className="modern-gradient text-black px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </span>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 modern-gradient"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-white">$79</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'All Starter features',
                'Advanced AI tools',
                'Custom domain',
                'Priority support',
                'SEO optimization',
                'Advanced analytics'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-[#00DC82]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/signup">
            <button className="w-full modern-gradient text-black py-3 rounded-xl font-medium hover:opacity-90 transition-opacity neon-glow">
              Get Started
            </button>
            </Link >
          </div>

          {/* Enterprise Plan */}
          <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 modern-gradient"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-white">$199</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'All Pro features',
                'Unlimited templates',
                'White-label solution',
                'API access',
                'Custom AI training',
                'Dedicated support'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-[#00DC82]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/signup">
            <button className="w-full glass-effect text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "How does the AI website builder work?",
                a: "Our AI-powered platform analyzes your requirements and automatically generates optimized website layouts and content suggestions."
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "Do I need coding knowledge?",
                a: "No coding required! Our AI builder creates everything automatically, though developers can access code for custom modifications."
              },
              {
                q: "What kind of support do you offer?",
                a: "We provide 24/7 customer support, detailed documentation, and video tutorials. Enterprise plans include dedicated support."
              }
            ].map((faq, index) => (
              <div key={index} className="glass-effect p-6 rounded-xl">
                <h4 className="text-white font-medium mb-2">{faq.q}</h4>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section - Updated to Website Templates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif text-center mb-12 text-white">Popular Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-effect rounded-lg p-6 floating-card">
            <Image
              src=""
              alt="E-commerce Template"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-medium mb-2 text-white">E-commerce Pro</h3>
            <p className="text-gray-400 mb-4">
              Complete e-commerce solution with AI-powered product recommendations
            </p>
            <div className="flex justify-between items-center">
              <span className="gradient-text font-medium">$199</span>
              <button className="modern-gradient text-black px-4 py-2 rounded-xl hover:opacity-90">
                Preview
              </button>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-6 floating-card">
            <Image
              src=""
              alt="Portfolio Template"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-medium mb-2 text-white">Portfolio AI</h3>
            <p className="text-gray-400 mb-4">
              Dynamic portfolio with AI content generation
            </p>
            <div className="flex justify-between items-center">
              <span className="gradient-text font-medium">$149</span>
              <button className="modern-gradient text-black px-4 py-2 rounded-xl hover:opacity-90">
                Preview
              </button>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-6 floating-card">
            <Image
              src=""
              alt="Blog Template"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-medium mb-2 text-white">Blog Master</h3>
            <p className="text-gray-400 mb-4">
              SEO-optimized blog template with AI writing assistant
            </p>
            <div className="flex justify-between items-center">
              <span className="gradient-text font-medium">$129</span>
              <button className="modern-gradient text-black px-4 py-2 rounded-xl hover:opacity-90">
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section - Updated to Resources & Tutorials */}
      <div className="glass-effect py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-12 text-white">
            Resources & Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-effect rounded-lg overflow-hidden floating-card">
              <Image
                src=""
                alt="AI Integration Guide"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 text-white">AI Integration Guide</h3>
                <p className="text-gray-400">
                  Learn how to integrate AI features into your website effectively
                </p>
                <a href="#" className="gradient-text hover:opacity-90 mt-4 inline-block">Read More →</a>
              </div>
            </div>

            <div className="glass-effect rounded-lg overflow-hidden floating-card">
              <Image
                src=""
                alt="Website Builder Tutorial"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 text-white">
                  Website Builder Tutorial
                </h3>
                <p className="text-gray-400">
                  Step-by-step guide to creating your first AI-powered website
                </p>
                <a href="#" className="gradient-text hover:opacity-90 mt-4 inline-block">Read More →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter - Updated content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4 text-white">Stay Updated</h2>
          <p className="text-gray-400 mb-8">
            Get the latest updates on AI website building and digital trends
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-xl glass-effect text-white border-0 focus:outline-none focus:ring-2 focus:ring-[#00DC82]"
              />
              <button className="modern-gradient text-black px-6 py-2 rounded-r-xl hover:opacity-90">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer - Updated content */}
      <footer className="glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4 gradient-text">weblikepro</h3>
              <p className="text-gray-400">
                Building the future of web development with AI
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">AI Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* New background elements */}
      <div className="neural-network"></div>
      <div className="ai-circuit"></div>
      <div className="intelligent-mesh"></div>
      
      {/* Dynamic data streams */}
      {streams.map((stream, i) => (
        <div
          key={`stream-${i}`}
          className="data-stream"
          style={{
            left: stream.left,
            animationDelay: stream.animationDelay,
            animationDuration: stream.animationDuration
          }}
        ></div>
      ))}
      
      {/* Dynamic quantum particles */}
      {particles.map((particle, i) => (
        <div
          key={`particle-${i}`}
          className="quantum-particles"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration
          }}
        ></div>
      ))}
    </div>
  );
};

export default GeneratedComponent;
