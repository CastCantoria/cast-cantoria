import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // 🔧 Ajouté pour Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAoEx_uI33l7NdccnaDFIo795MojTW5WJc",
  authDomain: "cast-cantoria.firebaseapp.com",
  projectId: "cast-cantoria",
  storageBucket: "cast-cantoria.firebasestorage.app",
  messagingSenderId: "952519116536",
  appId: "1:952519116536:web:eb3b6b5a7bb2ba27c69d0d",
  measurementId: "G-NQJ5YLTGEJ"
};

const app = initializeApp(firebaseConfig);

// 🔐 Authentification
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// 🔥 Base de données Firestore
export const db = getFirestore(app);