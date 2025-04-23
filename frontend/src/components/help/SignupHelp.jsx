import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../header/Header";
import { motion } from "framer-motion";
import signupImage from "../../images/image01.png";

const SignupHelp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6 max-w-3xl mx-auto">
        {/* Animated Back Button */}
        <motion.div
          className="flex items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <IconButton onClick={() => navigate(-1)} className="text-blue-700">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className="ml-2 text-blue-900">
            Back
          </Typography>
        </motion.div>

        {/* Animated Content */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <Typography variant="h5" className="font-bold text-blue-900 mb-4">
            How to Sign Up
          </Typography>

          <ul className="list-disc pl-6 text-gray-800 space-y-2 text-base leading-relaxed">
            <li>
              Go to the <code className="text-blue-700 font-medium">/signup</code> page.
            </li>
            <li>
              Fill in your <strong>full name</strong>, <strong>phone number</strong>, <strong>email</strong>, and a secure <strong>password</strong>.
            </li>
            <li>
              Make sure your password follows the policy (8+ characters, mix of letters, numbers, symbols).
            </li>
            <li>
              Accept our{" "}
              <a href="/privacy-policy" className="text-blue-600 underline font-medium">
                Privacy Policy
              </a>{" "}
              before submitting.
            </li>
            <li>Click on the <strong>“Sign Up”</strong> button.</li>
            <li>Check your email for a <strong>6-digit OTP</strong> and enter it to verify.</li>
            <li>
              After verification, you will be automatically <span className="text-green-600 font-semibold">signed in</span>.
            </li>
          </ul>

          <p className="mt-6 text-gray-600 italic">
            💡 Tip: Check your spam folder if you don’t see the OTP in your inbox!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupHelp;
