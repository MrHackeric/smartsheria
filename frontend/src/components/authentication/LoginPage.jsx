import React, { useState } from 'react';
import { FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Use bcryptjs for the browser

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email.');
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }
      
      if (!email || !password) {
        alert('Please enter both email and password.');
        setIsLoading(false);
        return;
      }

      // Proceed with sending login data to the server
      const response = await axios.post('http://localhost:3000/api/user/login', { email, password },
      { headers: { 'Content-Type': 'application/json' } });
      console.log('Sending Payload:', { email, password });

      if (response.status === 200) {
        alert('Login successful');
        navigate('/community');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Email Input */}
        <div className="relative mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin mr-2" /> Logging in...
            </div>
          ) : (
            'Login'
          )}
        </button>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <a href="/forgotpass" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Don't have an account Link */}
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
