// utils/socket.ts
import { io, Socket } from "socket.io-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    const isProd = process.env.NODE_ENV === "production";
    socket = io(BASE_URL, {
      // Production proxy currently rejects WS upgrade ("code: 3 Bad request"),
      // so keep transport on polling for stable real-time behavior.
      transports: isProd ? ["polling"] : ["websocket", "polling"],
      upgrade: !isProd,
      path: "/socket.io/",
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
