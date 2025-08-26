import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const RequireAuth = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Chargement de l’authentification...</p>;
  if (!user || user.role !== role) return <Navigate to="/login" replace />;

  return children;
};

export default RequireAuth;