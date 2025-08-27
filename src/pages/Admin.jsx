import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/poesie.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <Header />

      {/* 🔐 Vérification d'accès */}
      <section id="auth-check" className="mb-4">
        <p className="text-muted">Vérification des droits d’accès...</p>
      </section>

      {/* 🎛️ Panneau Administrateur */}
      <main className="admin-dashboard">
        <h1 className="titre-rituel">Panneau Administrateur</h1>

        {/* 📤 Zone d’upload */}
        <section id="upload-zone">
          <h2>Uploader un média</h2>
          <input type="file" id="mediaInput" />
          <button id="uploadBtn">Téléverser</button>
        </section>

        {/* 🖼️ Galerie media */}
        <section id="media-gallery">
          <h2>Médias existants</h2>
          <div className="gallery-container"></div>
        </section>

        {/* 🔑 Connexion */}
        <section id="auth-section">
          <h2>Connexion sécurisée</h2>
          <input type="email" id="email" placeholder="Adresse email" />
          <input type="password" id="password" placeholder="Mot de passe" />
          <button id="loginBtn">Connexion</button>
        </section>

        {/* 👥 Gestion des membres */}
        <section id="panel-membres" style={{ display: 'none' }}>
          <h2>Gestion des membres</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Affiliation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="table-body-membres">
              {/* Remplissage JS ici */}
            </tbody>
          </table>
        </section>

        {/* 📁 Fichiers soumis */}
        <section id="panel-fichiers" style={{ display: 'none' }} className="mt-5">
          <h2>Fichiers soumis</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nom du fichier</th>
                <th>Membre</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="table-body-fichiers">
              {/* Remplissage JS ici */}
            </tbody>
          </table>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;