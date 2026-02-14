import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Smile, Paperclip } from "lucide-react";
import { useChat } from "../../context/ChatContext";

export default function MessageInput() {
  const [text, setText] = useState("");
  const { sendMsg } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMsg(trimmed);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 py-3 md:px-6 md:py-4"
      style={{
        borderTop: "1px solid rgba(30, 41, 59, 0.6)",
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "rgba(30, 41, 59, 0.6)",
          borderRadius: "16px",
          padding: "8px 16px",
          border: "1px solid rgba(51, 65, 85, 0.4)",
          transition: "border-color 0.2s",
        }}
      >
        {/* Emoji */}
        <button
          type="button"
          style={{
            padding: "6px",
            color: "#64748b",
            background: "none",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Smile size={20} />
        </button>

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            background: "transparent",
            outline: "none",
            border: "none",
            fontSize: "14px",
            color: "#e2e8f0",
            padding: "8px 0",
          }}
        />

        {/* Attach */}
        <button
          type="button"
          style={{
            padding: "6px",
            color: "#64748b",
            background: "none",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Paperclip size={18} />
        </button>

        {/* Send */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          type="submit"
          disabled={!text.trim()}
          style={{
            padding: "10px",
            background: text.trim()
              ? "linear-gradient(135deg, #3b82f6, #2563eb)"
              : "rgba(51, 65, 85, 0.5)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            cursor: text.trim() ? "pointer" : "default",
            opacity: text.trim() ? 1 : 0.4,
            boxShadow: text.trim()
              ? "0 4px 12px rgba(59, 130, 246, 0.3)"
              : "none",
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s",
          }}
        >
          <Send size={16} />
        </motion.button>
      </div>
    </form>
  );
}
