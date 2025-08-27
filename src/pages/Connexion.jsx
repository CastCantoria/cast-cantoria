import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProverbeSelector from '../components/ProverbeSelector';
import SocialLogin from '../components/SocialLogin';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import '../styles/poesie.css';

const Connexion = () => {
  const [rituelMessage, setRituelMessage] = useState('');
  const [email, setEmail] = useState('');
  const proverbe = ProverbeSelector();

  useEffect(() => {
    console.log('Connexion page mounted');
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Veuillez entrer votre adresse e-mail.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setRituelMessage("📩 Lien de réinitialisation envoyé. Vérifiez votre boîte mail.");
    } catch (error) {
      console.error(error);
      setRituelMessage("❌ Échec de l'envoi du lien. Vérifiez l'adresse.");
    }
  };

  return (
    <div className="auth-container">
      <Header />

      <main className="container my-5">
        <h2 className="text-center mb-4 titre-rituel">Connexion membre</h2>

        <p className="intro-rituelle text-center mb-4">
          <em>{`“${proverbe}”`}</em>
        </p>

        <form id="login-form" onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
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
            <input type="password" className="form-control" id="password" required />
          </div>

          <p className="text-end mt-2">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleResetPassword}
            >
              Mot de passe oublié ?
            </button>
          </p>

          <button type="submit" className="btn btn-success w-100">Se connecter</button>
        </form>

        <hr />

        <SocialLogin onGoogle={handleGoogleLogin} onFacebook={handleFacebookLogin} />

        {rituelMessage && (
          <p className="proverbe-rituel mt-4 text-center">
            {`“${rituelMessage}”`}
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Connexion;