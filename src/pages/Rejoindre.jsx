import { useState } from 'react';

export default function Rejoindre() {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Envoi vers Firestore ou EmailJS
    alert('Demande envoyée avec succès 🙏');
  };

  return (
    <div className="rejoindre">
      <h2>Rejoindre le chœur ✨</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" placeholder="Nom" onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <textarea name="message" placeholder="Pourquoi souhaitez-vous rejoindre ?" onChange={handleChange} />
        <button type="submit" className="btn btn-success mt-2">Envoyer ma demande</button>
      </form>
    </div>
  );
}