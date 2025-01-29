import admin from "firebase-admin";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import { readFile } from "fs/promises";
import { Server } from "socket.io";
import http from "http"; // Needed for Socket.IO

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Load Firebase Admin SDK
const serviceAccount = JSON.parse(
  await readFile(new URL("./serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const messagesCollection = db.collection("messages");

// Encryption Configuration
const ENCRYPTION_KEY = "your32characterlongencryptionkey"; // Must be 32 characters
const IV_LENGTH = 16;

const encryptMessage = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

const decryptMessage = (encryptedText) => {
  const parts = encryptedText.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedData = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send all messages when a user connects
  messagesCollection.orderBy("timestamp", "asc").get().then((snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      sender: doc.data().sender,
      text: decryptMessage(doc.data().text),
      timestamp: doc.data().timestamp,
      likes: doc.data().likes,
      replyTo: doc.data().replyTo,
    }));
    socket.emit("loadMessages", messages);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// API to save encrypted messages & notify clients
app.post("/send-message", async (req, res) => {
  try {
    const { sender, text, timestamp, likes, replyTo } = req.body;
    const encryptedText = encryptMessage(text);

    const message = {
      sender,
      text: encryptedText,
      timestamp: timestamp || new Date().toISOString(),
      likes: likes || 0,
      replyTo: replyTo || null,
    };

    const docRef = await messagesCollection.add(message);

    // Broadcast new message to all connected clients
    io.emit("newMessage", {
      id: docRef.id,
      sender,
      text: decryptMessage(encryptedText),
      timestamp: message.timestamp,
      likes: message.likes,
      replyTo: message.replyTo,
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
