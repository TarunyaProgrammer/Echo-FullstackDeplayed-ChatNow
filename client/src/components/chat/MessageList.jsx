import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../hooks/useAuth";

function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageList() {
  const { messages } = useChat();
  const { user } = useAuth();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages.length) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ color: "#525252", fontSize: "14px" }}>
          No messages yet — say hello! 👋
        </p>
      </div>
    );
  }

  return (
    <div
      className="px-4 py-4 md:px-7 md:py-6"
      style={{
        flex: 1,
        overflowY: "auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {messages.map((msg, i) => {
        const mine = (msg.sender?._id || msg.sender) === user._id;
        const prevSame =
          i > 0 &&
          (messages[i - 1].sender?._id || messages[i - 1].sender) ===
            (msg.sender?._id || msg.sender);

        return (
          <motion.div
            key={msg._id || i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: Math.min(i * 0.015, 0.2) }}
            style={{
              display: "flex",
              justifyContent: mine ? "flex-end" : "flex-start",
              marginTop: prevSame ? "4px" : "16px",
            }}
          >
            <div
              style={{
                maxWidth: "min(85%, 500px)",
                padding: "10px 16px",
                borderRadius: mine
                  ? "18px 18px 6px 18px"
                  : "18px 18px 18px 6px",
                background: mine
                  ? "linear-gradient(135deg, #ef4444, #dc2626)"
                  : "rgba(26, 26, 26, 0.8)",
                color: mine ? "#ffffff" : "#d4d4d4",
                border: mine ? "none" : "1px solid rgba(42, 42, 42, 0.5)",
                boxShadow: mine
                  ? "0 2px 12px rgba(239, 68, 68, 0.2)"
                  : "0 1px 4px rgba(0,0,0,0.15)",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.5",
                  margin: 0,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.content}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  margin: "4px 0 0 0",
                  textAlign: "right",
                  color: mine ? "rgba(255,255,255,0.5)" : "#525252",
                }}
              >
                {formatTime(msg.createdAt)}
              </p>
            </div>
          </motion.div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
