import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import './Dashboard.css';

const Dashboard = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const logout = async () => await oktaAuth.signOut();

  if (!authState?.isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard (Protected)</h1>
        <p>
  Hello, <span className="username">{authState.idToken?.claims?.name}</span>
</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;