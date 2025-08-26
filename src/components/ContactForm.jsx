// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Assure-toi que firebase.js est bien configuré

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Le nom est requis.';
    if (!form.email.trim()) {
      newErrors.email = 'L’email est requis.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Format d’email invalide.';
    }
    if (!form.message.trim()) newErrors.message = 'Le message est requis.';
    return newErrors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Anti-spam : si le champ caché est rempli, on ignore
    if (form.honeypot) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setFirebaseError('');

    try {
      await addDoc(collection(db, 'messages'), {
        name: form.name,
        email: form.email,
        message: form.message,
        timestamp: new Date()
      });
      setSubmitted(true);
      setForm({ name: '', email: '', message: '', honeypot: '' });
    } catch (error) {
      console.error('Erreur Firebase :', error);
      setFirebaseError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Champ caché anti-spam */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
      />

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nom</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          className={`form-control ${errors.message ? 'is-invalid' : ''}`}
          id="message"
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Envoyer'}
      </button>

      {submitted && (
        <div className="alert alert-success mt-3">
          Merci pour votre message ! Nous vous répondrons bientôt.
        </div>
      )}

      {firebaseError && (
        <div className="alert alert-danger mt-3">
          {firebaseError}
        </div>
      )}
    </form>
  );
};

export default ContactForm;