import { Server } from 'socket.io';
import { saveMessage } from './services/communityMessageService.js';

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', async (messageData) => {
      try {
        const savedMessage = await saveMessage(messageData);
        
        // Send the message to all users (including sender) only once
        io.emit('message', savedMessage);

      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io; // Now io is properly defined
};

export default initializeSocket;
