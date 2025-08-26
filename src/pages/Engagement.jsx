// src/pages/Engagement.jsx
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Engagement = () => {
  return (
    <Layout>
      {/* Citation d’accueil */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « S’engager à chanter, c’est offrir sa voix à une lumière plus grande. »
        </p>
      </section>

      {/* Contenu principal */}
      <main className="container py-5">
        <h2 className="text-center mb-4">Nos Engagements</h2>

        <p className="text-center mb-4">
          Être membre du Chœur Artistique & Spirituel de Tanà, c’est plus qu’une pratique musicale — c’est un acte de foi, de discipline et d’unité.
        </p>

        <ul className="list-group list-group-flush mb-5 shadow-sm rounded">
          <li className="list-group-item">🎵 Respect de l’esprit musical et spirituel du CAST</li>
          <li className="list-group-item">⌛ Présence régulière aux répétitions, concerts et retraites vocales</li>
          <li className="list-group-item">🫶 Fraternité et soutien entre choristes</li>
          <li className="list-group-item">🌿 Disponibilité pour partager la mission lors d’événements extérieurs</li>
          <li className="list-group-item">💫 Respect des engagements musicaux et des temps de prière chantée</li>
        </ul>

        <div className="text-center">
          <p className="mb-3">Vous souhaitez rejoindre notre mission vocale ?</p>
          <Link to="/Contact" className="btn btn-primary">Demander à rejoindre le chœur</Link>
        </div>
      </main>
    </Layout>
  );
};

export default Engagement;