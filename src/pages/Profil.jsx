import React from 'react';
import Layout from '../components/Layout';
import useUser from '../hooks/useUser';
import { Navigate } from 'react-router-dom';

const Profil = () => {
  const { user, loading, logout } = useUser();

  if (loading) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <p>Chargement des informations...</p>
        </div>
      </Layout>
    );
  }

  if (!user) return <Navigate to="/Connexion" />;

  return (
    <Layout>
      <div className="container py-5 text-center">
        <h2 className="mb-4">Bienvenue, {user.displayName || 'Membre'} 👋</h2>

        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Photo de profil"
            className="rounded-circle shadow-sm mb-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        )}

        <p><strong>Email :</strong> {user.email}</p>

        <button className="btn btn-outline-danger mt-4" onClick={logout}>
          Se déconnecter
        </button>
      </div>
    </Layout>
  );
};

export default Profil;