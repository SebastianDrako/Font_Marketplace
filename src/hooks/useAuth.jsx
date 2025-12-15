import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser, fetchUser, logout } from "../redux/authSlice";
import { useEffect } from "react";

/**
 * Custom hook to manage authentication state and actions.
 *
 * @returns {Object} An object containing authentication state and functions.
 * @property {boolean} isAuthenticated - Whether the user is authenticated.
 * @property {Object|null} user - The current user object.
 * @property {boolean} loading - Whether an authentication action is in progress.
 * @property {string|null} error - Error message, if any.
 * @property {Function} login - Function to log in a user.
 * @property {Function} logout - Function to log out a user.
 * @property {Function} register - Function to register a new user.
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [token, user, dispatch]);

  const login = (email, password) => {
    return dispatch(loginUser({ email, password }));
  };

  const register = (firstName, lastName, mail, passkey) => {
    return dispatch(registerUser({ firstName, lastName, mail, passkey }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout: logoutUser,
    register,
  };
};
