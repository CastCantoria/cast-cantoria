import React from 'react';

const Gallery = () => {
  return (
    <>
      {/* 🔎 Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          id="search-bar"
          className="form-control w-50 mx-auto"
          placeholder="🔎 Rechercher un titre..."
        />
      </div>

      {/* 🎤 Créations Vocales */}
      <section className="galerie-section">
        <div className="container text-center py-4">
          <h3>🎤 Créations Vocales</h3>
          <div id="galerie-vocales" className="row g-4 justify-content-center"></div>
        </div>
      </section>

      {/* 🎨 Créations Visuelles et Spirituelles */}
      <section className="galerie-section">
        <div className="container text-center py-4">
          <h3>🎨 Créations Visuelles et Spirituelles</h3>
          <div id="galerie-visuelles" className="row g-4 justify-content-center"></div>
        </div>
      </section>

      {/* 🎶 Filtre par type */}
      <div className="mb-4">
        <select id="filtre-type" className="form-select w-auto mx-auto">
          <option value="all">🎶 Tous les médias</option>
          <option value="audio">🎤 Audio</option>
          <option value="image">🖼️ Image</option>
          <option value="video">🎥 Vidéo</option>
        </select>
      </div>
    </>
  );
};

export default Gallery;