// aiService.js
import { model, generationConfig } from '../utils/geminiConfig.js';
import axios from 'axios';

const CHATBOT_API_URL = 'http://localhost:5000/api/chatbot';

export const generateAIResponse = async (userInput) => {
  try {
    const chatSession = model.startChat({ generationConfig, history: [] });
    const result = await chatSession.sendMessage(userInput);
    return result.response.text();
  } catch (error) {
    console.error('AI Error:', error);
    return 'Sorry, I couldn’t process your request.';
  }
};

export const requestAiResponse = async (text) => {
  try {
    const response = await axios.post(CHATBOT_API_URL, { message: text });
    return response.data.reply || 'No response available.';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
};