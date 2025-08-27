import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAoEx_uI33l7NdccnaDFIo795MojTW5WJc",
  authDomain: "cast-cantoria.firebaseapp.com",
  projectId: "cast-cantoria",
  storageBucket: "cast-cantoria.firebasestorage.app",
  messagingSenderId: "952519116536",
  appId: "1:952519116536:web:e06c6a0cc9c08ae2c69d0d",
  measurementId: "G-T23NG4H2Z2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();