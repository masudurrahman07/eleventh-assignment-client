// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading spinner while checking auth status
    return <Loading />;
  }

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in, render the protected component
  return children;
};

export default PrivateRoute;
