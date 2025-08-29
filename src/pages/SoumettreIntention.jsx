import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const SoumettreIntention = () => {
  const [name, setName] = useState('');
  const [intention, setIntention] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'intentions'), {
        name,
        intention,
        date: Timestamp.now(),
        status: 'soumise',
        language: 'fr',
        tags: ['prière']
      });

      setMessage('🙏 Intention enregistrée avec succès.');
      setName('');
      setIntention('');
    } catch (error) {
      console.error('Erreur Firestore:', error);
      setMessage('⚠️ Une erreur est survenue.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📝 Soumettre une intention</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label className="form-label">Votre nom</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Votre intention</label>
          <textarea
            className="form-control"
            rows="4"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Envoyer</button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default SoumettreIntention;