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

      {/* ─── Right Panel · Premium Fluid Red Visual ── */}
      <div
        className="hidden lg:flex lg:w-[50%] relative overflow-hidden"
        style={{ background: "#050000" }}
      >
        {/* ── Layer 1: Base deep gradient ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #000000 0%, #0a0000 20%, #150000 40%, #0a0000 70%, #000000 100%)",
          }}
        />

        {/* ── Layer 2: Fluid marble blobs ── */}
        {/* Large flowing shape — top right */}
        <div
          className="absolute fluid-blob"
          style={{
            width: "130%",
            height: "120%",
            top: "-30%",
            right: "-40%",
            background:
              "linear-gradient(135deg, #7f1d1d 0%, #dc2626 30%, #ef4444 50%, #b91c1c 70%, #450a0a 100%)",
            borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%",
            filter: "blur(1px)",
            opacity: 0.85,
            animationDuration: "18s",
          }}
        />

        {/* Medium flowing shape — left center */}
        <div
          className="absolute fluid-blob"
          style={{
            width: "80%",
            height: "90%",
            top: "20%",
            left: "-25%",
            background:
              "linear-gradient(200deg, #450a0a 0%, #991b1b 35%, #dc2626 55%, #7f1d1d 80%, #1a0000 100%)",
            borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%",
            filter: "blur(2px)",
            opacity: 0.7,
            animationDuration: "22s",
            animationDelay: "-6s",
          }}
        />

        {/* Small flowing shape — bottom right accent */}
        <div
          className="absolute fluid-blob"
          style={{
            width: "60%",
            height: "65%",
            bottom: "-15%",
            right: "-10%",
            background:
              "linear-gradient(300deg, #1a0000 0%, #b91c1c 40%, #ef4444 60%, #991b1b 85%, #2d0000 100%)",
            borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
            filter: "blur(1px)",
            opacity: 0.6,
            animationDuration: "20s",
            animationDelay: "-10s",
          }}
        />

        {/* Thin flowing highlight streak */}
        <div
          className="absolute fluid-blob"
          style={{
            width: "45%",
            height: "110%",
            top: "-10%",
            left: "30%",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(239,68,68,0.5) 30%, rgba(248,113,113,0.6) 50%, rgba(239,68,68,0.4) 70%, transparent 100%)",
            borderRadius: "45% 55% 50% 50% / 50% 50% 50% 50%",
            filter: "blur(30px)",
            opacity: 0.5,
            animationDuration: "15s",
            animationDelay: "-3s",
          }}
        />

        {/* ── Layer 3: Depth overlay with radial vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* ── Layer 4: Subtle noise-like dot texture ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
            mixBlendMode: "overlay",
          }}
        />

        {/* ── Layer 5: Glossy light reflections ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "140%",
            height: "50%",
            top: "-10%",
            left: "-20%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
            borderRadius: "0 0 50% 50%",
            transform: "rotate(-5deg)",
          }}
        />

        {/* ── Center content card (glass) ── */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-12">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-3xl p-10 border max-w-[380px] w-full"
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                boxShadow: "0 0 30px rgba(239, 68, 68, 0.1)",
              }}
            >
              <MessageCircle size={32} className="text-red-400" />
            </div>
            <h2 className="text-[26px] font-extrabold text-white text-center mb-3 leading-tight">
              Connect Instantly
            </h2>
            <p className="text-white/50 text-[14px] text-center leading-relaxed max-w-[280px] mx-auto">
              Real-time messaging with beautiful design. Chat, share, and stay
              connected with everyone.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-7">
              {["Real-time", "Encrypted", "Fast"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/60 rounded-full px-3.5 py-1.5"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
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
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad} border-2 border-black flex items-center justify-center text-[10px] font-bold text-white`}
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
        <div className="absolute bottom-6 left-0 right-0 text-center z-10">
          <p className="text-white/15 text-[11px]">
            © 2026 Echo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
