// backend/controllers/userController.js

import User from '../models/User.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a user
export const addUser = async (req, res) => {
  const { fullName, email, phoneNumber } = req.body;

  try {
    // Validate that all required fields are provided
    if (!fullName || !email || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newUser = new User({ fullName, email, phoneNumber });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search users (simple name, email, and phone search)
export const searchUsers = async (req, res) => {
  const { query } = req.query;
  
  try {
    const users = await User.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phoneNumber: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
