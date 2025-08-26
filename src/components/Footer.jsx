// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} C.A.S.T. Cantoria</p>
        <p className="mb-0">Tous droits réservés. Site réalisé avec ❤️ par Tovoniaina.</p>
      </div>
    </footer>
  );
};

export default Footer;