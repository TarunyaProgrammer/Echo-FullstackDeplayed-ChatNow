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
    <div className="min-h-dvh flex bg-[#030712]">
      {/* ─── Left Panel · Form ────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full lg:w-[50%] flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12"
      >
        {/* subtle radial glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-[420px]">
          {/* ── Logo ───────────────────────────────── */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/25">
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
          <p className="text-[15px] text-slate-400 mb-8">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Join thousands of people chatting in real-time"}
          </p>

          {/* ── Tab Toggle ─────────────────────────── */}
          <div className="flex bg-slate-800/60 rounded-xl p-1.5 mb-10 border border-slate-700/50">
            <Link
              to="/login"
              className={`flex-1 text-center py-2.5 text-[13px] font-semibold rounded-lg transition-all duration-300 ${
                isLogin
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`flex-1 text-center py-2.5 text-[13px] font-semibold rounded-lg transition-all duration-300 ${
                !isLogin
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-slate-300"
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
                    className="block text-[13px] font-medium text-slate-300"
                    style={{ marginBottom: "10px" }}
                  >
                    Username
                  </label>
                  <div
                    className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/60 rounded-xl focus-within:border-blue-500/60 focus-within:bg-slate-800/80 transition-all duration-200 hover:border-slate-600"
                    style={{ padding: "16px 20px" }}
                  >
                    <User size={17} className="text-slate-500 shrink-0" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Choose a username"
                      value={form.username}
                      onChange={handleChange}
                      autoComplete="username"
                      className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-slate-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label
                className="block text-[13px] font-medium text-slate-300"
                style={{ marginBottom: "10px" }}
              >
                Email
              </label>
              <div
                className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/60 rounded-xl focus-within:border-blue-500/60 focus-within:bg-slate-800/80 transition-all duration-200 hover:border-slate-600"
                style={{ padding: "16px 20px" }}
              >
                <Mail size={17} className="text-slate-500 shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[13px] font-medium text-slate-300"
                style={{ marginBottom: "10px" }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/60 rounded-xl focus-within:border-blue-500/60 focus-within:bg-slate-800/80 transition-all duration-200 hover:border-slate-600"
                style={{ padding: "16px 20px" }}
              >
                <Lock size={17} className="text-slate-500 shrink-0" />
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder={
                    isLogin ? "Enter your password" : "Min 6 characters"
                  }
                  value={form.password}
                  onChange={handleChange}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer p-0.5"
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
              className="btn-shimmer w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-[14px] rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
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
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[11px] text-slate-500 uppercase tracking-[0.15em] font-medium">
              or continue with
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <p className="text-center text-[13px] text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={isLogin ? "/register" : "/login"}
              className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </div>
      </motion.div>

      {/* ─── Right Panel · Visual ─────────────────── */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 auth-gradient-bg" />

        {/* Floating blurred orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-orb" />
          <div className="floating-orb" />
          <div className="floating-orb" />
        </div>

        {/* Decorative concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[650px] h-[650px] rounded-full border border-white/[0.04]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[480px] h-[480px] rounded-full border border-white/[0.06]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[310px] h-[310px] rounded-full border border-white/[0.08]" />
        </div>

        {/* Center card */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-12">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/[0.07] backdrop-blur-2xl rounded-3xl p-10 border border-white/[0.1] max-w-[380px] w-full shadow-2xl shadow-black/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 mx-auto">
              <MessageCircle size={32} className="text-white" />
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
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/70 bg-white/[0.08] border border-white/[0.08] rounded-full px-3.5 py-1.5"
                >
                  <Sparkles size={10} className="text-blue-300" />
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
                "from-blue-400 to-blue-600",
                "from-violet-400 to-purple-600",
                "from-emerald-400 to-teal-600",
                "from-amber-400 to-orange-600",
              ].map((grad, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad} border-2 border-[#030712] flex items-center justify-center text-[10px] font-bold text-white`}
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
