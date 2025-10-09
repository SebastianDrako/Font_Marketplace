
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // If there is a token, we assume the user is logged in.
      // In a real application, you would decode the token here to get user info
      // or make a request to an endpoint like /api/me to get the user data.
      // For now, we'll just set a mock user object.
      // TODO: Decode token or fetch user info from API
      setUser({ name: 'Usuario Logueado' });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      // This is a mock login. Replace with a real API call.
      // const response = await apiClient.post('/auth/login', { email, password });
      // const newToken = response.data.token;
      
      // For demonstration purposes, we'll use a fake token.
      const newToken = 'fake-jwt-token';
      localStorage.setItem('token', newToken);
      setToken(newToken);

    } catch (error) {
      console.error("Login failed:", error);
      // Here you would handle login errors (e.g., show a message to the user)
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
