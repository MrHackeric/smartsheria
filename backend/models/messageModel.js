import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Ensure each message is associated with a unique user
  userMessage: { type: String, required: true },
  aiResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Prevent overwriting the model if it already exists
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
