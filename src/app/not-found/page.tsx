'use client'
import Link from 'next/link';
import React from 'react';

const Custom404: React.FC = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for do not exist .</p>
        <div className="error-actions">
          <Link href="/">
            <button className="home-button">Go to Home</button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .error-content {
          text-align: center;
        }
        h1 {
          font-size: 6rem;
          margin-bottom: 0;
          color: #1a1a1a;
        }
        h2 {
          font-size: 2rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #4a4a4a;
        }
        p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: #666;
        }
        .home-button {
          font-size: 1rem;
          display: inline-block;
          cursor: pointer;
          text-decoration: none;
          color: #ffffff;
          background-color: #007bff;
          border: none;
          padding: 0.5em 1em;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        .home-button:hover,
        .home-button:focus {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Custom404;