import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  MessageCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { loginUser, registerUser } from "../services/authService";

export default function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = isLogin
        ? await loginUser(form.email, form.password)
        : await registerUser(form.username, form.email, form.password);
      login(data);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex bg-[#000000]">
      {/* ─── Left Panel · Form ────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full lg:w-[50%] flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12"
      >
        {/* subtle radial glow behind card */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(239, 68, 68, 0.04)" }}
        />

        <div className="relative w-full max-w-[420px]">
          {/* ── Logo ───────────────────────────────── */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/25">
              <img
                src="/echo-logo.png"
                alt="Echo"
                className="w-11 h-11 rounded-xl"
              />
            </div>
            <span className="text-[22px] font-extrabold text-white tracking-tight">
              Echo
            </span>
          </div>

          {/* ── Heading ────────────────────────────── */}
          <h1 className="text-[28px] font-extrabold text-white leading-tight mb-1">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-[15px] text-neutral-400 mb-8">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Join thousands of people chatting in real-time"}
          </p>

          {/* ── Tab Toggle ─────────────────────────── */}
          <div className="flex bg-neutral-800/60 rounded-xl p-1.5 mb-10 border border-neutral-700/50">
            <Link
              to="/login"
              className={`flex-1 text-center py-2.5 text-[13px] font-semibold rounded-lg transition-all duration-300 ${
                isLogin
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-neutral-400 hover:text-neutral-300"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`flex-1 text-center py-2.5 text-[13px] font-semibold rounded-lg transition-all duration-300 ${
                !isLogin
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-neutral-400 hover:text-neutral-300"
              }`}
            >
              Sign Up
            </Link>
          </div>

          {/* ── Error ──────────────────────────────── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-xl px-4 py-3 mb-6"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 5v3.5M8 10.5v.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Form ───────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  key="username-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    className="block text-[13px] font-medium text-neutral-300"
                    style={{ marginBottom: "10px" }}
                  >
                    Username
                  </label>
                  <div
                    className="flex items-center gap-3 bg-neutral-800/50 border border-neutral-700/60 rounded-xl focus-within:border-red-500/60 focus-within:bg-neutral-800/80 transition-all duration-200 hover:border-neutral-600"
                    style={{ padding: "16px 20px" }}
                  >
                    <User size={17} className="text-neutral-500 shrink-0" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Choose a username"
                      value={form.username}
                      onChange={handleChange}
                      autoComplete="username"
                      className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-neutral-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label
                className="block text-[13px] font-medium text-neutral-300"
                style={{ marginBottom: "10px" }}
              >
                Email
              </label>
              <div
                className="flex items-center gap-3 bg-neutral-800/50 border border-neutral-700/60 rounded-xl focus-within:border-red-500/60 focus-within:bg-neutral-800/80 transition-all duration-200 hover:border-neutral-600"
                style={{ padding: "16px 20px" }}
              >
                <Mail size={17} className="text-neutral-500 shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-neutral-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[13px] font-medium text-neutral-300"
                style={{ marginBottom: "10px" }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 bg-neutral-800/50 border border-neutral-700/60 rounded-xl focus-within:border-red-500/60 focus-within:bg-neutral-800/80 transition-all duration-200 hover:border-neutral-600"
                style={{ padding: "16px 20px" }}
              >
                <Lock size={17} className="text-neutral-500 shrink-0" />
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder={
                    isLogin ? "Enter your password" : "Min 6 characters"
                  }
                  value={form.password}
                  onChange={handleChange}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-neutral-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer p-0.5"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              disabled={loading}
              style={{ marginTop: "20px", padding: "16px" }}
              className="btn-shimmer w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold text-[14px] rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-500/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* ── Divider ────────────────────────────── */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-[11px] text-neutral-500 uppercase tracking-[0.15em] font-medium">
              or continue with
            </span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          <p className="text-center text-[13px] text-neutral-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={isLogin ? "/register" : "/login"}
              className="text-red-400 font-semibold hover:text-red-300 transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </div>
      </motion.div>

      {/* ─── Right Panel · Premium Layered Red Visual ── */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden">
        {/* Base: deep animated gradient */}
        <div className="absolute inset-0 auth-gradient-bg" />

        {/* Layered radial glows for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(239,68,68,0.2), transparent 70%), " +
              "radial-gradient(ellipse 60% 80% at 30% 70%, rgba(185,28,28,0.15), transparent 60%), " +
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(220,38,38,0.08), transparent 50%)",
          }}
        />

        {/* Floating blurred orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-orb" />
          <div className="floating-orb" />
          <div className="floating-orb" />
        </div>

        {/* Ripple rings — layered concentric circles with red glow */}
        {[650, 480, 310, 180].map((size, i) => (
          <div
            key={size}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="auth-ripple-ring"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${i * 0.8}s`,
                borderColor: `rgba(239, 68, 68, ${0.06 + i * 0.03})`,
                boxShadow: `0 0 ${20 + i * 10}px rgba(239, 68, 68, ${0.02 + i * 0.01})`,
              }}
            />
          </div>
        ))}

        {/* Subtle vertical light streaks */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(239,68,68,0.03) 0%, transparent 30%, transparent 70%, rgba(185,28,28,0.02) 100%)",
          }}
        />

        {/* Center card */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-12">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="backdrop-blur-2xl rounded-3xl p-10 border max-w-[380px] w-full shadow-2xl"
            style={{
              background: "rgba(239, 68, 68, 0.06)",
              borderColor: "rgba(239, 68, 68, 0.12)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.4), 0 0 40px rgba(239,68,68,0.05)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.15)",
              }}
            >
              <MessageCircle size={32} className="text-red-400" />
            </div>
            <h2 className="text-[26px] font-extrabold text-white text-center mb-3 leading-tight">
              Connect Instantly
            </h2>
            <p className="text-white/60 text-[14px] text-center leading-relaxed max-w-[280px] mx-auto">
              Real-time messaging with beautiful design. Chat, share, and stay
              connected with everyone.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-7">
              {["Real-time", "Encrypted", "Fast"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/70 rounded-full px-3.5 py-1.5"
                  style={{
                    background: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid rgba(239, 68, 68, 0.12)",
                  }}
                >
                  <Sparkles size={10} className="text-red-400" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* User count social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[
                "from-red-400 to-red-600",
                "from-rose-400 to-pink-600",
                "from-orange-400 to-red-600",
                "from-amber-400 to-orange-600",
              ].map((grad, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad} border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {["AK", "RS", "PK", "MJ"][i]}
                </div>
              ))}
            </div>
            <p className="text-white/40 text-[12px]">
              Join <span className="text-white/70 font-semibold">2,000+</span>{" "}
              users
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-white/20 text-[11px]">
            © 2026 Echo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
