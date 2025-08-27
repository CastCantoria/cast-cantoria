import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import useAuthStore from '../stores/authStore'; // ✅ Ajouté
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { setAuthMode } = useAuthStore(); // ✅ Ajouté

  const handleLogout = async () => {
    await signOut(auth);
    alert("🔒 Vous avez été déconnecté.");
    navigate('/');
  };

  const handleLoginRedirect = () => {
    setAuthMode('login'); // ✅ Active le formulaire de connexion
    navigate('/espace-membre');
  };

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
          <ul className="navbar-nav align-items-center">
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

            {/* 👤 État de connexion */}
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-success"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    {user.displayName || user.email}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/profil">Mon profil</Link></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Se déconnecter
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-warning ms-2 fw-bold" onClick={handleLoginRedirect}>
                  Se connecter
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;