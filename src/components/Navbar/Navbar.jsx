import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const location = useLocation();

  const logout = async () => await oktaAuth.signOut();

  // 👇 Get page name from route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/dashboard":
        return "Dashboard";
      default:
        return "App";
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>{getPageTitle()}</h2> {/* ✅ Dynamic title */}
      </div>

      <div className="navbar-right">
        {authState?.isAuthenticated && (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;