// src/pages/NotreVoix.jsx
import React from 'react';
import Layout from '../components/Layout';

const NotreVoix = () => {
  return (
    <Layout>
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « La voix est le souffle de l’âme, façonné par le silence. »
        </p>
      </section>

      <main className="container py-5">
        <h2 className="text-center mb-4">Notre Voix</h2>

        <p className="text-center mb-5">
          Le CAST explore la voix comme instrument sacré, révélateur d’émotions et de spiritualité. Chaque membre apporte sa couleur vocale, son vécu, et son engagement dans une quête sonore commune.
        </p>

        <div className="row g-4">
          <div className="col-md-6">
            <h4>🎤 Technique vocale</h4>
            <p>
              Travail sur la respiration, la justesse, la projection et l’harmonisation. La voix est cultivée avec respect et exigence.
            </p>
          </div>
          <div className="col-md-6">
            <h4>🧘 Expression intérieure</h4>
            <p>
              Chaque chant est une offrande. L’interprétation est guidée par l’intention, la foi et la connexion au message musical.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default NotreVoix;