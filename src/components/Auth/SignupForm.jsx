import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const SignupForm = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (email !== confirmEmail) {
      setErrorMessage("Les adresses email ne correspondent pas.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // 🎉 Tu peux ajouter ici une redirection ou un message de bienvenue
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("Cette adresse est déjà utilisée. Veuillez vous connecter.");
      } else {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }

      const audio = new Audio('/assets/audio/echec.mp3');
      audio.play();
    }
  };

  return (
    <form id="form-inscription" className="row align-items-center" onSubmit={handleSignup}>
      <div className="col-md-6">
        <h4>Inscription</h4>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Confirmer l’email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-outline-primary">S’inscrire</button>

        {errorMessage && (
          <p className="text-danger mt-2 text-center">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="col-md-6 text-center">
        <img src="/assets/img/sary2.jpg" alt="Visuel inscription" className="img-fluid rounded shadow-sm" />
      </div>
    </form>
  );
};

export default SignupForm;