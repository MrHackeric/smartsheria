import messageService from "../services/messageService.js";

// Fetch chat history
const fetchMessages = async (req, res) => {
  try {
    const messages = await messageService.getMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { text, replyTo } = req.body;
    if (!text) return res.status(400).json({ error: "Message text is required" });

    const savedMessage = await messageService.saveMessage(text, replyTo);
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error processing message" });
  }
};

export { fetchMessages, sendMessage };
