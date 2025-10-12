
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await apiClient.get('/api/v1/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          // If the token is invalid, remove it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/api/v1/auth/authenticate', { email, password });
      const { access_token } = response.data;
      
      localStorage.setItem('token', access_token);
      setToken(access_token);
      // The useEffect will trigger to fetch the user data
      return true;

    } catch (error) {
      console.error("Login failed:", error);
      // Here you would handle login errors (e.g., show a message to the user)
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (firstName, lastName, mail, passkey) => {
    setLoading(true);
    try {
      await apiClient.post('/api/v1/auth/register', { firstName, lastName, mail, passkey });
      // After successful registration, you might want to log the user in automatically
      // or redirect them to the login page.
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration errors (e.g., show a message to the user)
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null); // Also clear user state on logout
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
