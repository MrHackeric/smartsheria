// models/Chat.js (Community Chat Schema)
const ChatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Chat', ChatSchema);