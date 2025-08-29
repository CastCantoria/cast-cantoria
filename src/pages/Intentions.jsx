import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Intentions = () => {
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

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🌟 Intentions partagées</h2>
      <ul className="list-group">
        {intentions.map((entry) => (
          <li key={entry.id} className="list-group-item">
            <strong>{entry.name}</strong> : {entry.intention}
            <br />
            <small>{entry.date?.toDate().toLocaleString()}</small>
            {entry.status && <span className="badge bg-secondary ms-2">{entry.status}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Intentions;