import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-light shadow-sm position-sticky top-0 w-100 z-3">
      <nav className="navbar navbar-expand-lg container py-3">
        {/* 🌟 Logo et titre */}
        <Link className="navbar-brand text-light d-flex align-items-center" to="/">
          <img
            src="assets/images/logo-cast.png"
            alt="Logo C.A.S.T."
            height="50"
            className="me-2"
          />
          <span className="fs-4 fw-bold">C.A.S.T.</span>
        </Link>

        {/* 🍔 Bouton burger (mobile) */}
        <button
          className="navbar-toggler text-light border-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuCAST"
          aria-controls="menuCAST"
          aria-expanded="false"
          aria-label="Ouvrir le menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🧭 Menu principal */}
        <div className="collapse navbar-collapse justify-content-end" id="menuCAST">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Accueil</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                data-bs-toggle="dropdown"
              >
                À propos
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/presentation">Présentation</Link></li>
                <li><Link className="dropdown-item" to="/inspiration">Inspiration</Link></li>
                <li><Link className="dropdown-item" to="/notre-voix">Notre Voix</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" to="/gallery">Galerie</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                data-bs-toggle="dropdown"
              >
                Rejoindre
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/engagement">Engagements</Link></li>
                <li><Link className="dropdown-item" to="/contact">Contact</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-warning fw-bold" to="/espace-membre">
                Espace membre
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;