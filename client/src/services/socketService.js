import { socket } from "./socket";

export const joinRoom = (userId) => {
  socket.emit("join", userId);
};

export const emitSendMessage = ({ sender, receiver, content }) => {
  socket.emit("sendMessage", { sender, receiver, content });
};

export const onReceiveMessage = (callback) => {
  socket.on("receiveMessage", callback);
};

export const offReceiveMessage = (callback) => {
  socket.off("receiveMessage", callback);
};
