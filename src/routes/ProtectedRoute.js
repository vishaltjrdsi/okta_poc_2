import { useOktaAuth } from "@okta/okta-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const { authState, isLoading } = useOktaAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authState?.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
}