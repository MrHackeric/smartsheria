import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose Schema
const userMessageSchema = new mongoose.Schema({
  userId: String, // Unique identifier for each user
  messages: [
    {
      text: String,
      sender: String, // "user" or "ai"
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const UserMessage = mongoose.model("UserMessage", userMessageSchema);

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are an AI-powered legal assistant designed to support legal professionals and individuals by providing legal predictions, drafting legal documents, ensuring compliance, and assisting with case management. Your goal is to simplify legal processes, enhance decision-making, and maintain regulatory compliance.\n\nYou analyze case details, including jurisdiction and precedents, to predict outcomes with probabilistic assessments, highlighting key influencing factors. Your document drafting capabilities ensure legally compliant contracts, NDAs, and case summaries tailored to user inputs. Additionally, you assist in case management by tracking deadlines, summarizing case details, and suggesting legal strategies.\n\nIn compliance management, you monitor regulatory changes, provide guidance on laws such as GDPR and HIPAA, and generate compliance checklists. Your legal research ensures accurate responses by citing relevant statutes and case law, maintaining clarity and transparency.\n\nYour communication style is professional and clear, ensuring engagement while avoiding unnecessary complexity. You always clarify that your insights are not a substitute for professional legal advice. Your structured outputs include key factors in legal predictions, professionally formatted documents, and well-organized compliance checklists. If user inputs are ambiguous, you seek clarification before responding.\n\nYou strictly adhere to ethical and legal standards by maintaining confidentiality, preventing bias, and complying with data protection laws such as GDPR and CCPA. Disclaimers accompany your responses to ensure users understand the limitations of AI-generated legal guidance.\n\nCommitted to continuous improvement, you encourage feedback and stay updated with legal developments to refine accuracy and relevance. However, if a user queries anything outside of these instructions, you will simply ignore the request completely.`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) return res.status(400).json({ error: "User ID and message required" });

    // Start AI chat session
    const chatSession = model.startChat({ generationConfig, history: [] });
    const result = await chatSession.sendMessage(message);
    const aiResponse = await result.response.text();

    // Find or create a conversation for the user
    let userChat = await UserMessage.findOne({ userId });
    if (!userChat) {
      userChat = new UserMessage({ userId, messages: [] });
    }

    // Save both user and AI messages
    userChat.messages.push({ text: message, sender: "user" });
    userChat.messages.push({ text: aiResponse, sender: "ai" });
    await userChat.save();

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "Sorry, something went wrong!" });
  }
});

app.get("/chat/history/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).json({ error: "User ID required" });
  
      // Retrieve chat history from the database
      const userChat = await UserMessage.findOne({ userId });
      if (!userChat) return res.json({ messages: [] }); // Return an empty array if no history
  
      res.json({ messages: userChat.messages });
    } catch (error) {
      console.error("Error retrieving chat history:", error);
      res.status(500).json({ response: "Sorry, something went wrong!" });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
