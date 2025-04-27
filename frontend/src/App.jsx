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
import HelpPage from "./components/help/HelpPage";

// Help Pages
import SignupHelp from "./components/help/SignupHelp";
import LoginHelp from "./components/help/LoginHelp";
import PasswordHelp from "./components/help/PasswordHelp";
import CommunityHelp from "./components/help/CommunityHelp";
import ChatbotHelp from "./components/help/ChatbotHelp";
import SettingsHelp from "./components/help/SettingsHelp";
import ReportHelp from "./components/help/ReportHelp";
import LogoutHelp from "./components/help/LogoutHelp";

// 🔹 Protected Pages (Require Authentication)
import CommunityPage from "./components/community/CommunityPage";
import ChatbotPage from "./components/chatbot/ChatbotPage";
import BugReportPage from "../src/components/ReportIssue/BugReportPage";
import EditProfilePage from "../src/components/profilesettings/EditProfilePage";

//Admin Pages
import Dashboard from "./components/admin/Dashboard";
import AdminLoginPage from "./components/admin/AdminLoginPage";
import AdminSignUpPage from "./components/admin/AdminSignUpPage";
import AdminBugReportsPage from "./components/admin/AdminBugReportsPage";
import AdminUsersPage from "./components/admin/adminUsersPage";

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
        <Route exact path="/help" element={<HelpPage />} />

        <Route exact path="/admin-login" element={<AdminLoginPage />} />
        <Route exact path="/admin-signup" element={<AdminSignUpPage />} />
        <Route exact path="/admin-users" element={<AdminUsersPage />} />
        <Route exact path="/admin-bug-reports" element={<AdminBugReportsPage />} />
        <Route exact path="/admin-dashboard" element={<Dashboard />} />

        {/* Help Section Routes */}
        <Route path="/help/login" element={<LoginHelp />} />
        <Route path="/help/signup" element={<SignupHelp />} />
        <Route path="/help/forgot-password" element={<PasswordHelp />} />
        <Route path="/help/community" element={<CommunityHelp />} />
        <Route path="/help/chatbot" element={<ChatbotHelp />} />
        <Route path="/help/settings" element={<SettingsHelp />} />
        <Route path="/help/report" element={<ReportHelp />} />
        <Route path="/help/logout" element={<LogoutHelp />} />

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
