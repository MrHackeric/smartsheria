import express from "express";
import User from "../models/User.js"; // Import your User model
import { verifyToken } from "../middleware/authMiddleware.js"; // Middleware for authentication

const router = express.Router();

// Fetch user details
router.get("/users/:id", verifyToken, async (req, res) => {
  console.log(`Fetching user details for ID: ${req.params.id}`);
  try {
    const user = await User.findById(req.params.id).select("fullname email phoneNumber");
    if (!user) {
      console.warn(`User not found: ${req.params.id}`);
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`User found: ${JSON.stringify(user)}`);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update user details
router.put("/users/:id", verifyToken, async (req, res) => {
  console.log(`Updating user details for ID: ${req.params.id}`);
  console.log("Request body:", req.body);
  try {
    const { fullname, email, phoneNumber } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullname, email, phoneNumber },
      { new: true, select: "fullname email phoneNumber" }
    );
    if (!updatedUser) {
      console.warn(`User not found for update: ${req.params.id}`);
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`User updated successfully: ${JSON.stringify(updatedUser)}`);
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
