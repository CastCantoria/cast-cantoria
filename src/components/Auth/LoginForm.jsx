import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (error) {
      setMessage("Erreur de connexion : " + error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setMessage("Veuillez entrer votre adresse e-mail.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📧 Un e-mail de réinitialisation a été envoyé.");
    } catch (error) {
      setMessage("Erreur : " + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="form-control mb-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-primary w-100">Connexion</button>
      <button type="button" className="btn btn-link mt-2" onClick={handleResetPassword}>
        Mot de passe oublié ?
      </button>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </form>
  );
};

export default LoginForm;