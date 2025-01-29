import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

// Import pages
import LoginPage from '../src/components/authentication/LoginPage';
import SignUpPage from '../src/components/authentication/SignUpPage';
import ForgotPasswordPage from '../src/components/authentication/ForgotPasswordPage';
import NotFoundPage from '../src/components/authentication/NotFoundPage';

import PrivacyPolicyPage from '../src/components/privacypolicy/PrivacyPolicyPage';
import LandingPage from '../src/components/landingpage/LandingPage';

import NotificationsPage from './components/notifications/NotificationsPage';
import CommunityPage from './components/community/CommunityPage';

import ChatbotPage from './components/chatbot/ChatbotPage';

import BugReportPage from '../src/components/ReportIssue/BugReportPage';
import EditProfilePage from '../src/components/profilesettings/EditProfilePage';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/forgotpass" element={<ForgotPasswordPage />} />
        <Route exact path="/error" element={<NotFoundPage />} />
        <Route exact path="/privacy" element={<PrivacyPolicyPage />} />
        <Route exact path="/report" element={<BugReportPage />} />
        <Route exact path="/chatbot" element={<ChatbotPage />} />
        <Route exact path="/community" element={<CommunityPage />} />
        <Route exact path="/settings" element={<EditProfilePage />} />
        <Route exact path="/notifications" element={<NotificationsPage />} />

      </Routes>
    </>
  );
}

export default App;