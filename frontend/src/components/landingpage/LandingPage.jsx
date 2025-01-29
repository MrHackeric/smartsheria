import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import ComplianceAlertsSection from './ComplianceAlertsSection';
import CallToAction from './CallToAction';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ComplianceAlertsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
