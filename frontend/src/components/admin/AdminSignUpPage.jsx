import React, { useState } from 'react';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AdminSignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignUp = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await axiosInstance.post('http://localhost:5000/api/admin-signup', {
        email,
        password
      });

      if (response.status === 201) {
        setSuccessMessage('Admin account created successfully!');
        navigate('/admin-login');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Sign Up</h2>

        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-center">{successMessage}</div>
        )}

        <div className="relative mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
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

        <div className="relative mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
            />
            <button type="button" onClick={togglePasswordVisibility} className="ml-2 focus:outline-none">
              {isPasswordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </button>
          </div>
        </div>

        <div className="relative mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
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

export default AdminSignUpPage;
