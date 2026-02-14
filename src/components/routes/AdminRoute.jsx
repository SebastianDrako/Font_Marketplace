import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Route wrapper that restricts access to users with the 'ADMIN' role.
 * Redirects to login if not authenticated, or to home if authorized but not an admin.
 *
 * @component
 * @returns {JSX.Element} The route content or a redirect.
 */
const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user.roles?.includes('ADMIN')) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
