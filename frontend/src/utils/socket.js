import { io } from 'socket.io-client';

const SOCKET_URL = "http://localhost:5000"; // Ensure this matches backend

export const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});
