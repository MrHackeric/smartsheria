import mongoose from 'mongoose';

const communityMessageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    senderId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('CommunityMessage', communityMessageSchema);
