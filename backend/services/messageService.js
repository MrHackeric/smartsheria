import axios from 'axios';
import Message from '../models/messageModel.js';
import { generateAIResponse } from './aiService.js';

const API_URL = 'http://localhost:5000'; // Replace with your backend API URL

// Fetch messages from the server
export const fetchMessages = async (setMessages) => {
  try {
    const { data } = await axios.get(`${API_URL}/messages`);
    setMessages(data);
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

// Save user message & generate AI response (if needed)
export const saveMessage = async (text, replyTo = null) => {
  try {
    const userMessage = new Message({
      text,
      sender: 'user',
      replyTo,
      timestamp: new Date(),
    });

    await userMessage.save(); // Save user message to MongoDB

    let botMessage = null;
    if (!replyTo) {
      const aiResponse = await generateAIResponse(text);
      botMessage = new Message({
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      });

      await botMessage.save(); // Save bot response to MongoDB
    }

    return { userMessage, botMessage };
  } catch (error) {
    console.error("Error saving message:", error);
  }
};


// Get all messages
export const getMessages = async () => {
  return await Message.find().sort({ timestamp: 1 });
};

// Send a message to the community/chatbot
export const sendMessage = async (text, replyTo, setMessages) => {
  try {
    const response = await axios.post(`${API_URL}/send-message`, { text, replyTo });

    setMessages((prev) => [
      ...prev,
      { text, sender: "user", replyTo },
      response.data.botMessage && { text: response.data.botMessage.text, sender: "bot" },
    ].filter(Boolean));
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


// Export functions
export default { getMessages, saveMessage, fetchMessages, sendMessage };
