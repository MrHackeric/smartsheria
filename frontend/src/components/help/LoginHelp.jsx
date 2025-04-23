import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../header/Header";
import { motion } from "framer-motion";
import loginImage from "../../images/image01.png";

const LoginHelp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-6 max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.div
          className="flex items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            className="text-blue-700"
            aria-label="Back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className="ml-2 text-blue-900">
            Back
          </Typography>
        </motion.div>

        {/* Content Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <Typography variant="h5" className="font-bold text-blue-900 mb-4">
            How to Log In
          </Typography>

          <ul className="list-disc pl-6 text-gray-800 space-y-3 text-base leading-relaxed">
            <li>
              Navigate to the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/login</code> page.
            </li>
            <li>Enter your registered <strong>email</strong> and <strong>password</strong>.</li>
            <li>Click the <span className="text-blue-600 font-medium">Login</span> button.</li>
            <li>Check your inbox for a <strong>6-digit OTP</strong>.</li>
            <li>Enter the OTP to verify your identity.</li>
            <li>You will be redirected to your personalized dashboard.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginHelp;
