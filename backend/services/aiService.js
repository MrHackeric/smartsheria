import { fetchGeminiResponse } from "../utils/geminiConfig.js";

// Fetch AI-generated response
export const generateAIResponse = async (userInput) => {
  try {
    const aiResponse = await fetchGeminiResponse(userInput);
    return aiResponse || "I'm sorry, I couldn't process your request.";
  } catch (error) {
    console.error("AI Error:", error);
    return "AI response unavailable at the moment.";
  }
};
