import { DefaultEventsMap, Socket } from "socket.io";
import Message from "../mongoose/schema/message";
import User from "../mongoose/schema/user";
import Conversation from "../mongoose/schema/conversation";

const socketUsers: Record<string, string> = {};
export function SocketHandlers(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  socket.on("register", (userId: string) => {
    onRegister(userId, socket);
  });

  socket.on("message", (data: { message: string; to: string; from: string }) =>
    onMessage(data, socket)
  );

  socket.on("disconnect", () => onDisconnect(socket));
}

function onRegister(userId: string, socket: Socket) {
  socketUsers[userId] = socket.id;
  console.log("a user connected", userId, socket.id);
  console.log("socketUsers", socketUsers);
}

async function onMessage(
  { message, to, from }: { message: string; to: string; from: string },
  socket: Socket
) {
  try {
    const sender = await User.findById(from).select("fullName");
    if (!sender) return socket.emit("error", "User not found");

    console.log(
      `💬 Mesaj gəldi: ${message}, Göndərən: ${from}, Qəbul edən: ${to}`
    );

    const recipientId = to.toString();
    console.log("🎯 Qəbul edənin socketId-si:", socketUsers[recipientId]);

    if (!socketUsers[recipientId]) {
      console.log(
        `❌ Mesaj getmədi, çünki ${recipientId} socketUsers-də yoxdur.`
      );
      return;
    }

    const conversation = await Conversation.findOne({
      $or: [
        { userId: from, recipientId: recipientId },
        { userId: recipientId, recipientId: from },
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

    const socketId = socketUsers[recipientId]; // <-- Düzgün şəkildə socketId alırıq

    if (socketId) {
      socket.to(socketId).emit("message", messageItem);
      console.log(`✅ Mesaj uğurla ${recipientId} istifadəçisinə göndərildi.`);
    }
  } catch (error) {
    console.log(error);
  }
}

function onDisconnect(socket: Socket) {
  console.log("user disconnected", socket.id);
  Object.entries(socketUsers).forEach((item) => {
    if (item[1] === socket.id) {
      delete socketUsers[item[0]];
    }
  });
}
