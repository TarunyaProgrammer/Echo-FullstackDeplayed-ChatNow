import api from "./api";

export const sendMessage = async (receiverId, content) => {
  const { data } = await api.post("/messages", { receiverId, content });
  return data;
};

export const getMessages = async (userId) => {
  const { data } = await api.get(`/messages/${userId}`);
  return data;
};

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};
