// src/pages/Inscription.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 Validation & Firebase logic à intégrer ici
    console.log('Form submitted:', formData);
  };

  const handleGoogleSignup = () => {
    // 🔐 Intégration Firebase Auth Google ici
    console.log('Google signup triggered');
  };

  return (
    <Layout>
      <main className="container my-5">
        <h2 className="text-center mb-4">Créer un compte membre</h2>

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
            <label htmlFor="confirm-email" className="form-label">Confirmer l’adresse e-mail</label>
            <input type="email" className="form-control" id="confirm-email" value={formData.confirmEmail} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">Confirmer le mot de passe</label>
            <input type="password" className="form-control" id="confirm-password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Créer mon compte</button>
          <hr />
          <button type="button" onClick={handleGoogleSignup} className="btn btn-outline-danger w-100">
            <span className="bi bi-google"></span> S’inscrire avec Google
          </button>
        </form>
      </main>
    </Layout>
  );
};

export default Inscription;