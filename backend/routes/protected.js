import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Community Route
router.get("/community", verifyToken, (req, res) => {
    res.json({ message: "Welcome to the Community", user: req.user });
});

// Protected Chatbot Route
router.get("/chatbot", verifyToken, (req, res) => {
    res.json({ message: "Accessing Chatbot", user: req.user });
});

// Protected Notifications Route
router.get("/notifications", verifyToken, (req, res) => {
    res.json({ message: "Fetching Notifications", user: req.user });
});

// Protected Settings Route
router.get("/settings", verifyToken, (req, res) => {
    res.json({ message: "Accessing Settings", user: req.user });
});

// Protected Report Route
router.get("/report", verifyToken, (req, res) => {
    res.json({ message: "Report System Issues", user: req.user });
});

export default router;
