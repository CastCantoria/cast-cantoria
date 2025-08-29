import { getAuth } from 'firebase/auth';

export default function CastCantoria() {
  const user = getAuth().currentUser;

  return (
    <div className="cast-84d3f">
      <h2>Espace Membre 🌟</h2>
      {user ? (
        <div>
          <p>Bienvenue, {user.displayName || user.email}</p>
          <a href="/profil" className="btn btn-info mt-3">Voir mon profil</a>
        </div>
      ) : (
        <p>Veuillez vous connecter pour accéder à votre espace.</p>
      )}
    </div>
  );
}