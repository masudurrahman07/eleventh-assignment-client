
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import Loading from '../components/Loading';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {

    return <Navigate to="/" replace />;
  }

  
  return React.cloneElement(children, { key: user.role });
};

export default PrivateRoute;
