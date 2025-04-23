import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { socketHandler } from './services/socketServices.js';

// import chatbotRoutes from './routes/chatbotRoutes.js';
import authRoutes from './routes/auth.js';
import communityMessageRoutes from './routes/communityMessageRoutes.js';

import ChatbotRoutes from './routes/chatbotRoutes.js';
import passChangeRoutes from './routes/passchange.js';
import initializeSocket from './socket.js';
import bugReportRoutes from "./routes/bugReportRoutes.js";
import fetchUserRoutes from './routes/fetchUser.js';

dotenv.config();
connectDB();

const app = express(); // ✅ Define `app` first
const server = http.createServer(app); // ✅ Now create `server`

// Initialize Socket.IO
const io = initializeSocket(server);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Adjust based on frontend port
    methods: ['GET', 'POST'],
    credentials: true, // Allow cookies & auth headers
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('newMessage', (message) => {
    console.log('New message:', message);
    io.emit('messageReceived', message); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Use Routes
app.use('/api', authRoutes, fetchUserRoutes);//Sign up here, Verify Credentials, Login
app.use('/api/auth', passChangeRoutes);
app.use('/api/communityMessages', communityMessageRoutes);
app.use('/api/bugReports', bugReportRoutes);
app.use('/api/chatbot', ChatbotRoutes);

//Socket.io Setup
socketHandler(io);

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // ✅ Use `server.listen` instead of `app.listen`
