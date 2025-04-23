import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../header/Header";
import { motion } from "framer-motion";
import settingsImage from "../../images/image01.png";

const SettingsHelp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6 max-w-3xl mx-auto">
        {/* Back Button with Animation */}
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

        {/* Main Content with Animation */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={settingsImage}
            alt="Settings Illustration"
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <Typography variant="h5" className="font-bold text-blue-900 mb-4">
            Profile Settings
          </Typography>

          <p className="text-gray-800 text-base leading-relaxed">
            Navigate to the <span className="font-semibold text-blue-700">Settings</span> page to update your:
          </p>

          <ul className="list-disc pl-6 mt-4 text-gray-700 space-y-2">
            <li><span className="font-medium">Full name</span> – keep your identity accurate.</li>
            <li><span className="font-medium">Email address</span> – essential for notifications.</li>
            <li><span className="font-medium">Phone number</span> – for verification and contact.</li>
          </ul>

          <p className="mt-4 text-gray-700">
            Keeping your profile updated ensures we can serve you better 🔧.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsHelp;
