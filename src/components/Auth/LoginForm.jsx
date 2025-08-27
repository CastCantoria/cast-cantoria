import React from 'react';
import useAuthStore from '../../stores/authStore';

const LoginForm = () => {
  const { setAuthMode } = useAuthStore();

  return (
    <form id="form-connexion" className="row align-items-center">
      <div className="col-md-6">
        <h4>Connexion</h4>
        <input type="email" className="form-control mb-2" placeholder="Email" required />
        <input type="password" className="form-control mb-2" placeholder="Mot de passe" required />
        <button type="submit" className="btn btn-success">Se connecter</button>

        <p className="mt-3 text-center">
          Pas encore membre ?{' '}
          <button type="button" className="btn btn-link" onClick={() => setAuthMode('signup')}>
            Inscrivez-vous ici
          </button>
        </p>
      </div>
      <div className="col-md-6 text-center">
        <img src="/assets/img/sary1.jpg" alt="Visuel connexion" className="img-fluid rounded shadow-sm" />
      </div>
    </form>
  );
};

export default LoginForm;