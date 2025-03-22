import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css"; // Import global styles

// 🔹 Authentication Pages
import LoginPage from "../src/components/authentication/LoginPage";
import SignUpPage from "../src/components/authentication/SignUpPage";
import ForgotPasswordPage from "../src/components/authentication/ForgotPasswordPage";
import VerifyCodePage from "./components/authentication/VerifyCodePage";
import ChangePasswordPage from "./components/authentication/ChangePasswordPage";
import EmailVerificationCode from "./components/authentication/EmailVerificationPage";
import OtpVerificationPage from "./components/authentication/OtpVerificationPage";

// 🔹 General Pages
import LandingPage from "../src/components/landingpage/LandingPage";
import PrivacyPolicyPage from "../src/components/privacypolicy/PrivacyPolicyPage";
import NotFoundPage from "../src/components/authentication/NotFoundPage"; // 404 Page

// 🔹 Protected Pages (Require Authentication)
import CommunityPage from "./components/community/CommunityPage";
import ChatbotPage from "./components/chatbot/ChatbotPage";
import BugReportPage from "../src/components/ReportIssue/BugReportPage";
import EditProfilePage from "../src/components/profilesettings/EditProfilePage";

// 🔹 Route Protection Component
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // Triggered on route change

  return (
    <>
      <Routes>
        {/* 🔹 Public Routes */}
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/privacy" element={<PrivacyPolicyPage />} />
        <Route exact path="/otp-verification" element={<OtpVerificationPage />} />
        <Route exact path="/verify-code" element={<VerifyCodePage />} />
        <Route exact path="/forgotpass" element={<ForgotPasswordPage />} />
        <Route exact path="/verify-email-signup" element={<EmailVerificationCode />} />
        <Route exact path="/change-password" element={<ChangePasswordPage />} />

        {/* 🔹 Protected Routes (Require Authentication) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/report" element={<BugReportPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/settings" element={<EditProfilePage />} />
        </Route>

        {/* 🔹 Catch-All Route (404 Page) */}
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
