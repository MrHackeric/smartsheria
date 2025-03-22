import React, { useState } from 'react';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ Use useNavigate hook


  const handleForgotPassword = async () => {
    setIsLoading(true);
    setMessage('');

    try {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setMessage(data.message);

        if (response.ok) {
            navigate(`/verify-code?email=${encodeURIComponent(email)}`); // ✅ Pass email via query params
        }
    } catch (error) {
        setMessage('Error sending reset code. Try again.');
    } finally {
        setIsLoading(false);
    }
};




  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email to receive a reset code.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              className="w-full focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleForgotPassword}
          disabled={isLoading || !email}
          className={`w-full py-3 text-white rounded-lg shadow-md transition duration-300 ${
            isLoading || !email ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : 'Send Code'}
        </button>

        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
