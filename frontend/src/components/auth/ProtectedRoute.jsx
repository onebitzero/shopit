import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader';

export default function ProtectedRoute({ admin, children }) {
  const { isLoading, isAuthenticated, user } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
