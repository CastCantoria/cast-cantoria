import React, { createContext } from "react";
import useUser from "./useUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userState = useUser();

  if (userState.loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>🔄 Chargement de l'utilisateur...</p>
      </div>
    );
  }

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;