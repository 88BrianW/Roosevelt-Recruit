// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM1tLxtymYk_t4GsXzcRtAjQHvJBnieBw",
  authDomain: "rooseveltrecruit.firebaseapp.com",
  projectId: "rooseveltrecruit",
  storageBucket: "rooseveltrecruit.firebasestorage.app",
  messagingSenderId: "416621692966",
  appId: "1:416621692966:web:b4386b96f79c21877c7ee7",
  measurementId: "G-RGE1X24XTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };