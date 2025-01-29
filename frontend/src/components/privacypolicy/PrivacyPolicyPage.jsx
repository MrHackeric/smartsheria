import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Privacy Policy</h1>
        <p className="text-gray-600 text-center">
          Last updated: <span className="font-medium">October 16, 2024</span>
        </p>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-600">
            At <strong>CyberPolicy-Pro</strong>, we are committed to protecting your personal data. This Privacy Policy explains what personal data we collect, how we use it, and the measures we take to ensure your data is secure.
          </p>
        </section>

        {/* Data Collection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">What Data We Collect</h2>
          <p className="text-gray-600">
            When you sign up for our services, we collect the following personal data to better serve you:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li><strong>First Name and Last Name:</strong> To personalize your experience.</li>
            <li><strong>Email Address:</strong> To communicate important updates and information.</li>
            <li><strong>Password:</strong> For account access and security.</li>
            <li><strong>Phone Number:</strong> For account verification and support.</li>
            <li><strong>Profile Picture (optional):</strong> For a personalized user experience.</li>
            <li><strong>Business-Related Information:</strong> If applicable, we collect details such as company name, business contact details, and related information to provide our business-oriented services.</li>
          </ul>
        </section>

        {/* Data Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Data</h2>
          <p className="text-gray-600">
            The personal data we collect is used for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li><strong>To Provide and Improve Our Services:</strong> We use your data to deliver personalized services, troubleshoot issues, and enhance user experience.</li>
            <li><strong>To Communicate with You:</strong> We send service-related emails, including updates, offers, and security alerts.</li>
            <li><strong>For Security and Fraud Prevention:</strong> We may use your data to detect, prevent, and respond to fraud or security issues.</li>
            <li><strong>Business Data:</strong> Information related to your business is used to provide customized business policies and solutions as per your requirements.</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Data Sharing and Disclosure</h2>
          <p className="text-gray-600">
            We do not sell or rent your personal data to third parties. However, we may share your data with trusted partners for the following reasons:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li><strong>Service Providers:</strong> We may share your data with third-party vendors who help us provide and improve our services.</li>
            <li><strong>Legal Requirements:</strong> If required by law, we may disclose your data to comply with legal obligations, protect our rights, or ensure the safety of others.</li>
          </ul>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">How We Protect Your Data</h2>
          <p className="text-gray-600">
            We use industry-standard security measures to protect your personal data. This includes encryption, secure servers, and other measures to ensure your data is kept confidential and safe from unauthorized access.
          </p>
        </section>

        {/* Your Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Your Data Rights</h2>
          <p className="text-gray-600">
            As a user of CyberPolicy-Pro, you have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li><strong>Access Your Data:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Rectify Your Data:</strong> Request corrections to any inaccurate or incomplete data.</li>
            <li><strong>Delete Your Data:</strong> Request that we delete your data under certain circumstances.</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy or your personal data, please contact us at:
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> support@cyberpolicy-pro.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
