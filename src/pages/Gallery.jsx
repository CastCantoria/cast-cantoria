// src/pages/Gallery.jsx
import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Gallery = () => {
  return (
    <Layout>
      {/* 🌟 Citation d’accueil */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « Chaque image, chaque son, est une mémoire vivante de notre foi chantée. »
        </p>
      </section>

      {/* 🎶 Contenu principal avec animation */}
      <motion.main
        className="container py-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4">Galerie multimédia</h2>

        {/* 📷 PHOTOS */}
        <h3 className="mt-5 mb-3 text-center">Photos</h3>
        <div className="row g-3">
          {['photo1.jpg', 'photo2.jpg', 'photo3.jpg'].map((file, index) => (
            <div className="col-md-4" key={index}>
              <img
                src={`/assets/images/gallery/${file}`}
                alt={`Photo ${index + 1}`}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))}
        </div>

        {/* 🎥 VIDÉOS */}
        <h3 className="mt-5 mb-3 text-center">Vidéos</h3>
        <div className="row g-4 justify-content-center">
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Performance CAST"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-md-6">
            <video controls className="w-100 rounded shadow-sm">
              <source src="/assets/videos/concert1.mp4" type="video/mp4" />
              Votre navigateur ne prend pas en charge la vidéo HTML5.
            </video>
          </div>
        </div>

        {/* 🎧 AUDIOS */}
        <h3 className="mt-5 mb-3 text-center">Audios</h3>
        <div className="row g-4 justify-content-center">
          {[
            { src: 'cast-chant1.mp3', label: '« O solennel Gloria » — CAST Live' },
            { src: 'cast-chant2.mp3', label: '« Méditation vocale » — CAST Studio' }
          ].map((audio, index) => (
            <div className="col-md-6 text-center" key={index}>
              <audio controls className="w-100 shadow-sm rounded">
                <source src={`/assets/audio/${audio.src}`} type="audio/mp3" />
              </audio>
              <p className="mt-2">{audio.label}</p>
            </div>
          ))}
        </div>
      </motion.main>
    </Layout>
  );
};

export default Gallery;