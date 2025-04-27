import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaSyncAlt, FaPrint } from 'react-icons/fa';

const AdminBugReportsPage = () => {
  const [bugReports, setBugReports] = useState([]);
  const [bugSearchQuery, setBugSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch bug reports on component mount
  useEffect(() => {
    fetchBugReports();
  }, []);

  // Fetch bug reports from the backend
  const fetchBugReports = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/bugreports');
      setBugReports(response.data);
    } catch (error) {
      console.error('Error fetching bug reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function for bug reports
  const debouncedBugSearch = async (query) => {
    try {
      if (!query.trim()) {
        fetchBugReports(); // If search query is empty, fetch all bug reports
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/bugreports/search?query=${query}`);
      setBugReports(response.data);
    } catch (error) {
      console.error('Error searching bug reports:', error);
    }
  };

  // Handle search input change for bug reports
  const handleBugSearchChange = (e) => {
    setBugSearchQuery(e.target.value);
    debouncedBugSearch(e.target.value); // Call the debounced search function
  };

  // Handle printing the page
  const handlePrint = () => {
    window.print(); // Print the page
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Bug Reports</h2>

      {/* Search and Refresh for Bug Reports */}
      <div className="flex items-center gap-4 mt-6">
        <div className="flex items-center w-1/2 border border-gray-300 rounded-lg p-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            value={bugSearchQuery}
            onChange={handleBugSearchChange}
            placeholder="Search bug reports"
            className="w-full focus:outline-none"
          />
        </div>

        <button
          onClick={fetchBugReports}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaSyncAlt className="mr-2" /> Refresh
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          <FaPrint className="mr-2" /> Print
        </button>
      </div>

      {/* Bug Reports Table */}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto mt-4">
          {bugReports.length === 0 ? (
            <div className="text-center text-gray-500">No bug reports found</div>
          ) : (
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">OS</th>
                  <th className="px-4 py-2">Browser</th>
                  <th className="px-4 py-2">Issue</th>
                  <th className="px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {bugReports.map((report) => (
                  <tr key={report._id} className="border-t">
                    <td className="px-4 py-2">{report.email}</td>
                    <td className="px-4 py-2">{report.operatingSystem}</td>
                    <td className="px-4 py-2">{report.browser}</td>
                    <td className="px-4 py-2">{report.issueDescription}</td>
                    <td className="px-4 py-2">{new Date(report.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBugReportsPage;
