import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProverbeSelector from '../components/ProverbeSelector';
import SocialLogin from '../components/SocialLogin';
import '../styles/poesie.css';

const AuthForm = () => {
  const [mode, setMode] = useState('login');
  const [rituelMessage, setRituelMessage] = useState('');
  const proverbe = ProverbeSelector();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${mode} form submitted`);
  };

  const handleGoogleLogin = () => {
    const audio = new Audio('/assets/audio/cast-chant2.mp3');
    audio.play();
    setRituelMessage("Ny fidirana amin’ny fiaraha-miasa dia manomboka amin’ny fahatokisana.");
  };

  const handleFacebookLogin = () => {
    const audio = new Audio('/assets/audio/voix-sacre.mp3');
    audio.play();
    setRituelMessage("Ny fifandraisana tsara dia manomboka amin’ny teny mamy.");
  };

  return (
    <div className="auth-container">
      <Header />

      <div className="container py-5">
        <h2 className="text-center mb-4 titre-rituel">
          {mode === 'login' ? 'Connexion' : 'Inscription'}
        </h2>

        <p className="intro-rituelle text-center mb-4">
          <em>{`“${proverbe}”`}</em>
        </p>

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
        </form>

        <hr />

        <SocialLogin onGoogle={handleGoogleLogin} onFacebook={handleFacebookLogin} />

        {rituelMessage && (
          <p className="proverbe-rituel mt-4 text-center">
            {`“${rituelMessage}”`}
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AuthForm;