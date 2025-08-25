// src/hooks/useUserContext.js
import { useContext } from "react";
import UserContext from "./UserProvider"; // Assure-toi que UserProvider exporte le contexte par défaut

const useUserContext = () => useContext(UserContext);

export default useUserContext;