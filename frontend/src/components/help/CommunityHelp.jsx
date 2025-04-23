import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../header/Header";
import { motion } from "framer-motion";
import communityImage from "../../images/image01.png";

const CommunityHelp = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <Header />

      {/* Back Button */}
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <IconButton
          onClick={() => navigate("/help")}
          className="text-blue-700"
          aria-label="Back to Help"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" className="ml-2 text-blue-900">
          Back to Help
        </Typography>
      </motion.div>

      {/* Help Card Content */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={communityImage}
          alt="Community Illustration"
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <Typography variant="h5" className="font-bold text-blue-900 mb-4">
          Community Section
        </Typography>

        <p className="text-gray-700 text-base leading-relaxed">
          The community section is a space for open discussion and collaboration. Users can freely share their thoughts, ask questions, or contribute advice to others.
        </p>

        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
          <li>Post thoughts, experiences, or questions.</li>
          <li>Engage with posts from others by reacting or commenting.</li>
          <li>Build a supportive and informative network.</li>
          <li>Respectful and helpful content is always encouraged.</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default CommunityHelp;
