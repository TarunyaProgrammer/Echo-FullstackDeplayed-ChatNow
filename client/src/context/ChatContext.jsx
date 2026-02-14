import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import {
  getMessages,
  sendMessage as sendMessageAPI,
  getUsers,
} from "../services/messageService";
import {
  emitSendMessage,
  onReceiveMessage,
  offReceiveMessage,
} from "../services/socketService";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Fetch all users
  useEffect(() => {
    if (!user) return;
    getUsers()
      .then(setUsers)
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [user]);

  // Fetch messages when selecting a user
  useEffect(() => {
    if (!selectedUser) return;
    setLoadingMessages(true);
    getMessages(selectedUser._id)
      .then((data) => {
        setMessages(data);
        setLoadingMessages(false);
      })
      .catch((err) => {
        console.error("Failed to fetch messages:", err);
        setLoadingMessages(false);
      });
  }, [selectedUser]);

  // Listen for incoming socket messages
  useEffect(() => {
    if (!user) return;

    const handleReceive = (msg) => {
      // Only add to state if it's from the currently selected conversation
      setMessages((prev) => [...prev, msg]);
    };

    onReceiveMessage(handleReceive);
    return () => offReceiveMessage(handleReceive);
  }, [user, selectedUser]);

  const selectUser = useCallback((u) => {
    setSelectedUser(u);
    setMessages([]);
  }, []);

  const sendMsg = useCallback(
    async (content) => {
      if (!selectedUser || !content.trim()) return;

      // Save to DB via REST
      const saved = await sendMessageAPI(selectedUser._id, content);

      // Emit via socket for real-time delivery
      emitSendMessage({
        sender: user._id,
        receiver: selectedUser._id,
        content,
      });

      // Add to local state
      setMessages((prev) => [...prev, saved]);
    },
    [selectedUser, user],
  );

  return (
    <ChatContext.Provider
      value={{
        users,
        selectedUser,
        selectUser,
        messages,
        loadingMessages,
        sendMsg,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
