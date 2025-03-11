import { model, generationConfig } from '../utils/geminiConfig.js';
import axios from 'axios';

const CHATBOT_API_URL = 'http://localhost:5000/api/chatbot'; // Update with your actual chatbot API URL

/**
 * Generates an AI response using the Gemini model.
 * @param {string} userInput - The user's input message.
 * @returns {Promise<string>} - The AI-generated response.
 */
export const generateAIResponse = async (userInput) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(userInput);
    return result.response.text();
  } catch (error) {
    console.error('AI Error:', error);
    return 'Sorry, I couldn’t process your request.';
  }
};

/**
 * Sends a request to the chatbot backend API for an AI-generated response.
 * @param {string} text - The user's input message.
 * @returns {Promise<string>} - The AI-generated reply from the backend.
 */
export const requestAiResponse = async (text) => {
  try {
    const response = await axios.post(CHATBOT_API_URL, { message: text });
    return response.data.reply || 'No response available.';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
};
