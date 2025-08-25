// src/pages/Inspiration.jsx
import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const inspirations = [
  {
    title: "Chant sacré et guérison",
    text: "La vibration vocale peut apaiser l’âme et reconnecter à l’essentiel.",
  },
  {
    title: "L’unité par la polyphonie",
    text: "Chaque voix est unique, mais ensemble elles forment un tout harmonieux.",
  },
  {
    title: "Foi incarnée dans le souffle",
    text: "Respirer, chanter, croire — trois gestes qui élèvent.",
  },
];

const Inspiration = () => {
  return (
    <Layout>
      <main className="container py-5">
        <h2 className="text-center mb-4">🌟 Inspirations du Chœur</h2>
        <p className="text-muted text-center">
          « Là où les mots échouent, la musique parle. »
        </p>

        <section className="mt-5">
          <div className="row g-4">
            {inspirations.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-5">
          <Link to="/inscription" className="btn btn-primary">
            Rejoindre le Chœur
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default Inspiration;