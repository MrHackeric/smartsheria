import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SignUpPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreedToPrivacyPolicy: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isTypingConfirmPassword, setIsTypingConfirmPassword] = useState(false);

  const passwordCriteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    specialChar: /[@$!%*?&]/.test(formData.password),
  };

  const evaluatePasswordStrength = () => {
    const criteriaMet = Object.values(passwordCriteria).filter(Boolean).length;
    if (criteriaMet < 2) return 'Poor';
    if (criteriaMet < 4) return 'Weak';
    if (criteriaMet === 4) return 'Medium';
    return 'Strong';
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const updatedData = { ...formData, [id]: type === 'checkbox' ? checked : value };
    setFormData(updatedData);
  
    if (id === 'password') {
      setIsTypingPassword(value.length > 0);
      setPasswordStrength(evaluatePasswordStrength());
    }
  
    if (id === 'confirmPassword') {
      setIsTypingConfirmPassword(value.length > 0);
      setPasswordsMatch(updatedData.password === value);
    }
  };

  const handleSignUp = async () => {
    if (isLoading) return;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/; // Accepts 7 to 15 digits
  
    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return;
    }
  
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Please enter a valid phone number (digits only, 7-15 digits).");
      return;
    }
  
    if (!passwordsMatch || passwordStrength === "Poor" || passwordStrength === "Weak") {
      setError("Please ensure your password meets all criteria and matches.");
      return;
    }
  
    if (!formData.agreedToPrivacyPolicy) {
      setError("You must agree to the Privacy Policy.");
      return;
    }
  
    try {
      setIsLoading(true);
      setError("");
  
      const { fullName, email, phoneNumber, password } = formData;
  
      console.log("Sending request...");
  
      // Send sign-up request
      const response = await axiosInstance.post("/signup", { fullName, email, phoneNumber, password });
  
      console.log("Backend Response:", response.data);
  
      if (response.status === 201) {
        const { token, user } = response.data;
  
        if (!token) {
          throw new Error("Authentication token missing in response.");
        }
  
        // ✅ Store authentication details securely in sessionStorage
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("userEmail", response.data.email);
  
        navigate("/verify-email-signup");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error.response?.data || error.message);
  
      if (error.response?.status === 400) {
        setError("User already exists. Please log in.");
      } else if (error.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(error.response?.data?.message || "An error occurred while signing up.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input type="text" id="fullName" placeholder="Name/Username" className="w-full border p-2" value={formData.fullName} onChange={handleChange} />
        <input type="tel" id="phoneNumber" placeholder="Phone Number" className="w-full border p-2" value={formData.phoneNumber} onChange={handleChange} />
        <input type="email" id="email" placeholder="Email" className="w-full border p-2" value={formData.email} onChange={handleChange} />

        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" className="w-full border p-2" value={formData.password} onChange={handleChange} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
        </div>

        <ul className="text-sm text-gray-600">
          <li className={passwordCriteria.length ? 'text-green-600' : 'text-red-500'}>At least 8 characters</li>
          <li className={passwordCriteria.uppercase ? 'text-green-600' : 'text-red-500'}>At least one uppercase letter</li>
          <li className={passwordCriteria.lowercase ? 'text-green-600' : 'text-red-500'}>At least one lowercase letter</li>
          <li className={passwordCriteria.number ? 'text-green-600' : 'text-red-500'}>At least one number</li>
          <li className={passwordCriteria.specialChar ? 'text-green-600' : 'text-red-500'}>At least one special character</li>
        </ul>
        {isTypingPassword && (
          <p className={`font-bold ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
            Strength: {passwordStrength}
          </p>
        )}

        {isTypingConfirmPassword && (
          <p className={passwordsMatch ? 'text-green-600' : 'text-red-500'}>
            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
          </p>
        )}

        <div className="relative">
          <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" placeholder="Confirm Password" className="w-full border p-2" value={formData.confirmPassword} onChange={handleChange} />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="agreedToPrivacyPolicy" checked={formData.agreedToPrivacyPolicy} onChange={handleChange} />
          <label htmlFor="agreedToPrivacyPolicy" className="ml-2">I agree to the <a href="/privacy" className="text-blue-500 underline">Privacy Policy</a>.</label>
        </div>

        <button onClick={handleSignUp} disabled={isLoading || !passwordsMatch || passwordStrength === 'Poor' || passwordStrength === 'Weak'} className={`w-full py-3 text-lg font-semibold text-white rounded-lg ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isLoading ? <FaSpinner className="animate-spin" /> : 'Sign Up'}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;
