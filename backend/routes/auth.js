import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyToken } from '../middleware/authMiddleware.js';

dotenv.config();
const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
    try {
        const { fullName, userName, email, phoneNumber, password } = req.body;

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Create new user
        const newUser = new User({ fullName, userName, email, phoneNumber, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token, user: { fullName: user.fullName, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
  return res.status(200).json({ message: "Logout successful" });
});

export default router;
