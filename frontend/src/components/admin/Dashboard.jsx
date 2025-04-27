import React, { useState } from 'react';
import AdminBugReportsPage from './AdminBugReportsPage';
import AdminUsersPage from './adminUsersPage';

const AdminDashboard = () => {
  const [showUsersPage, setShowUsersPage] = useState(true); // State to toggle between Users and Bug Reports

  const togglePage = () => {
    setShowUsersPage(!showUsersPage); // Toggle between the two pages
  };

  return (
    <div className="admin-dashboard">
      <h1 className="text-4xl text-center font-bold py-4">Admin Dashboard</h1>
      
      <button
        onClick={togglePage}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showUsersPage ? 'Go to Bug Reports' : 'Go to Users'}
      </button>

      {showUsersPage ? (
        <AdminUsersPage /> // Show Users page when true
      ) : (
        <AdminBugReportsPage /> // Show Bug Reports page when false
      )}
    </div>
  );
};

export default AdminDashboard;
