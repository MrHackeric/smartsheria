import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const VerifyCodePage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email'); // Get email from URL query params
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyCode = async () => {
    setIsLoading(true);
    setMessage('');

    try {
        const response = await fetch('http://localhost:5000/api/auth/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code: parseInt(code, 10) }), // Ensure it's a number
        });

        const data = await response.json();
        console.log("Server Response:", data);

        if (!response.ok) {
            throw new Error(data.message || 'Verification failed');
        }

        // ✅ Store token securely for password reset
        sessionStorage.setItem('resetToken', data.token);

        setMessage("Code verified successfully! Redirecting...");
        setTimeout(() => navigate('/change-password'), 2000);
    } catch (error) {
        console.error("Error:", error);
        setMessage(error.message);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Verify Reset Code</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the 6-digit code sent to {email}.
        </p>

        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Enter code"
          value={code}
          maxLength={6}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
            setCode(value);
          }}
        />

        <button
          onClick={handleVerifyCode}
          disabled={isLoading || code.length !== 6}
          className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyCodePage;
