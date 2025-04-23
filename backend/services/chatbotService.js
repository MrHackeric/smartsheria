import Message from "../models/messageModel.js";
import { generateAIResponse } from "./aiService.js";

// Process user message, generate AI response, and store both in DB
export const processUserMessage = async (text, senderId) => {
  try {
    // Save user message
    const userMessage = new Message({ senderId, text, isBot: false });
    await userMessage.save();

    // Generate AI response
    const aiResponseText = await generateAIResponse(text);

    // Save AI response
    const botMessage = new Message({ senderId, text: aiResponseText, isBot: true });
    await botMessage.save();

    return { userMessage, botMessage };
  } catch (error) {
    throw new Error("Error processing message: " + error.message);
  }
};

// Fetch all messages
export const fetchMessages = async () => {
  try {
    return await Message.find().sort({ timestamp: 1 });
  } catch (error) {
    throw new Error("Error fetching messages: " + error.message);
  }
};
