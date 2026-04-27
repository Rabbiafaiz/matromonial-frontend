import { generateRoomId } from "@/util/util";
import { useEffect, useState } from "react";
import getSocket from "@/util/sockets";

interface Message {
  roomId: string;
  authorId: string;
  authorName: string;
  receiverId: string;
  text: string;
  createdAt: Date;
}

const useChat = (roomId: string | null, userId: string) => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = getSocket();

    if (roomId) {
      socket.emit("join_room", roomId);
    }

    const handleReceiveMessage = (message: Message) => {
      console.log(message);

      if (user?._id === message?.receiverId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      if (roomId) {
        socket.emit("leave_room", roomId);
      }
    };
  }, [roomId]);

  const sendMessage = (messageText: string, receiverId: string) => {
    const socket = getSocket();
    if (socket) {
      const messageData = {
        roomId: roomId ? roomId : generateRoomId(receiverId, userId),
        authorId: userId,
        authorName: user?.name,
        receiverId,
        text: messageText,
        user: {
          _id: userId,
          name: user?.name,
        },
        createdAt: new Date(),
      };

      console.log(messageData);

      socket.emit("send_message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      localStorage.removeItem("chat_user");
    }
  };

  return { messages, sendMessage, setMessages };
};

export default useChat;
