import { io } from 'socket.io-client';

// Define the socket connections
const socket = io('http://localhost:5000'); // Replace with your server URL if different
// const aiSocket = io('http://localhost:3000/ai'); // Replace with the correct namespace or endpoint

// Export both sockets
export { socket };
