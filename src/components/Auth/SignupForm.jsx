// src/components/Auth/SignupForm.jsx
import React from 'react';

const SignupForm = () => {
  return (
    <form id="form-inscription" className="row align-items-center">
      <div className="col-md-6">
        <h4>Inscription</h4>
        <input type="text" className="form-control mb-2" placeholder="Nom" required />
        <input type="text" className="form-control mb-2" placeholder="Prénom" required />
        <input type="email" className="form-control mb-2" placeholder="Email" required />
        <input type="email" className="form-control mb-2" placeholder="Confirmer l’email" required />
        <input type="password" className="form-control mb-2" placeholder="Mot de passe" required />
        <input type="password" className="form-control mb-2" placeholder="Confirmer le mot de passe" required />
        <button type="submit" className="btn btn-outline-primary">S’inscrire</button>
      </div>
      <div className="col-md-6 text-center">
        <img src="/assets/img/sary2.jpg" alt="Visuel inscription" className="img-fluid rounded shadow-sm" />
      </div>
    </form>
  );
};

export default SignupForm;