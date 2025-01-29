import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PlayCircleOutline, TrendingUp } from '@mui/icons-material'; // Icons for dynamic CTA
import './Section.css'; // External CSS for animated background

const CallToAction = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="animated-bg py-16 text-center text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8" data-aos="fade-down">
          <h2 className="text-4xl font-bold">Empower Your Legal Journey</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-200">
            Join the smart community of legal professionals using SmartSheria to predict case outcomes, receive AI-powered legal advice, and streamline compliance management.
          </p>
        </div>

        {/* Icon Row for Visual Appeal */}
        <div className="flex justify-center space-x-12 mb-12" data-aos="fade-up">
          {/* Animated Icon 1 */}
          <div className="bg-white p-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <PlayCircleOutline fontSize="large" className="text-primary" />
          </div>
          {/* Animated Icon 2 */}
          <div className="bg-white p-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <TrendingUp fontSize="large" className="text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
