import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Connexion page mounted');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profil'); // ✅ redirection après succès
    } catch (err) {
      console.error('❌ Erreur de connexion :', err.message);
      setError("Adresse e-mail ou mot de passe incorrect.");
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login triggered');
    // Tu peux intégrer signInWithPopup ici
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login triggered');
    // Tu peux intégrer signInWithPopup ici aussi
  };

  return (
    <Layout>
      <main className="container my-5">
        <h2 className="text-center mb-4">Connexion membre</h2>

        <form id="login-form" onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse e-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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