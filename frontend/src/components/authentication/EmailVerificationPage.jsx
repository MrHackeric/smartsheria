import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const EmailVerificationCode = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(""); // Store verification code
  const [error, setError] = useState(""); // Store error messages
  const [success, setSuccess] = useState(""); // Store success messages

  // Retrieve email from session storage
  const email = sessionStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) {
      console.error("Missing email. Redirecting to login...");
      navigate("/signin"); // Redirect if no email
    }
  }, [email, navigate]);

  //Logic to Handle Code Verification
  const handleVerifyCode = async () => {
    if (!code.trim()) {
      setError("Please enter the verification code.");
      return;
    }
  
    setIsLoading(true);
    setError("");
    setSuccess("");
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-email-signup",
        { email, code }
      );
  
      console.log("Server Response:", response.data);
      setSuccess(response.data.message);
      navigate("/community");
  
    } catch (error) {
      console.error("Error verifying email:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">Verify Your Email</h2>
        <p className="text-center text-gray-600">
          Enter the verification code sent to{" "}
          <span className="font-semibold text-gray-900">
            {email ? `${email.substring(0, 3)}***@${email.split("@")[1]}` : "your email"}
          </span>
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <input
          type="text"
          placeholder="Enter Verification Code"
          className="w-full border p-2 text-center rounded-lg focus:ring-2 focus:ring-blue-400"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={handleVerifyCode}
          disabled={isLoading}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationCode;
