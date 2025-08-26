// src/pages/AuthForm.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';

const AuthForm = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 Traitement du formulaire ici
    console.log(`${mode} form submitted`);
  };

  return (
    <Layout>
      <div className="container py-5">
        <h2 className="text-center mb-4">
          {mode === 'login' ? 'Connexion' : 'Inscription'}
        </h2>

        <div className="text-center mb-4">
          <button
            className={`btn btn-${mode === 'login' ? 'primary' : 'outline-primary'} me-2`}
            onClick={() => setMode('login')}
          >
            Se connecter
          </button>
          <button
            className={`btn btn-${mode === 'signup' ? 'primary' : 'outline-primary'}`}
            onClick={() => setMode('signup')}
          >
            S’inscrire
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
          {mode === 'signup' && (
            <>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Nom</label>
                <input type="text" className="form-control" id="lastname" required />
              </div>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">Prénom</label>
                <input type="text" className="form-control" id="firstname" required />
              </div>
            </>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse e-mail</label>
            <input type="email" className="form-control" id="email" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" required />
          </div>

          <button type="submit" className="btn btn-success w-100">
            {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </button>

          <hr />

          <button type="button" className="btn btn-outline-danger w-100">
            <span className="bi bi-google"></span> Connexion avec Google
          </button>
          <button type="button" className="btn btn-outline-primary w-100 mt-2">
            <span className="bi bi-facebook"></span> Connexion avec Facebook
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AuthForm;