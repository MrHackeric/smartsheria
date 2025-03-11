import CommunityMessage from "../models/communityMessageModel.js"; // Corrected Import

// Save new message
export const saveMessage = async (messageData) => {
  try {
    const message = new CommunityMessage(messageData);
    return await message.save();
  } catch (error) {
    throw new Error('Error saving message: ' + error.message);
  }
};

// Fetch all messages
export const fetchMessages = async () => {
  try {
    return await CommunityMessage.find().sort({ timestamp: 1 });
  } catch (error) {
    throw new Error('Error fetching messages: ' + error.message);
  }
};
