// controllers/chatbot.js (AI Chatbot Controller)
import { generateAIResponse } from '../services/aiService.js';

export const chatbotResponse = async (req, res) => {
    const { message } = req.body;
    try {
        const aiReply = await generateAIResponse(message);
        res.json({ reply: aiReply });
    } catch (error) {
        res.status(500).json({ message: 'Error generating chatbot response' });
    }
};