import { getAuth } from 'firebase/auth';

export default function Accueil() {
  const user = getAuth().currentUser;

  return (
    <div className="accueil">
      <h1>Bienvenue sur C.A.S.T. Cantoria 🌞</h1>
      <p>« Ny feo mitambatra no mampisy hery. »</p>
      {user && (
        <a href="/profil" className="btn btn-primary mt-3">
          Accéder à mon espace
        </a>
      )}
    </div>
  );
}