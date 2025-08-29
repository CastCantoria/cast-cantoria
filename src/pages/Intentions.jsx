import React, { useEffect, useState } from 'react';

const Intentions = () => {
  const [intentions, setIntentions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/intentions')
      .then(res => res.json())
      .then(data => setIntentions(data))
      .catch(err => console.error('Erreur chargement intentions', err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🌟 Intentions partagées</h2>
      <ul className="list-group">
        {intentions.map((entry, index) => (
          <li key={index} className="list-group-item">
            <strong>{entry.name}</strong> : {entry.intention}
            <br />
            <small>{new Date(entry.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Intentions;