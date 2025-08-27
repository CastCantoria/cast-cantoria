import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import SocialLogin from '../components/SocialLogin';
import ProverbeSelector from '../components/ProverbeSelector';
import '../styles/poesie.css';

const EspaceMembre = () => {
  const [authMode, setAuthMode] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [rituelMessage, setRituelMessage] = useState('');
  const proverbe = ProverbeSelector();

  const handleFileClick = () => {
    const input = document.getElementById('fileInput');
    if (input) input.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);

    const proverbes = [
      "Ny feo rehetra dia mitondra hafatra.",
      "Ny fanomezana dia mitombo rehefa zaraina.",
      "Ny rakitra dia fitadidiana velona.",
    ];
    const index = Math.floor(Math.random() * proverbes.length);
    setRituelMessage(proverbes[index]);

    const audio = new Audio('/assets/audio/cast-chant1.mp3');
    audio.play();
  };

  return (
    <div className="espace-membre-container">
      <Header />

      {/* 📝 Citation d’accueil */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « Derrière chaque voix, il y a une intention. Derrière chaque fichier, une offrande sonore. »
        </p>
        <p className="proverbe-rituel mt-2">
          {`“${proverbe}”`}
        </p>
      </section>

      {/* 👤 Espace membre */}
      <section className="section membre-access">
        <div className="container">
          <h2 className="section-title titre-rituel">🎶 Espace Membre</h2>
          <p className="section-intro intro-rituelle">
            <strong>Bienvenue !</strong> Connectez-vous ou inscrivez-vous pour rejoindre le Chœur Artistique & Spirituel de Tanà.
          </p>

          <div className="button-group mb-3">
            <button className="btn btn-primary me-2" onClick={() => setAuthMode('login')}>Se connecter</button>
            <button className="btn btn-secondary" onClick={() => setAuthMode('signup')}>S’inscrire</button>
          </div>

          {authMode === 'login' && <LoginForm />}
          {authMode === 'signup' && <SignupForm />}

          <div className="divider"><span>ou</span></div>
          <SocialLogin />

          <p className="section-note mt-4">
            🎤 Vous pourrez bientôt partager vos créations vocales et recevoir des inspirations du chœur.
          </p>
        </div>
      </section>

      {/* 📤 Zone d’upload */}
      <section className="container mb-5">
        <div className="upload-zone text-center">
          <p className="mb-2">🎶 Déposez vos fichiers ici ou cliquez pour choisir</p>
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*,audio/*,video/*"
            hidden
            onChange={handleFileChange}
          />
          <button className="btn btn-primary" onClick={handleFileClick}>
            Choisir un fichier
          </button>

          {rituelMessage && (
            <p className="proverbe-rituel mt-4 text-center">
              {`“${rituelMessage}”`}
            </p>
          )}
        </div>

        {/* 🖼️ Galerie interactive */}
        <div className="row g-4 mt-4">
          {uploadedFiles.map((file, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow-sm">
                {file.type.startsWith('image/') && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="card-img-top"
                  />
                )}
                {file.type.startsWith('audio/') && (
                  <audio controls className="w-100">
                    <source src={URL.createObjectURL(file)} type={file.type} />
                  </audio>
                )}
                {file.type.startsWith('video/') && (
                  <video controls className="w-100">
                    <source src={URL.createObjectURL(file)} type={file.type} />
                  </video>
                )}
                <div className="card-body">
                  <p className="card-text text-center">{file.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EspaceMembre;