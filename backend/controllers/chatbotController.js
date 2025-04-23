import { fetchMessages, processUserMessage } from "../services/chatbotService.js";

// Handle user messages: process AI response & return it instantly
export const createMessage = async (req, res) => {
  try {  
    const { text, senderId } = req.body;
    if (!text || !senderId) {
      return res.status(400).json({ error: "Text and senderId are required" });
    }

    // Process message and get real-time AI response
    const { userMessage, botMessage } = await processUserMessage(text, senderId);

    // Return the AI response immediately
    res.status(201).json({
      user: userMessage,
      bot: botMessage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all messages from DB
export const getMessages = async (req, res) => {
  try {
    const messages = await fetchMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
