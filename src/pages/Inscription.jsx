import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProverbeSelector from '../components/ProverbeSelector';
import SocialLogin from '../components/SocialLogin';
import '../styles/poesie.css';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Inscription = () => {
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    religion: '',
    address: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [rituelMessage, setRituelMessage] = useState('');
  const proverbe = ProverbeSelector();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      setRituelMessage("⚠️ Les adresses e-mail ne correspondent pas.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setRituelMessage("⚠️ Les mots de passe ne correspondent pas.");
      return;
    }

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const audio = new Audio('/assets/audio/cast-chant2.mp3');
      audio.play();
      setRituelMessage("🎉 Compte créé avec succès. Ny fanombohana tsara dia mitondra fahombiazana.");
      // Optionnel : enregistrer les autres infos dans Firestore ici
    } catch (error) {
      console.error('Erreur inscription:', error);
      setRituelMessage("⚠️ " + error.message);
    }
  };

  const handleGoogleSignup = () => {
    const audio = new Audio('/assets/audio/cast-chant2.mp3');
    audio.play();
    setRituelMessage("Ny fanombohana tsara dia mitondra fahombiazana.");
  };

  return (
    <div className="auth-container">
      <Header />

      <main className="container my-5">
        <h2 className="text-center mb-4 titre-rituel">Créer un compte membre</h2>

        <p className="intro-rituelle text-center mb-4">
          <em>{`“${proverbe}”`}</em>
        </p>

        <p className="text-center mb-4 text-muted">
          Vous pouvez vous inscrire directement avec votre compte Google ou remplir le formulaire ci-dessous.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Nom</label>
            <input type="text" className="form-control" id="lastname" value={formData.lastname} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">Prénom</label>
            <input type="text" className="form-control" id="firstname" value={formData.firstname} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="religion" className="form-label">Affiliation religieuse</label>
            <input type="text" className="form-control" id="religion" value={formData.religion} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Adresse complète</label>
            <textarea className="form-control" id="address" rows="2" value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse e-mail</label>
            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmEmail" className="form-label">Confirmer l’adresse e-mail</label>
            <input type="email" className="form-control" id="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
            <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Créer mon compte</button>
        </form>

        <hr />

        <SocialLogin onGoogle={handleGoogleSignup} onFacebook={() => {}} />

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

export default Inscription;