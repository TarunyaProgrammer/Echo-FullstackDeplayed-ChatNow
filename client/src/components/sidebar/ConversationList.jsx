import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useChat } from "../../context/ChatContext";

/* Deterministic colour from username for avatars */
const colours = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-cyan-500 to-sky-600",
  "from-fuchsia-500 to-pink-600",
  "from-lime-500 to-green-600",
];

function hashColour(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return colours[Math.abs(h) % colours.length];
}

export default function ConversationList({ onSelect }) {
  const { users, selectedUser, selectUser } = useChat();
  const handleSelect = onSelect || selectUser;

  if (!users.length) {
    return (
      <div className="px-5 py-10 text-center">
        <User size={32} className="mx-auto text-dark-600 mb-3" />
        <p className="text-dark-500 text-sm">No users found yet</p>
      </div>
    );
  }

  return (
    <div className="px-2 pb-2">
      {users.map((u, i) => {
        const active = selectedUser?._id === u._id;
        const initials = u.username?.slice(0, 2).toUpperCase();
        const gradient = hashColour(u.username);

        return (
          <motion.button
            key={u._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => handleSelect(u)}
            className={`w-full flex items-center gap-3 px-3 py-3.5 mb-3 rounded-xl transition-all duration-200 cursor-pointer group ${
              active
                ? "bg-primary-600/15 border border-primary-500/20"
                : "hover:bg-dark-800/70 border border-transparent"
            }`}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shadow-md`}
              >
                {initials}
              </div>
              {/* Online dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-dark-900 online-dot" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-left">
              <p
                className={`text-sm font-semibold truncate ${
                  active
                    ? "text-primary-300"
                    : "text-dark-200 group-hover:text-dark-50"
                }`}
              >
                {u.username}
              </p>
              <p className="text-xs text-dark-500 truncate">{u.email}</p>
            </div>

            {/* Subtle arrow on hover */}
            <div
              className={`text-dark-600 group-hover:text-dark-400 transition-all ${
                active ? "text-primary-400" : ""
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
