import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/context/Auth";

const RequireAuth = ({ children }) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
