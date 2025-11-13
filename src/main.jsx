import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./Routers/Router.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
