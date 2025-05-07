import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import router from "@/lib/routes/AppRoutes";
import "@styles/globals.css";
import { AuthProvider } from "./lib/context/Auth";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
