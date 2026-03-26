import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import { oktaAuth } from "./config/oktaConfig";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar/Navbar";

// Wrapper to provide restoreOriginalUri using useNavigate
const OktaSecurityWrapper = ({ children }) => {
  const navigate = useNavigate();

  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};

function App() {
  return (
    <>

  
    <BrowserRouter>
      <OktaSecurityWrapper>
            <Navbar />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          {/* <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          /> */}
        </Routes>
      </OktaSecurityWrapper>
    </BrowserRouter>
      </>
  );
}

export default App;