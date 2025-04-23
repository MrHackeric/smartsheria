import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NotificationsActive, Security } from '@mui/icons-material'; // Icons for Alerts and Security
import './Section.css'; // External CSS for background animation

const ComplianceAlertsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS animations
  }, []);

  return (
    <section className="animated-bg py-16 bg-gradient-to-r from-blue-600 to-purple-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center md:text-left" data-aos="fade-right">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Stay Ahead with SmartSheria
            </h2>
            <p className="text-gray-200 text-lg sm:text-xl">
              SmartSheria keeps you informed and secure by monitoring legal developments, predicting potential outcomes, and sending timely alerts. Focus on achieving your goals while we handle compliance and case analysis.
            </p>
          </div>

          {/* Icons and Animations */}
          <div className="flex flex-col space-y-8 items-center md:items-start" data-aos="fade-left">
            {/* Animated Icon for Alerts */}
            <div className="bg-white p-8 rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-xl">
              <NotificationsActive fontSize="large" className="text-primary" />
            </div>
            {/* Animated Icon for Security */}
            <div className="bg-white p-8 rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-xl">
              <Security fontSize="large" className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceAlertsSection;
