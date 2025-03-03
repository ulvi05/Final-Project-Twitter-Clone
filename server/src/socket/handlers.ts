import { DefaultEventsMap, Socket } from "socket.io";
import Message from "../mongoose/schema/message";
import User from "../mongoose/schema/user";
import Conversation from "../mongoose/schema/conversation";

export function SocketHandlers(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  const socketUsers: Record<string, string> = {};

  socket.on("register", (userId: string) => {
    onRegister(userId, socket, socketUsers);
  });

  socket.on("message", (data: { message: string; to: string; from: string }) =>
    onMessage(data, socket, socketUsers)
  );

  socket.on("disconnect", () => onDisconnect(socket, socketUsers));
}

function onRegister(
  userId: string,
  socket: Socket,
  socketUsers: Record<string, string>
) {
  socketUsers[userId] = socket.id;
}

async function onMessage(
  { message, to, from }: { message: string; to: string; from: string },
  socket: Socket,
  socketUsers: Record<string, string>
) {
  try {
    if (!socket.data.user) {
      return socket.emit("error", "Authentication required");
    }

    const sender = await User.findById(from).select("fullName");
    if (!sender) return socket.emit("error", "User not found");

    const socketId = socketUsers[to];

    const conversation = await Conversation.findOne({
      $or: [
        { userId: from, recipientId: to },
        { userId: to, recipientId: from },
      ],
    });

    if (!conversation) return;

    const messageItem = await Message.create({
      text: message,
      userId: from,
      username: sender.fullName,
      conversation: conversation._id,
    });
    conversation.messages.push(messageItem._id);
    await conversation.save();

    if (socketId) {
      socket.to(socketId).emit("message", messageItem);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.log(error);
  }
}

function onDisconnect(socket: Socket, socketUsers: Record<string, string>) {
  console.log("user disconnected", socket.id);
  Object.entries(socketUsers).forEach((item) => {
    if (item[1] === socket.id) {
      delete socketUsers[item[0]];
    }
  });
}
