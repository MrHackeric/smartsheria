// routes/chatbot.js (Chatbot Routes)
import express from 'express';
import { chatbotResponse } from '../controllers/chatbot.js';

const router = express.Router();
router.post('/chat', chatbotResponse);

export default router;