// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Register
  const registerUser = async (name, email, password, profileImage, address) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/auth/register', {
        name, email, password, profileImage, address
      });
      const { user, token } = res.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      setUser(user);
      setToken(token);
      setLoading(false);

      return user;
    } catch (err) {
      setLoading(false);
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  // Login
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { user, token } = res.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      setUser(user);
      setToken(token);
      setLoading(false);

      return user;
    } catch (err) {
      setLoading(false);
      throw new Error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, registerUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
