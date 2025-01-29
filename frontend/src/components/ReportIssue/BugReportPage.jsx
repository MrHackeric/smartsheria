import React from 'react';
import Header from '../header/Header';
import BugReportForm from './BugReportForm';

const BugReportPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      <div className="min-h-screen p-6 flex items-center justify-center bg-animated-gradient">
          <BugReportForm />
      </div>

      {/* Add Tailwind Custom Styles */}
      <style>
        {`
          .bg-animated-gradient {
            background: linear-gradient(90deg, #6EE7B7, #3B82F6, #9333EA);
            background-size: 300% 300%;
            animation: gradient-animation 8s ease infinite;
          }

          @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default BugReportPage;
