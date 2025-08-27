import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProverbeSelector from '../components/ProverbeSelector';
import { Link } from 'react-router-dom';
import '../styles/poesie.css';

const inspirations = [
  {
    src: '/assets/images/inspiration1.jpg',
    alt: 'Chants sacrés',
    title: 'Chants sacrés',
    text: 'Des mélodies anciennes qui résonnent encore dans les âmes modernes.',
  },
  {
    src: '/assets/images/inspiration2.jpg',
    alt: 'Polyphonies du monde',
    title: 'Polyphonies du monde',
    text: 'Des voix venues d’ailleurs, unies dans une même prière vocale.',
  },
  {
    src: '/assets/images/inspiration3.jpg',
    alt: 'Créations originales',
    title: 'Créations originales',
    text: 'Des œuvres nées de l’âme collective, entre poésie et spiritualité.',
  },
];

const Inspiration = () => {
  const proverbe = ProverbeSelector();

  return (
    <div className="inspiration-container">
      <Header />

      {/* 🎨 Citation d’ouverture */}
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « L'art sacré est une prière que l'on partage sans mot. »
        </p>
        <p className="proverbe-rituel mt-2">
          {`“${proverbe}”`}
        </p>
      </section>

      {/* 🌟 Contenu principal */}
      <main className="container py-5">
        <h2 className="text-center mb-4 titre-rituel">Nos Inspirations</h2>

        <p className="text-center mb-5 intro-rituelle">
          Le CAST puise son souffle dans des œuvres qui parlent au cœur, dans des traditions sacrées et contemporaines.
          Nos choix musicaux reflètent un équilibre entre ferveur, beauté et universalité.
        </p>

        <div className="row g-4">
          {inspirations.map((item, index) => (
            <div className="col-md-4 text-center" key={index}>
              <img
                src={item.src}
                alt={item.alt}
                className="img-fluid rounded shadow-sm zoomable"
              />
              <h5 className="mt-3">{item.title}</h5>
              <p className="small">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/contact" className="btn btn-primary">
            Partager votre inspiration
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Inspiration;