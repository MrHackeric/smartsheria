import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminUser.js';
import { validationResult } from 'express-validator';

// Admin Registration (Sign up)
export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`Signup attempt failed: Email already exists - ${email}`);
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log(`New admin account created successfully: ${email}`);
    res.status(201).json({ message: 'Admin account created successfully!' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};

// Admin Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log(`Login attempt failed: Invalid email - ${email}`);
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log(`Login attempt failed: Invalid password for email - ${email}`);
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, 'your-jwt-secret', { expiresIn: '1h' });

    console.log(`Login successful: ${email}`);
    res.status(200).json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};
