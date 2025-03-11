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
  console.log("✅ User Connected:", userId, "Socket ID:", socket.id);
  console.log("📌 Updated socketUsers list:", socketUsers);
}

async function onMessage(
  { message, to, from }: { message: string; to: string; from: string },
  socket: Socket
) {
  try {
    console.log(`🔵 [onMessage] incoming message data:`, { message, from, to });

    if (from === to) {
      console.log("❌ Kullanıcı kendisine mesaj göndermeye çalıştı.");
      return socket.emit("error", "You cannot message yourself.");
    }

    const sender = await User.findById(from).select("fullName");
    if (!sender) {
      console.log("❌ User not found (SENDER , from):", from);
      return socket.emit("error", "User not found");
    }

    console.log(`💬 Message arrived: ${message}, From: ${from}, To: ${to}`);

    const recipientId = to;
    console.log("🎯 Receiver's socket ID:", socketUsers[recipientId]);

    if (!socketUsers[recipientId]) {
      console.log(
        `❌ The message did not go through because ${recipientId} It is not available in socketUsers.`
      );
      return;
    }

    console.log(`📌 Search conversation:`, { from, recipientId });

    const conversation = await Conversation.findOne({
      $or: [
        { userId: from, recipientId: recipientId },
        { userId: recipientId, recipientId: from },
      ],
    });

    if (!conversation) {
      console.log("❌ Conversation not found.");
      return;
    }

    console.log("✅ Conversation found, ID:", conversation._id);

    const recipient = await User.findById(recipientId).select("username");
    if (!recipient) return socket.emit("error", "Recipient not found");

    const messageItem = await Message.create({
      text: message,
      userId: from,
      recipientId: to,
      recipientName: recipient.username,
      username: sender.fullName,
      conversation: conversation._id,
    });

    conversation.messages.push(messageItem._id);
    await conversation.save();

    console.log("✅ Message saved:", messageItem);

    const socketId = socketUsers[recipientId];

    if (socketId) {
      console.log(`📤 Message ${recipientId} user sended...`);
      socket.to(socketId).emit("message", messageItem);
      console.log(`✅ Message successfully ${recipientId} send to user.`);
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
