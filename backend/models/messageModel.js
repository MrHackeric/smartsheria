import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true }, 
  text: { type: String, required: true },  // Changed `userMessage` to `text`
  isBot: { type: Boolean, required: true }, // Added to differentiate user vs AI messages
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;
