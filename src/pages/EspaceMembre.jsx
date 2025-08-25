import React, { useState } from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import SocialLogin from "../components/SocialLogin";
import UploadZone from "../components/UploadZone";

const EspaceMembre = () => {
  const [authMode, setAuthMode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Layout>
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « Derrière chaque voix, il y a une intention. Derrière chaque fichier, une offrande sonore. »
        </p>
      </section>

      <section className="section membre-access">
        <div className="container">
          <h2 className="section-title">🎶 Espace Membre</h2>

          {!isAuthenticated ? (
            <>
              <p className="section-intro">
                <strong>Bienvenue !</strong> Connectez-vous ou inscrivez-vous pour rejoindre le Chœur Artistique & Spirituel de Tanà.
              </p>

              <div className="button-group mb-3">
                <button className="btn btn-primary me-2" onClick={() => setAuthMode("login")}>
                  Se connecter
                </button>
                <button className="btn btn-outline-secondary" onClick={() => setAuthMode("signup")}>
                  S’inscrire
                </button>
              </div>

              {authMode === "login" && (
                <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
              )}
              {authMode === "signup" && (
                <SignupForm onSignupSuccess={() => setIsAuthenticated(true)} />
              )}

              <div className="divider my-4"><span>ou</span></div>
              <SocialLogin onLoginSuccess={() => setIsAuthenticated(true)} />
            </>
          ) : (
            <>
              <div className="alert alert-success text-center">
                👋 Bienvenue dans l’espace membre, que votre voix résonne avec lumière !
              </div>
              <UploadZone />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EspaceMembre;