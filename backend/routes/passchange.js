import express from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import User schema
import Otp from '../models/OtpSchema.js';

dotenv.config();

const router = express.Router();

/**
 * 📌 Step 1: Send Verification Code to User's Email
 */
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate a 6-digit verification code
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 mins

        // Store OTP in OtpSchema
        await Otp.create({
            userId: user._id,
            otpCode,
            otpExpiresAt,
        });

        // Configure email sender
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Verification Code',
            text: `Your password reset code is: ${otpCode}. It is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Verification code sent to email' });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

/**
 * 📌 Step 2: Verify the Code
 */
router.post('/verify-code', async (req, res) => {
    const { email, code } = req.body;

    console.log("Received request for verification:", req.body); // Log entire request body

    try {
        if (!email) {
            console.log("Error: Missing email");
            return res.status(400).json({ message: 'Email is required.' });
        }
        if (!code) {
            console.log("Error: Missing code");
            return res.status(400).json({ message: 'Verification code is required.' });
        }

        console.log(`Checking for user with email: ${email.toLowerCase()}`);
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.log("Error: User not found in database");
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`Checking OTP for user ID: ${user._id} with code: ${code}`);
        const otpRecord = await Otp.findOne({ userId: user._id, otpCode: code });

        if (!otpRecord) {
            console.log("Error: OTP record not found or incorrect OTP");
            return res.status(400).json({ message: 'Invalid verification code.' });
        }

        if (new Date() > otpRecord.otpExpiresAt) {
            console.log("Error: OTP has expired");
            return res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
        }

        // Generate JWT token (valid for 15 minutes)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        console.log("Verification successful, generating token...");

        // Remove OTP after successful verification
        await Otp.deleteOne({ _id: otpRecord._id });

        res.status(200).json({ message: 'Code verified successfully', token });
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ message: 'Error verifying code', error: error.message });
    }
});


/**
 * 📌 Step 3: Reset Password
 */
router.post("/reset-password", async (req, res) => {
    console.log("Received request body:", req.body); // Log incoming data

    const { email, password } = req.body; // Check if these are received

    if (!email || !password) {
        console.log("Missing required fields:", { email, password });
        return res.status(400).json({ message: "Email and new password are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found:", email);
            return res.status(404).json({ message: "User not found." });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Error updating password." });
    }
});


export default router;
