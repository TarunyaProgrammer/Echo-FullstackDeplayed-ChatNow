import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../services/socket";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Connect socket when user is set
  useEffect(() => {
    if (user && token) {
      socket.connect();
      socket.emit("join", user._id);
      console.log("🟢 Socket connected for user:", user._id);
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [user, token]);

  const login = (userData) => {
    const { token: jwt, ...userInfo } = userData;
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setToken(jwt);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    socket.disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
