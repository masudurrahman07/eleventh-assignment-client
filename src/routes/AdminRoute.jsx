
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading, role } = useAuth(); 
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user || role !== 'admin') {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
