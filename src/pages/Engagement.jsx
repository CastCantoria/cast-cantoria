import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProverbeSelector from '../components/ProverbeSelector';
import { Link } from 'react-router-dom';
import '../styles/poesie.css';

const Engagement = () => {
  const proverbe = ProverbeSelector();

  return (
    <div className="engagement-container">
      <Header />

      {/* 🎤 Citation d’accueil */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « S’engager à chanter, c’est offrir sa voix à une lumière plus grande. »
        </p>
        <p className="proverbe-rituel mt-2">
          {`“${proverbe}”`}
        </p>
      </section>

      {/* 🤝 Contenu principal */}
      <main className="container py-5">
        <h2 className="text-center mb-4 titre-rituel">Nos Engagements</h2>

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
          <Link to="/contact" className="btn btn-primary">Demander à rejoindre le chœur</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Engagement;