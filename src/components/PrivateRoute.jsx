import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <p className="text-center py-5">Chargement...</p>;
  if (!user) return <Navigate to="/connexion" />;

  return children;
};

export default PrivateRoute;