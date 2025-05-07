import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/context/Auth";

const RedirectIfAuthenticated = ({ children }) => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
