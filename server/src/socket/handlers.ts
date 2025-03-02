import { DefaultEventsMap, Socket } from "socket.io";
import Message from "../mongoose/schema/message";
import User from "../mongoose/schema/user";

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

    const socketId = socketUsers[to];

    const user = await User.findById(from);

    const messageItem = await Message.create({
      text: message,
      userId: from,
    });

    if (socketId) {
      socket.to(socketId).emit("message", {
        message,
        from: socket.data.user.id,
      });
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
