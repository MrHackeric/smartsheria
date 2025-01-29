import React from 'react';
import { Button } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy'; // Icon for branding
import './Section.css'; // Create a separate CSS file for the animation

const HeroSection = () => {
  return (
    <header className="relative h-screen flex items-center justify-center text-white animated-bg">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-20">
        {/* Branding Icon */}
        <div className="flex justify-center items-center mb-6">
          <SmartToyIcon className="text-white animate-bounce" fontSize="large" />
          <h1 className="text-4xl font-bold ml-3">SmartSheria</h1>
        </div>

        <h1 className="text-5xl font-bold mb-4">
          AI-Powered Legal Assistant
        </h1>
        <p className="text-xl mb-6">
          A smart community of legal professionals and tools to predict case outcomes, provide legal advice, 
          and simplify compliance management. Define use cases, explore predictions, and handle cases efficiently.
        </p>

        <div className="flex justify-center gap-4">
          <Button
            href="/signup"
            variant="contained"
            color="primary"
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Button>
          <Button
            href="/login"
            variant="outlined"
            color="primary"
            className="text-white border-white px-8 py-3 rounded hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
