// utils/socket.ts
import { io, Socket } from "socket.io-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      // Keep websocket first, but allow polling fallback behind strict proxies.
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });
  }

  if (socket.disconnected) {
    socket.connect();
  }

  return socket;
};

export default getSocket;
