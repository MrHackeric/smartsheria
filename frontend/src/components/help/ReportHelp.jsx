import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../header/Header";
import { motion } from "framer-motion";
import reportImage from "../../images/Report.png";

const ReportHelp = () => {
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

        {/* Main Content Card with Animation */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={reportImage}
            alt="Report Bug Illustration"
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <Typography variant="h5" className="font-bold text-blue-900 mb-4">
            Reporting Issues
          </Typography>

          <p className="text-gray-800 text-base leading-relaxed">
            If you’ve encountered a bug or issue, please use the <span className="font-semibold text-blue-700">Report</span> section to let us know.
            Make sure to include the following:
          </p>

          <ul className="list-disc pl-6 mt-4 text-gray-700 space-y-2">
            <li>Your <span className="font-medium">email address</span> for follow-up.</li>
            <li>The <span className="font-medium">device OS</span> (e.g., Windows, Android, iOS).</li>
            <li>Your <span className="font-medium">browser name</span> and version.</li>
            <li>A brief <span className="font-medium">description</span> of what went wrong.</li>
          </ul>

          <p className="mt-4 text-gray-700">
            Your feedback helps us improve your experience 💡.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportHelp;
