import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProverbeSelector from '../components/ProverbeSelector';
import { Link } from 'react-router-dom';
import '../styles/poesie.css';

const Main = () => {
  const proverbe = ProverbeSelector();

  return (
    <div className="main-container">
      <Header />

      {/* 🎙️ Citation d’ouverture */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « Ce que vous entendrez aujourd’hui, ce ne sont pas des voix… Ce sont des âmes en prière. »
        </p>
        <p className="proverbe-rituel mt-2">
          {`“${proverbe}”`}
        </p>
      </section>

      {/* 🎵 Hero */}
      <section
        className="text-center text-light py-5 hero-section"
        style={{
          backgroundImage: "url('/assets/images/photo-choeur.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-opacity-75 p-4 rounded">
          <h1 className="display-5 fw-bold">L’harmonie de la foi et de l’art</h1>
          <p className="lead mt-3">
            Découvrez comment la musique unit les âmes à travers la puissance de la voix humaine.
          </p>
          <Link to="/contact" className="btn btn-primary mt-3">Découvrez-nous</Link>
        </div>
      </section>

      {/* 🕊️ À propos */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="/assets/images/galerie2.jpg"
              alt="À propos du C.A.S.T."
              className="img-fluid rounded shadow zoomable"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">À propos</h2>
            <p>
              Le C.A.S.T. est un ensemble vocal artistique et spirituel, fondé en mars 2003 à Antananarivo...
            </p>
            <p>
              Notre chœur est composé de membres issus de diverses Églises chrétiennes...
            </p>
            <Link to="/presentation" className="btn btn-secondary mt-3">En savoir plus</Link>
          </div>
        </div>
      </section>

      {/* 🌟 Inspiration */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Inspiration</h2>
          <div className="row">
            {[
              ['inspiration1.jpg', 'La Musique', 'musique'],
              ['inspiration2.jpg', "L'Art", 'art'],
              ['inspiration3.jpg', 'La Spiritualité', 'spiritualite'],
            ].map(([img, title, anchor], i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="card shadow-sm zoomable-card">
                  <img src={`/assets/images/${img}`} alt={title} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">...</p>
                    <Link to={`/inspiration#${anchor}`} className="btn btn-primary">Découvrez</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🖼️ Galerie */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Galerie</h2>
        <div className="row">
          {['IMG-20250620-WA0005.jpg', 'galerie2.jpg', 'galerie3.jpg'].map((img, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <img
                src={`/assets/images/${img}`}
                alt={`Galerie ${i + 1}`}
                className="img-fluid rounded shadow zoomable"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/gallery" className="btn btn-secondary">Voir la galerie complète</Link>
        </div>
      </section>

      {/* 🤝 Engagements */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Nos Engagements</h2>
          <div className="row">
            {[
              ['Qualité', 'Nous nous engageons à offrir des performances...'],
              ['Accessibilité', 'Nous œuvrons pour rendre notre musique accessible...'],
              ['Durabilité', "Nous nous engageons en faveur d'une pratique artistique durable..."],
            ].map(([title, text], i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📬 Contact */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Contact</h2>
        <p className="text-center mb-4">
          Pour toute demande d'information, de réservation ou de partenariat...
        </p>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form action="contact.php" method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input type="text" className="form-control" id="name" name="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          </div>
        </div>
      </section>

      {/* 🌌 Poetic closing */}
      <section className="poetic-home bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Écouter autrement</h2>
          <p className="fst-italic poetic-intro-phrase mb-4">
            « Il arrive que la voix dise ce que le cœur n’ose penser. »
          </p>
          <Link to="/notre-voix" className="btn btn-outline-primary">
            Entrer dans notre voix intérieure
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Main;