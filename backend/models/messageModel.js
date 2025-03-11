import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Prevent overwriting the model if it already exists
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;