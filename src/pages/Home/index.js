import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import './Home.css';

export default function Home() {
  const { oktaAuth, authState } = useOktaAuth();

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <div className="home-container">
      <h1>Login to continue...</h1>

      {authState?.isAuthenticated ? (
        <>
          <p>
            Welcome back, <span className="username">{authState.idToken?.claims?.name}</span>!
          </p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}