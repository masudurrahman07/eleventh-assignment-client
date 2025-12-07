// src/routes/AdminRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading, role } = useAuth(); // assume useAuth provides role
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user || role !== 'admin') {
    // Not logged in or not admin → redirect to login or home
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is admin → render protected page
  return children;
};

export default AdminRoute;
