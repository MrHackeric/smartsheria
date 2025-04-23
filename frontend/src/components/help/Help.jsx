import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Login",
    description: "Use your registered email and password, enter the OTP sent to your email to log in.",
    path: "/help/login",
  },
  {
    title: "Sign Up",
    description: "Fill in your details and agree to the privacy policy. A verification OTP will be sent to your email.",
    path: "/help/signup",
  },
  {
    title: "Password Reset",
    description: "Click 'Forgot Password' on the login page. Follow steps to reset your password using OTP.",
    path: "/help/forgot-password",
  },
  {
    title: "Community",
    description: "Users share thoughts with the public.",
    path: "/help/community",
  },
  {
    title: "Chatbot",
    description: "Use AI-powered assistant for research and clarification.",
    path: "/help/chatbot",
  },
  {
    title: "Settings",
    description: "Update your profile name, email, and phone number.",
    path: "/help/settings",
  },
  {
    title: "Report",
    description: "Report system bugs or issues you encounter while using the platform.",
    path: "/help/report",
  },
  {
    title: "Logout",
    description: "Click logout from the sidebar to securely sign out of your account.",
    path: "/help/logout",
  },
];

const HelpCard = ({ title, description, path, delay }) => (
  <motion.div
    className="w-full sm:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.5rem)] bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
  >
    <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
    <p className="text-gray-700 text-sm mb-4">{description}</p>
    <Link to={path} className="text-blue-600 hover:underline font-medium text-sm">
      Learn more →
    </Link>
  </motion.div>
);

const Help = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10 col-span-full xl:col-span-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <Typography variant="h4" className="font-extrabold text-blue-900">
          Help Center
        </Typography>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Find answers, guidance, and support for common tasks and features.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-4 justify-center xl:justify-between">
        {cards.map((card, index) => (
          <HelpCard key={card.path} {...card} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
};

export default Help;
