import { useState, useEffect, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut,
  MessageCircle,
  Search,
  Settings,
  Bell,
  Wifi,
  WifiOff,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";
import { ChatProvider, useChat } from "../context/ChatContext";
import ConversationList from "../components/sidebar/ConversationList";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import ChatBackground3D from "../components/chat/ChatBackground3D";

function ChatContent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();
  const { selectedUser, selectUser: originalSelectUser } = useChat();
  const [showSidebar, setShowSidebar] = useState(true);

  const initials = user?.username?.slice(0, 2).toUpperCase() || "?";

  /* Wrap selectUser so that on mobile it hides the sidebar */
  const handleSelectUser = useCallback(
    (u) => {
      originalSelectUser(u);
      setShowSidebar(false);
    },
    [originalSelectUser],
  );

  return (
    <div className="h-dvh flex bg-dark-950 overflow-hidden">
      {/* ─── Sidebar ──────────────────────────────── */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`shrink-0 flex-col bg-dark-900 border-r border-dark-800 w-full md:w-80 ${showSidebar ? "flex" : "hidden"} md:flex`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-dark-800">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <img
                src="/echo-logo.png"
                alt="Echo"
                className="w-8 h-8 rounded-lg"
              />
              <h1 className="text-lg font-bold text-white tracking-tight">
                Echo
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                  isConnected
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
                {isConnected ? "Live" : "Offline"}
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2.5 bg-dark-800 rounded-xl px-3.5 py-2.5 border border-dark-700/50 focus-within:border-primary-500/50 transition-colors">
            <Search size={16} className="text-dark-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="flex-1 bg-transparent outline-none text-sm text-dark-200 placeholder:text-dark-500"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider">
              Messages
            </p>
          </div>
          <ConversationList onSelect={handleSelectUser} />
        </div>

        {/* User profile footer */}
        <div className="p-4 border-t border-dark-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-600/20">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark-100 truncate">
                {user.username}
              </p>
              <p className="text-xs text-dark-500 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="p-2 text-dark-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </motion.aside>

      <main
        className={`flex-1 flex-col min-w-0 ${!showSidebar ? "flex" : "hidden"} md:flex`}
        style={{ background: "#0b1120", position: "relative" }}
      >
        {/* 3D animated background */}
        <Suspense fallback={null}>
          <ChatBackground3D />
        </Suspense>

        {selectedUser ? (
          <>
            {/* Chat header */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid rgba(30, 41, 59, 0.6)",
                background: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* Back button – visible on mobile only */}
              <button
                onClick={() => setShowSidebar(true)}
                className="md:hidden p-1.5 -ml-1 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors cursor-pointer"
                aria-label="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>

              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {selectedUser.username?.slice(0, 2).toUpperCase()}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    right: "-1px",
                    width: "13px",
                    height: "13px",
                    background: "#10b981",
                    borderRadius: "50%",
                    border: "2px solid #0f172a",
                  }}
                />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#e2e8f0",
                    margin: 0,
                  }}
                >
                  {selectedUser.username}
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#10b981",
                    margin: "2px 0 0 0",
                  }}
                >
                  Online
                </p>
              </div>
            </motion.div>

            {/* Messages */}
            <MessageList />

            {/* Input */}
            <MessageInput />
          </>
        ) : (
          /* Empty state */
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.06) 0%, transparent 60%), #0b1120",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "0 24px" }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto 24px",
                  borderRadius: "20px",
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(59,130,246,0.1)",
                }}
              >
                <MessageCircle size={36} style={{ color: "#60a5fa" }} />
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#cbd5e1",
                  margin: "0 0 8px 0",
                }}
              >
                Start a Conversation
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                  maxWidth: "280px",
                  margin: "0 auto",
                }}
              >
                Select someone from the sidebar to begin chatting in real-time
              </p>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
}
