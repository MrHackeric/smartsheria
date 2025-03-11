import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaSpinner } from 'react-icons/fa';
import sxiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  // State variables
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle sign-up logic
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToPrivacyPolicy) {
      setError('You must agree to the Privacy Policy to proceed');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const userData = { fullName, userName, email, phoneNumber, password };

      const response = await axiosInstance.post('http://localhost:3000/api/user/register', userData);

      console.log('User created successfully:', response.data);
      navigate('/community');
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.response?.data?.message || 'An error occurred while signing up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name Input */}
          <div className="relative mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full focus:outline-none focus:border-blue-400"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* User Name Input */}
          <div className="relative mb-4">
            <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">User Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full focus:outline-none focus:border-blue-400"
                placeholder="Enter a unique username"
              />
            </div>
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="relative mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password Input */}
          <div className="relative mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full focus:outline-none focus:border-blue-400"
                placeholder="Create a password"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full focus:outline-none focus:border-blue-400"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        </div>

        {/* Privacy Policy Agreement Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="privacyPolicy"
            checked={agreedToPrivacyPolicy}
            onChange={(e) => setAgreedToPrivacyPolicy(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="privacyPolicy" className="text-gray-600">
            I agree to the <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </label>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          disabled={isLoading || !agreedToPrivacyPolicy}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 ${
            isLoading || !agreedToPrivacyPolicy ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin mr-2" /> Signing up...
            </div>
          ) : (
            'Sign Up'
          )}
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
