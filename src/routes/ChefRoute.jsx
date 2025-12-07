// src/routes/ChefRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import Loading from '../components/Loading';

const ChefRoute = ({ children }) => {
  const { user, loading, role } = useAuth(); // useAuth should provide role info
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user || role !== 'chef') {
    // Not logged in or not a chef → redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is a chef → render protected page
  return children;
};

export default ChefRoute;
