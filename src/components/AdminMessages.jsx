// src/components/AdminMessages.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'messages'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">📬 Messages reçus</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : messages.length === 0 ? (
        <p>Aucun message pour le moment.</p>
      ) : (
        <ul className="list-group">
          {messages.map(msg => (
            <li key={msg.id} className="list-group-item">
              <strong>{msg.name}</strong> ({msg.email})<br />
              <span>{msg.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMessages;