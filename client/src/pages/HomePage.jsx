import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  return <Navigate to={user ? "/chat" : "/login"} replace />;
}
