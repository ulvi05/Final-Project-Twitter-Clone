import { DefaultEventsMap, Socket } from "socket.io";

export function SocketHandlers(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  const socketUsers: Record<string, string> = {};

  socket.on("register", (userId: string) => {
    onRegister(userId, socket, socketUsers);
  });

  socket.on("message", (data: { message: string; to: string }) =>
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

function onMessage(
  { message, to }: { message: string; to: string },
  socket: Socket,
  socketUsers: Record<string, string>
) {
  if (!socket.data.user) {
    return socket.emit("error", "Authentication required");
  }

  const socketId = socketUsers[to];
  if (socketId) {
    socket.to(socketId).emit("message", {
      message,
      from: socket.data.user.id,
    });
  } else {
    console.log("User not found");
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
