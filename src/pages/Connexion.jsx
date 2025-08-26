// src/pages/Connexion.jsx
import React, { useEffect } from 'react';
import Layout from '../components/Layout';

const Connexion = () => {
  useEffect(() => {
    // Tu peux ajouter ici une logique Firebase Auth si nécessaire
    console.log('Connexion page mounted');
  }, []);

  const handleGoogleLogin = () => {
    // 🔐 Intégration Firebase Auth Google ici
    console.log('Google login triggered');
  };

  const handleFacebookLogin = () => {
    // 🔐 Intégration Firebase Auth Facebook ici
    console.log('Facebook login triggered');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 Traitement du formulaire ici
    console.log('Form submitted');
  };

  return (
    <Layout>
      <main className="container my-5">
        <h2 className="text-center mb-4">Connexion membre</h2>

        <form id="login-form" onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse e-mail</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" required />
          </div>
          <button type="submit" className="btn btn-success w-100">Se connecter</button>
          <hr />
          <button type="button" onClick={handleGoogleLogin} className="btn btn-outline-danger w-100">
            <span className="bi bi-google"></span> Connexion avec Google
          </button>
          <button type="button" onClick={handleFacebookLogin} className="btn btn-outline-primary w-100 mt-2">
            <span className="bi bi-facebook"></span> Connexion avec Facebook
          </button>
        </form>
      </main>
    </Layout>
  );
};

export default Connexion;