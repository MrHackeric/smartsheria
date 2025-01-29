import React, { useState } from 'react';
import { FaEnvelope, FaSpinner } from 'react-icons/fa'; // Icons for inputs and loading

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleForgotPassword = () => {
    setIsLoading(true);
    // Simulate forgot password logic (replace with actual API call)
    setTimeout(() => {
      setIsLoading(false);
      setMessage(`Password reset instructions sent to ${email}`);
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email address below and we'll send you instructions to reset your password.
        </p>

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

        {/* Submit Button */}
        <button
          onClick={handleForgotPassword}
          disabled={isLoading || !email}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75
            ${isLoading || !email ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}
          `}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin mr-2" /> Sending...
            </div>
          ) : (
            'Send Reset Instructions'
          )}
        </button>

        {/* Success or Error Message */}
        {message && (
          <div className="mt-4 text-green-500 text-center">
            {message}
          </div>
        )}

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{' '}
            <a href="/login" className="text-red-500 hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
