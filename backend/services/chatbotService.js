import Message from "../models/messageModel.js";
import CommunityMessage from "../models/communityMessageModel.js"; 
import { fetchGeminiResponse } from "../utils/geminiApi.js";

// Save user message to DB
export const saveMessage = async (messageData) => {
  try {
    const message = new CommunityMessage(messageData);
    return await message.save();
  } catch (error) {
    throw new Error("Error saving message: " + error.message);
  }
};

// Fetch all messages from DB
export const fetchMessages = async () => {
  try {
    return await CommunityMessage.find().sort({ timestamp: 1 });
  } catch (error) {
    throw new Error("Error fetching messages: " + error.message);
  }
};

// Process user message and get AI response
export const processUserMessage = async (text, senderId) => {
  try {
    // Save user message
    const userMessage = new Message({ text, sender: senderId });
    await userMessage.save();

    // Get AI response
    const botResponseText = await fetchGeminiResponse(text);

    // Save bot response to MongoDB
    const botMessage = new Message({ text: botResponseText, sender: "bot" });
    await botMessage.save();

    return botMessage; // Send bot response back to UI
  } catch (error) {
    throw new Error("Error processing message: " + error.message);
  }
};
