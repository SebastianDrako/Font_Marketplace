import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Route wrapper that restricts access to authenticated users.
 * Redirects to the login page if the user is not authenticated.
 *
 * @component
 * @returns {JSX.Element} The route content or a redirect.
 */
const UserRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserRoute;
