import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import UserProfile from "./UserProfile"; // nouveau composant

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null); // 👈 pour afficher le profil

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        fullName: fullName.trim(),
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // 🔍 Récupérer le document Firestore
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        setProfile(docSnap.data());
        setMessage(`✅ Compte créé et profil chargé`);
      } else {
        setMessage("⚠️ Profil introuvable après création.");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setMessage("❌ Cet email est déjà utilisé.");
          break;
        case "auth/invalid-email":
          setMessage("❌ Adresse email invalide.");
          break;
        case "auth/weak-password":
          setMessage("❌ Mot de passe trop faible.");
          break;
        default:
          setMessage("❌ Erreur : " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Création..." : "S'inscrire"}
        </button>
        {message && <p>{message}</p>}
      </form>

      {/* 👀 Affichage du profil */}
      {profile && <UserProfile data={profile} />}
    </>
  );
};

export default SignupForm;