import express from "express";
import { fetchMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/", fetchMessages); // Fetch messages
router.post("/", sendMessage); // Send message

export default router;
