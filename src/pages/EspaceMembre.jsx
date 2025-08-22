import React, { useState } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import SocialLogin from '../components/SocialLogin';

const EspaceMembre = () => {
  const [authMode, setAuthMode] = useState(null);

  const handleFileClick = () => {
    const input = document.getElementById('fileInput');
    if (input) input.click();
  };

  return (
    <Layout>
      {/* 📝 Citation d’accueil */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « Derrière chaque voix, il y a une intention. Derrière chaque fichier, une offrande sonore. »
        </p>
      </section>

      {/* 👤 Espace membre */}
      <section className="section membre-access">
        <div className="container">
          <h2 className="section-title">🎶 Espace Membre</h2>
          <p className="section-intro">
            <strong>Bienvenue !</strong> Connectez-vous ou inscrivez-vous pour rejoindre le Chœur Artistique & Spirituel de Tanà.
          </p>

          <div className="button-group mb-3">
            <button className="btn btn-primary" onClick={() => setAuthMode('login')}>Se connecter</button>
            <button className="btn btn-secondary" onClick={() => setAuthMode('signup')}>S’inscrire</button>
          </div>

          {authMode === 'login' && <LoginForm />}
          {authMode === 'signup' && <SignupForm />}

          <div className="divider"><span>ou</span></div>
          <SocialLogin />

          <p className="section-note">
            🎤 Vous pourrez bientôt partager vos créations vocales et recevoir des inspirations du chœur.
          </p>
        </div>
      </section>

      {/* 📤 Zone d’upload */}
      <section className="container mb-5">
        <div className="upload-zone" id="upload-zone">
          <p className="mb-2">🎶 Déposez vos fichiers ici ou cliquez pour choisir</p>
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*,audio/*,video/*"
            hidden
          />
          <button className="btn btn-primary" onClick={handleFileClick}>
            Choisir un fichier
          </button>
          <div id="upload-feedback" className="mt-3"></div>
        </div>
        <div id="media-gallery" className="row g-4 mt-4"></div>
      </section>
    </Layout>
  );
};

export default EspaceMembre;