// src/pages/Contact.jsx
import React from 'react';
import Layout from '../components/Layout';

const Contact = () => {
  return (
    <Layout>
      {/* Citation d’accueil */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « La musique touche ce que les mots ne peuvent dire. »
        </p>
      </section>

      {/* Contenu principal */}
      <main className="container py-5">
        <h2 className="text-center mb-4">Contactez-nous</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form method="POST" action="https://formspree.io/f/TON_ID_FORMSPREE">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Votre nom</label>
                <input type="text" className="form-control" id="name" name="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Votre email</label>
                <input type="email" className="form-control" id="email" name="_replyto" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Votre message</label>
                <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          </div>
        </div>

        <div className="text-center mt-5">
          <p><strong>Email :</strong> <a href="mailto:positifaid@live.fr">positifaid@live.fr</a></p>
          <p><strong>Téléphone :</strong> +261 34 11 361 57 oOo +261 32 91 828 83</p>
          <p><strong>Adresse :</strong> Antananarivo, Madagascar</p>
          <p>
            🌐 Suivez-nous :{' '}
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a> •{' '}
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">YouTube</a>
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default Contact;