import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProverbeSelector from '../components/ProverbeSelector';
import { Link } from 'react-router-dom';
import '../styles/poesie.css';

const Presentation = () => {
  const proverbe = ProverbeSelector();

  return (
    <div className="presentation-container">
      <Header />

      {/* 🎙️ Citation d’accueil */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « Le chant est une offrande. Chaque voix, un acte de foi. »
        </p>
        <p className="proverbe-rituel mt-2">
          {`“${proverbe}”`}
        </p>
      </section>

      {/* 🌟 Contenu principal */}
      <section className="container py-5">
        <h2 className="text-center mb-4 titre-rituel">Présentation du Chœur</h2>

        <p className="text-center mb-5 intro-rituelle">
          Le Chœur Artistique & Spirituel de Tanà est né du désir d’unir les âmes par la beauté de la voix humaine.
          Fondé à Antananarivo, il rassemble des chanteurs animés par une foi profonde et une passion pour l’art vocal sacré.
        </p>

        <div className="row g-5">
          <div className="col-md-6">
            <h4 className="mb-3">🎼 Notre mission</h4>
            <p>
              Créer un espace où la musique devient prière, où chaque performance transcende le visible pour toucher l’invisible.
              Le CAST œuvre pour éveiller la spiritualité à travers l’harmonie, le silence et la résonance intérieure.
            </p>
          </div>

          <div className="col-md-6">
            <h4 className="mb-3">🌍 Nos valeurs</h4>
            <ul className="list-group list-group-flush shadow-sm rounded">
              <li className="list-group-item">Foi et ferveur musicale</li>
              <li className="list-group-item">Fraternité et entraide</li>
              <li className="list-group-item">Excellence artistique</li>
              <li className="list-group-item">Respect et humilité</li>
              <li className="list-group-item">Ouverture culturelle et spirituelle</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/inspiration" className="btn btn-outline-primary me-2">Voir nos inspirations</Link>
          <Link to="/engagement" className="btn btn-primary">S’engager avec nous</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Presentation;