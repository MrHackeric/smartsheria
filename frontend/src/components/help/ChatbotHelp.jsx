import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import chatbotImage from "../../images/Chatbot.png";

const ChatbotHelp = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <Header />

      {/* Back Navigation */}
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <IconButton
          onClick={() => navigate("/help")}
          className="text-blue-700"
          aria-label="Go back to help"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" className="ml-2 text-blue-900">
          Back to Help
        </Typography>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <img
          src={chatbotImage}
          alt="Chatbot Illustration"
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <Typography variant="h5" className="font-bold text-blue-900 mb-4">
          Chatbot Guide
        </Typography>

        <p className="text-gray-700 text-base leading-relaxed">
          Our chatbot is your AI-powered assistant — available 24/7 to help with questions, research, and clarification.
          Whether you're exploring legal topics or need help navigating the platform, just ask!
        </p>

        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
          <li>Get instant answers to your legal or technical queries.</li>
          <li>Summarize policies, documents, and FAQs easily.</li>
          <li>Chat history is saved during your session.</li>
          <li>Use sample questions on hover to guide your input.</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ChatbotHelp;
