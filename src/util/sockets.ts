// utils/socket.ts
import { io, Socket } from "socket.io-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    console.log(socket);
    
  }
  return socket;
};

export default getSocket;
