import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../loader/Loader';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div><Loader></Loader> </div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;