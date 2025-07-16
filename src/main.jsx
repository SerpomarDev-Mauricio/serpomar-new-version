import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme/ThemeState.jsx";
import { AuthProvider } from "./contexts/auth/AuthContext.jsx";
import ButtonTheme from "./components/specific/ButtonTheme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />
          <ButtonTheme></ButtonTheme>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
