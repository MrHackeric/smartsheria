import axios from 'axios';

export const analyzeTextWithAI = async (text) => {
  try {
    const response = await axios.post('/ai/analyze', {
      text: text,
    });

    return response.data; // Expected response: analyzed score based on text
  } catch (error) {
    console.error('Error analyzing text:', error);
    return { error: 'AI analysis failed' };
  }
};
