import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProverbeSelector from '../components/ProverbeSelector';
import useUser from '../hooks/useUser';
import { Navigate } from 'react-router-dom';
import ProfilePage from '../components/ProfilePage';
import '../styles/poesie.css';

const Profil = () => {
  const { user, loading, logout } = useUser();
  const proverbe = ProverbeSelector();

  if (loading) {
    return (
      <div className="auth-container">
        <Header />
        <div className="container py-5 text-center">
          <p>Chargement des informations...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) return <Navigate to="/connexion" />;

  return (
    <div className="auth-container">
      <Header />

      <div className="container py-4 text-center">
        <h2 className="mb-3 titre-rituel">
          Bienvenue, {user.displayName || 'Membre'} 👋
        </h2>

        <p className="proverbe-rituel mb-4">
          {`“${proverbe}”`}
        </p>

        <ProfilePage />

        <button className="btn btn-outline-danger mt-5" onClick={logout}>
          Se déconnecter
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Profil;