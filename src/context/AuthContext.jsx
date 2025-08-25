import { createContext, useContext } from "react";

// Crée le contexte
const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  // Remplace ceci par ton vrai hook d'authentification (ex: useUser)
  const dummyAuth = {
    user: null,
    loading: false,
    logout: () => {}, // Ajoute des méthodes si nécessaire
  };

  return (
    <AuthContext.Provider value={dummyAuth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useAuth = () => useContext(AuthContext);