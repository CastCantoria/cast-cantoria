// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoEx_uI33l7NdccnaDFIo795MojTW5WJc",
  authDomain: "cast-cantoria.firebaseapp.com",
  projectId: "cast-cantoria",
  storageBucket: "cast-cantoria.firebasestorage.app",
  messagingSenderId: "952519116536",
  appId: "1:952519116536:web:e06c6a0cc9c08ae2c69d0d",
  measurementId: "G-T23NG4H2Z2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);