import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export async function login(email, password) {
  const auth = getAuth();
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        return { error: 'Utilisateur inconnu 🙁 — Veuillez vous inscrire.' };
      case 'auth/wrong-password':
        return { error: 'Mot de passe incorrect 🙁 — Réessayez ou réinitialisez.' };
      default:
        return { error: 'Erreur de connexion. Veuillez réessayer.' };
    }
  }
}