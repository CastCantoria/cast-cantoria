// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-light py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h4 mb-0">C.A.S.T. Cantoria</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item"><Link to="/" className="nav-link text-light">Accueil</Link></li>
            <li className="nav-item"><Link to="/Presentation" className="nav-link text-light">Présentation</Link></li>
            <li className="nav-item"><Link to="/Inspiration" className="nav-link text-light">Inspiration</Link></li>
            <li className="nav-item"><Link to="/Gallery" className="nav-link text-light">Galerie</Link></li>
            <li className="nav-item"><Link to="/Contact" className="nav-link text-light">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;