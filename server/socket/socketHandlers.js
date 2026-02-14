const onlineUsers = new Map();
console.log("🔥 socketHandlers initialized");

const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // user joins with their userId
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("User joined:", userId);
    });

    // send message event
    socket.on("sendMessage", ({ sender, receiver, content }) => {
      const receiverSocket = onlineUsers.get(receiver);

      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", {
          sender,
          content,
        });
      }
    });

    socket.on("disconnect", () => {
      // Remove user from onlineUsers map
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log("User removed from online:", userId);
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketHandlers;
