import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../AuthContext';

const ChangePasswordPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = sessionStorage.getItem("authToken"); // Retrieve token from session storage

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isTypingConfirmPassword, setIsTypingConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const validatePassword = (value) => {
    const criteria = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[@$!%*?&]/.test(value),
    };
    setPasswordCriteria(criteria);

    const criteriaMet = Object.values(criteria).filter(Boolean).length;
    if (criteriaMet < 2) setPasswordStrength('Poor');
    else if (criteriaMet < 4) setPasswordStrength('Weak');
    else if (criteriaMet === 4) setPasswordStrength('Medium');
    else setPasswordStrength('Strong');
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
    setIsTypingConfirmPassword(true);
  };

  const handleChangePassword = async () => {
    if (!passwordsMatch || passwordStrength === "Poor" || passwordStrength === "Weak") {
        setMessage("Ensure your password meets all criteria and matches.");
        return;
    }

    const storedEmail = sessionStorage.getItem("resetEmail");  // ✅ Retrieve email from session
    if (!storedEmail) {
        console.error("Email not found in session storage");  // Debugging log
        setMessage("Session expired. Please restart the password reset process.");
        navigate("/forgot-password");
        return;
    }

    const requestBody = { email: storedEmail, password };
    console.log("Sending request body:", requestBody);

    try {
        const response = await fetch("http://localhost:5000/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("Response:", data);
        setMessage(data.message);

        if (response.ok) {
            sessionStorage.removeItem("resetEmail"); // ✅ Remove email from session after reset
            setTimeout(() => navigate("/login"), 2000);
        }
    } catch (error) {
        setMessage("An error occurred. Please try again.");
        console.error("Password reset error:", error);
    }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full border border-gray-300 rounded-lg p-2 pr-10 mb-4"
            placeholder="New password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="w-full border border-gray-300 rounded-lg p-2 pr-10 mb-4"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password Match Indicator */}
        {isTypingConfirmPassword && (
          <p className={passwordsMatch ? 'text-green-600' : 'text-red-500'}>
            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
          </p>
        )}

        {/* Password Criteria */}
        <ul className="text-sm mb-4">
          <li className={passwordCriteria.length ? 'text-green-600' : 'text-red-500'}>At least 8 characters</li>
          <li className={passwordCriteria.uppercase ? 'text-green-600' : 'text-red-500'}>At least one uppercase letter</li>
          <li className={passwordCriteria.lowercase ? 'text-green-600' : 'text-red-500'}>At least one lowercase letter</li>
          <li className={passwordCriteria.number ? 'text-green-600' : 'text-red-500'}>At least one number</li>
          <li className={passwordCriteria.specialChar ? 'text-green-600' : 'text-red-500'}>At least one special character</li>
        </ul>

        {/* Password Strength Indicator */}
        <p className={`mb-4 font-semibold ${passwordStrength === 'Strong' ? 'text-green-600' : 'text-red-500'}`}>
          Strength: {passwordStrength}
        </p>

        {/* Change Password Button */}
        <button onClick={handleChangePassword} className="w-full py-3 bg-blue-600 text-white rounded-lg">
          Change Password
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
