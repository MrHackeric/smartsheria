import { saveMessage, fetchMessages } from '../services/communityMessageService.js';

// Save a new message
export const createMessage = async (req, res) => {
  try {
    const { text, senderId } = req.body;
    if (!text || !senderId) {
      return res.status(400).json({ error: 'Text and senderId are required' });
    }

    const message = await saveMessage({ text, senderId });
    res.status(201).json(message);
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
