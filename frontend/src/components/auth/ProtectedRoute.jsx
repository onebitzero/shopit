import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../layout/Loader';

export default function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
