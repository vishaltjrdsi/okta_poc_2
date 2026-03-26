import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import { oktaAuth } from "./config/oktaConfig";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EditPage from "./pages/EditPage";
import Navbar from "./components/Navbar/Navbar";

// Wrapper to provide restoreOriginalUri using useNavigate
const OktaSecurityWrapper = ({ children }) => {
  const navigate = useNavigate();

  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    // redirect to original URI after login, fallback to /dashboard
    navigate(originalUri || "/dashboard", { replace: true });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};

function App() {
  return (
    <BrowserRouter>
      <OktaSecurityWrapper>
        <Navbar />
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />

          {/* Login callback */}
          <Route path="/login/callback" element={<LoginCallback />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/edit/:key"
            element={<ProtectedRoute element={<EditPage />} />}
          />
        </Routes>
      </OktaSecurityWrapper>
    </BrowserRouter>
  );
}

export default App;