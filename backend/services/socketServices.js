import Message from '../models/communityMessageModel.js';

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', async (msg) => {
      try {
        const savedMessage = await new Message(msg).save();
        io.emit('message', savedMessage); // Send message to all clients
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
