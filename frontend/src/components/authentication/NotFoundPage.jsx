import React from 'react';
import { FaHome } from 'react-icons/fa'; // Icon for home button

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-yellow-500 to-orange-500">
      <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 space-y-4">
        <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 text-center max-w-md">
          Oops! It looks like the page you're looking for doesn't exist. It may have been moved or deleted.
        </p>

        {/* Home Button */}
        <button
          onClick={() => (window.location.href = '/')} // Redirect to home
          className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg font-semibold flex items-center shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaHome className="mr-2" /> Go to Homepage
        </button>

        {/* Animation/GIF Placeholder */}
        <div className="mt-8">
          <img
            src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
            alt="404 error animation"
            className="w-64 h-64"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
