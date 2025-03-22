import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import transporter from "../config/nodemailer.js"; // Ensure nodemailer config is correct
import express from 'express';
import Otp from "../models/OtpSchema.js";

const router = express.Router(); // ✅ Define router

// 🔹 User Signup Route
router.post("/signup", async (req, res) => {
    try {
        // 🔹 Extract user input from request body
        const { fullName, email, phoneNumber, password } = req.body;

        // 🔹 Validate that all fields are provided
        if (!fullName || !email || !phoneNumber || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // 🔹 Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please log in." });
        }

        // 🔹 Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Create a new user (initially not verified)
        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            isVerified: false, // User needs to verify email first
        });

        // 🔹 Save the new user to the database
        await newUser.save();

        // 🔹 Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

        // 🔹 Store the verification code separately in the Otp model
        await Otp.findOneAndUpdate(
            { userId: newUser._id }, // Find by userId
            { verificationCode, verificationExpiresAt: expiryTime }, // Update verification details
            { upsert: true, new: true } // Create if not found, return new record
        );

        // 🔹 Send the verification code to the user's email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification Code",
            text: `Your verification code is: ${verificationCode}. It expires in 10 minutes.`,
        });

        // 🔹 Generate a temporary JWT token (limited access until verification)
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email, isVerified: false }, // Token payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "15m" } // Token expires in 15 minutes
        );

        // 🔹 Respond with success message and user details
        res.status(201).json({
            message: "User registered successfully. Verification code sent to email.",
            userId: newUser._id, // Store this in frontend
            email: newUser.email,
            token // Temporary JWT token
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server Error. Please try again later." });
    }
});

// Verify Email and Generate Permanent Token
router.post("/verify-email-signup", async (req, res) => {
    // Extract email and verification code from request body
    const { email, code } = req.body;

    // Ensure both email and verification code are provided
    if (!email || !code) {
        return res.status(400).json({ message: "Email and code are required." });
    }

    try {
        // Find the user associated with the provided email
        const user = await User.findOne({ email });

        // If no user is found, return an error
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Retrieve OTP record from the database (Otp schema stores verification codes)
        const otpRecord = await Otp.findOne({ userId: user._id });

        // Check if OTP exists and matches the provided code
        if (!otpRecord || String(otpRecord.verificationCode) !== String(code)) {
            return res.status(400).json({ message: "Invalid verification code." });
        }

        // Check if the verification code has expired
        if (new Date() > otpRecord.verificationExpiresAt) {
            return res.status(400).json({ message: "Verification code expired." });
        }

        // ✅ Update user verification status
        user.isVerified = true;

        // Remove verification code from both user schema and Otp schema after successful verification
        user.verificationCode = null; // Clear code from User model (if stored)
        await user.save();
        await Otp.deleteOne({ userId: user._id }); // Remove OTP record after verification

        // Send success response
        return res.json({ message: "Email successfully verified!" });

    } catch (error) {
        // Log error for debugging
        console.error("Verification Error:", error);

        // Ensure no duplicate responses are sent
        if (!res.headersSent) {
            return res.status(500).json({ message: "Server error." });
        }
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        console.log("Received login request:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("Login successful for", email);

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        // Save OTP in Otp Schema
        const otpEntry = new Otp({
            userId: user._id,
            otpCode,
            otpExpiresAt
        });

        await otpEntry.save(); // Save OTP in the database

        // Send OTP via email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otpCode}. It expires in 10 minutes.`,
        });

        console.log(`✅ OTP sent to ${email}`);

        // Generate temporary token
        const tempToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "10m" });

        res.json({ token: tempToken, requiresOtp: true });
    } catch (error) {
        console.error("🚨 Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Verify OTP and generate authentication token
router.post("/verify-otp", async (req, res) => {
    try {
        console.log("🔹 Received OTP verification request:", req.body);

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Retrieve the latest OTP for the user
        const otpRecord = await Otp.findOne({ userId: user._id }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP not found. Request a new one." });
        }

        // Validate OTP and expiration
        if (otpRecord.otpCode !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date() > otpRecord.otpExpiresAt) {
            return res.status(400).json({ message: "OTP expired. Request a new one." });
        }

        console.log("✅ OTP Verified Successfully for", email);

        // Delete OTP after successful verification
        await Otp.deleteOne({ _id: otpRecord._id });

        // Mark user as verified
        user.isVerified = true;
        await user.save();

        // Generate authentication token
        const authToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "OTP verified successfully", token: authToken });

    } catch (error) {
        console.error("🚨 Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get authenticated user details
router.get("/user", async (req, res) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
    return res.status(200).json({ message: "Logout successful" });
});


export default router;
