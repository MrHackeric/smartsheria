import { saveMessage, fetchMessages, processUserMessage } from "../services/chatbotService.js";

// Save new user message & get bot response
export const createMessage = async (req, res) => {
  try {
    const { text, senderId } = req.body;
    if (!text || !senderId) {
      return res.status(400).json({ error: "Text and senderId are required" });
    }

    // Process message & get AI response
    const botMessage = await processUserMessage(text, senderId);
    res.status(201).json(botMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await fetchMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
