import express from "express";
import { createMessage, getMessages } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/", createMessage); // Save user message & get AI response
router.get("/", getMessages); // Fetch chat history

export default router;
