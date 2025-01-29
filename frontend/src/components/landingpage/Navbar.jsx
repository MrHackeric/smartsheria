import React, { useState } from 'react';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy'; // Animated toy icon for branding

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 py-4 text-white">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Title */}
        <div className="flex items-center gap-2">
          <SmartToyIcon className="text-white animate-bounce" fontSize="large" />
          <h1 className="text-2xl font-bold">SmartSheria</h1>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>

        {/* Desktop Buttons */}
        <div className="space-x-4 hidden lg:flex">
          <Button
            href="/login"
            variant="container"
            startIcon={<LoginIcon />}
            className="text-white border-white hover:bg-white hover:text-blue-500 transition-transform duration-300 transform hover:scale-105"
          >
            Login
          </Button>
          <Button
            href="/signup"
            variant="container"
            startIcon={<AppRegistrationIcon />}
            className="text-white border-white hover:bg-white hover:text-blue-500 transition-transform duration-300 transform hover:scale-105"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 py-4">
            <Button
              href="/login"
              variant="container"
              startIcon={<LoginIcon />}
              className="text-white border-white hover:bg-white hover:text-blue-500 transition-transform duration-300 transform hover:scale-105 block w-full text-center mb-4"
            >
              Login
            </Button>
            <Button
              href="/signup"
              variant="container"
              startIcon={<AppRegistrationIcon />}
              className="text-white border-white hover:bg-white hover:text-blue-500 transition-transform duration-300 transform hover:scale-105 block w-full text-center"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        nav {
          background-size: 200% 200%;
          animation: gradientShift 6s infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
