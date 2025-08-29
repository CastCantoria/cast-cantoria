import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore';

const AdminIntentions = () => {
  const [intentions, setIntentions] = useState([]);

  useEffect(() => {
    const fetchIntentions = async () => {
      try {
        const q = query(collection(db, 'intentions'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setIntentions(data);
      } catch (error) {
        console.error('Erreur chargement intentions', error);
      }
    };

    fetchIntentions();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const docRef = doc(db, 'intentions', id);
      await updateDoc(docRef, { status: newStatus });
      setIntentions(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error('Erreur mise à jour du statut', error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🛐 Modération des intentions</h2>
      <ul className="list-group">
        {intentions.map((entry) => (
          <li key={entry.id} className="list-group-item">
            <strong>{entry.name}</strong> : {entry.intention}
            <br />
            <small>{entry.date?.toDate().toLocaleString()}</small>
            <div className="mt-2">
              <span className="badge bg-info me-2">{entry.status}</span>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => updateStatus(entry.id, 'bénie')}
              >
                Bénir
              </button>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => updateStatus(entry.id, 'modérée')}
              >
                Modérer
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => updateStatus(entry.id, 'soumise')}
              >
                Réinitialiser
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminIntentions;