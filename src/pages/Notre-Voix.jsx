import React from 'react';
import '../styles/poesie.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import ProverbeSelector from '../components/ProverbeSelector';

export default function NotreVoix() {
  const proverbe = typeof ProverbeSelector === 'function'
    ? ProverbeSelector()
    : "Ny feo mitambatra no mahery.";

  return (
    <div className="notre-voix-container">
      <Header />

      <h1 className="titre-rituel">Notre Voix 🎤</h1>
      <p className="intro-rituelle">
        Là où chaque voix devient vibration collective.<br />
        <em>{`“${proverbe}”`}</em>
      </p>

      <section className="audio-section">
        <h2>🎼 Chants rituels</h2>
        <AudioPlayer src="/assets/audio/cast-chant1.mp3" title="Chant d’ouverture" />
        <AudioPlayer src="/assets/audio/cast-chant2.mp3" title="Chant de l’unité" />
        <AudioPlayer src="/assets/audio/voix-sacre.mp3" title="Voix sacrée" />
      </section>

      <section className="journal-section">
        <h2>📜 Journal des pousses</h2>
        <p>
          Chaque commit est une voix qui s’élève.<br />
          <a href="/journal-des-pousses.md" target="_blank">Consulter le journal</a>
        </p>
      </section>

      <Footer />
    </div>
  );
}