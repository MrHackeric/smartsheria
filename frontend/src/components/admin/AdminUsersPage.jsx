import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaSyncAlt, FaPrint, FaTrashAlt, FaPlus } from 'react-icons/fa';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', phoneNumber: '', password: 'SmartSheria@2025,.' });

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function for users
  const debouncedSearch = async (query) => {
    try {
      if (!query.trim()) {
        fetchUsers(); // If search query is empty, fetch all users
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/users/search?query=${query}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  // Handle search input change for users
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value); // Call the debounced search function
  };

  // Handle adding a user
  const handleAddUser = async () => {
    if (!newUser.fullName || !newUser.email || !newUser.phoneNumber) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', newUser);
      setNewUser({ fullName: '', email: '', phoneNumber: '', password: 'SmartSheria@2025,.' });
      fetchUsers(); // Refresh the list of users
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Handle deleting a user by ID
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle printing the page
  const handlePrint = () => {
    window.print(); // Print the page
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">User Management</h2>

      {/* Add User Form */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Name/Username"
          value={newUser.fullName}
          onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
          className="p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={newUser.phoneNumber}
          onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
          className="p-2 border rounded"
        />

        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center"
        >
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>

      {/* Search and Refresh for Users */}
      <div className="flex items-center gap-4 mt-6">
        <div className="flex items-center w-1/2 border border-gray-300 rounded-lg p-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search users"
            className="w-full focus:outline-none"
          />
        </div>

        <button
          onClick={fetchUsers}
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

      {/* Users Table */}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto mt-4">
          {users.length === 0 ? (
            <div className="text-center text-gray-500">No users found</div>
          ) : (
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Name/Username</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{user.fullName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phoneNumber}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
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

export default AdminUsersPage;
