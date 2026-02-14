import { io } from "socket.io-client";

// change these IDs to your DB users
const USER_ID = process.argv[2]; // pass via terminal

const socket = io("http://localhost:8000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("join", USER_ID);
  console.log("Joined as user:", USER_ID);
});

socket.on("receiveMessage", (data) => {
  console.log("📩 Message received:", data);
});

// helper to send message from terminal
process.stdin.on("data", (input) => {
  const text = input.toString().trim();

  socket.emit("sendMessage", {
    sender: USER_ID,
    receiver: process.argv[3], // target user
    content: text,
  });

  console.log("Sent:", text);
});
