import express from "express";
import { createMessage, getMessages } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/", createMessage); // Send message & get AI response
router.get("/", getMessages); // Fetch all chat messages from DB

export default router;
