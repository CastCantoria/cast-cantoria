// public/js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoEx_uI33l7NdccnaDFIo795MojTW5WJc",
  authDomain: "cast-cantoria.firebaseapp.com",
  projectId: "cast-cantoria",
  storageBucket: "cast-cantoria.appspot.com", // ✅ corrigé
  messagingSenderId: "952519116536",
  appId: "1:952519116536:web:e06c6a0cc9c08ae2c69d0d",
  measurementId: "G-T23NG4H2Z2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };