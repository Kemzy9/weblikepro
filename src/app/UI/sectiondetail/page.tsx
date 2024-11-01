// pages/404.tsx
'use client'
import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import Banner from "@/app/UI/banner/page"
const Custom404: React.FC = () => {
  return (

    <div className="error-container overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200 text-gray-800 min-h-screen">
      <div>
      <Banner/>
        <div className="error-content">


          <section className="flex flex-col lg:flex-row items-center justify-center p-4 lg:p-10 relative">
            {/* Video Area */}
            <div className="w-full lg:w-2/3 relative mb-10 lg:mb-0 order-2 lg:order-1">
              <div className="w-full h-auto perspective transform rotate-y-30 hover:rotate-y-0 transition-transform duration-500" style={{ perspective: '1000px' }}>
              <video
            src="/weblike-ai-logo.mp4"
            width="100%"
            height="auto"
            autoPlay
            loop
            muted
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
              </div>
            </div>

            {/* Text Content Area */}
            <div className="w-full lg:w-1/3 text-center lg:text-left space-y-8 lg:pr-10 order-1 lg:order-2">
              <h1 className="text-5xl lg:text-2xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Unlimited Potential: Command AI, Create Without Limits
              </h1>
              <p className="text-xl text-black">
              Guide the future of your landing page. Request updates, enhance features, and adapt the design—all with the power of AI at your fingertips.
              </p>
           

              <div className="flex justify-center lg:justify-start items-center space-x-4">
                <Link href="/signup" legacyBehavior>
                  <a className="text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl font-bold rounded-full text-lg px-8 py-4 transition-all transform hover:scale-105 duration-300 ease-in-out">
                    Get started
                  </a>
                </Link>
                <Link href="/features" legacyBehavior>
                  <a className="text-purple-600 border-2 border-purple-600 hover:bg-purple-100 font-bold rounded-full text-lg px-8 py-4 transition-all transform hover:scale-105 duration-300 ease-in-out">
                    Learn more
                  </a>
                </Link>
              </div>
            </div>
          </section>

          <div className="error-actions">
            <Link href="/signup">
              <button className="neon-button">Get Started</button>
            </Link>
          </div>
        </div>
        <div>
          <div className="relative z-10 p-8 flex flex-col md:flex-row items-center md:items-start">
            {/* Text content on the left */}
            <div className="md:w-1/2">
           
              <h1 className="text-5xl md:text-2xl font-extrabold text-gray-900 mb-6 leading-tight">
              Infinite Possibilities: Shape Your Page with AI
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl">
              Unlock a world of infinite possibilities with AI-driven Scheme. Effortlessly shape your landing page to unique modernlistic. With AI at your fingertips, 
              </p>
           
              <Link href="/ai-insights" legacyBehavior>
                <a className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Explore AI Insights
                </a>
              </Link>
            </div>

            {/* Video on the right */}
            <div className="w-full md:w-auto h-auto perspective mt-8 md:mt-0 md:ml-8" style={{ perspective: '1000px' }}>
              <div className="transform rotate-y-negative-30 hover:rotate-y-0 transition-transform duration-500">
              <video
            src="/weblike deploy.mp4"
            width="100%"
            height="auto"
            autoPlay
            loop
            muted
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
              </div>
            </div>
          </div>
        </div>
        <div className="decorative-circle"></div>
        <div className="decorative-circle"></div>
        <div className="decorative-circle"></div>
        <style jsx>{`
        .error-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: 'Courier New', monospace;
          color: #333;
          overflow: hidden;
          position: relative;
        }
        .error-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 10% 20%, rgba(255, 192, 203, 0.2) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(255, 182, 193, 0.2) 0%, transparent 20%);
          z-index: 0;
        }
        .error-container > * {
          position: relative;
          z-index: 1;
        }
        .glitch {
          font-size: 10rem;
          font-weight: bold;
          text-transform: uppercase;
          position: relative;
          text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                       0.025em 0.04em 0 #fffc00;
          animation: glitch 725ms infinite;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
          animation: glitch-anim2 1s infinite linear alternate-reverse;
        }
        .error-content {
          text-align: center;
          margin-top: 2rem;
        }
        h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }
        p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          max-width: 600px;
        }
        .neon-button {
          font-size: 1rem;
          display: inline-block;
          cursor: pointer;
          text-decoration: none;
          color: #00fffc;
          border: #00fffc 0.125em solid;
          padding: 0.25em 1em;
          border-radius: 0.25em;
          text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
          box-shadow: inset 0 0 0.5em 0 #00fffc, 0 0 0.5em 0 #00fffc;
          position: relative;
          transition: background-color 100ms linear;
        }
        .neon-button::before {
          pointer-events: none;
          content: "";
          position: absolute;
          background: #00fffc;
          top: 120%;
          left: 0;
          width: 100%;
          height: 100%;
          transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
          filter: blur(1em);
          opacity: 0.7;
        }
        .neon-button:hover,
        .neon-button:focus {
          background: #00fffc;
          color: #333;
          text-shadow: none;
        }
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                         0.025em 0.04em 0 #fffc00;
          }
          15% {
            text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                         0.025em 0.04em 0 #fffc00;
          }
          16% {
            text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                         -0.05em -0.05em 0 #fffc00;
          }
          49% {
            text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                         -0.05em -0.05em 0 #fffc00;
          }
          50% {
            text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                         0 -0.04em 0 #fffc00;
          }
          99% {
            text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                         0 -0.04em 0 #fffc00;
          }
          100% {
            text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                         -0.04em -0.025em 0 #fffc00;
          }
        }
        .perspective {
          perspective: 2000px;
        }
        .perspective:hover {
          transform: rotateY(-5deg) rotateX(5deg);
          transition: transform 0.5s ease-in-out;
        }
        /* Add decorative elements */
        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 10s infinite ease-in-out;
        }
        .decorative-circle:nth-child(1) {
          width: 100px;
          height: 100px;
          background-color: #ff69b4;
          top: 10%;
          left: 10%;
        }
        .decorative-circle:nth-child(2) {
          width: 150px;
          height: 150px;
          background-color: #ff1493;
          bottom: 15%;
          right: 5%;
          animation-delay: -5s;
        }
        .decorative-circle:nth-child(3) {
          width: 80px;
          height: 80px;
          background-color: #db7093;
          top: 50%;
          left: 50%;
          animation-delay: -2s;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .rotate-x-3 {
          transform: rotateX(3deg);
        }

        .hover\:rotate-x-0:hover {
          transform: rotateX(0deg);
        }

        .rotate-y-6 {
          transform: rotateY(6deg);
        }

        .rotate-y-negative-6 {
          transform: rotateY(-6deg);
        }

        .hover\:rotate-y-0:hover {
          transform: rotateY(0deg);
        }

        .rotate-y-30 {
          transform: rotateY(30deg);
        }

        .rotate-y-negative-30 {
          transform: rotateY(-30deg);
        }

        .hover\:rotate-y-0:hover {
          transform: rotateY(0deg);
        }

        .perspective {
          perspective: 2000px;
        }
      `}</style>
      </div>
    </div>
  );
};

export default Custom404;
