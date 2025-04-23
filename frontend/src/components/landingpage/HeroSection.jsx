import React from 'react';
import { Button } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy'; // Icon for branding
import './Section.css'; // Create a separate CSS file for the animation

const HeroSection = () => {
  return (
    <header className="animated-bg py-16 bg-gradient-to-r from-blue-600 to-purple-500 text-white">
      {/* Overlay */}
      <div className="animated-bg py-16 bg-gradient-to-r from-blue-600 to-purple-500">

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-20">
        {/* Branding Icon */}
        <div className="flex justify-center items-center mb-6 animate-bounce">
          <SmartToyIcon className="text-white text-6xl animate-pulse" fontSize="large" />
          <h1 className="text-4xl font-bold ml-3">SmartSheria</h1>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4">AI-Powered Legal Assistant</h1>
        <p className="text-lg md:text-xl mb-6">
          A smart community of legal professionals and tools to predict case outcomes, provide legal advice, 
          and simplify compliance management. Define use cases, explore predictions, and handle cases efficiently.
        </p>

        <div className="flex justify-center gap-6">
          <Button
            href="/signup"
            variant="contained"
            color="primary"
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition transform duration-300 hover:scale-105"
          >
            Get Started
          </Button>
          <Button
            href="/login"
            variant="outlined"
            color="primary"
            className="text-white border-white px-8 py-3 rounded hover:bg-blue-600 hover:text-white transition transform duration-300 hover:scale-105"
          >
            Log In
          </Button>
        </div>
      </div>
      </div>
    </header>
  );
};

export default HeroSection;
