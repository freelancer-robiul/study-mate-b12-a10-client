// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXLPLSY87hANjsspjiM8vQDrtoK4LV23U",
  authDomain: "b12-a10-514fb.firebaseapp.com",
  projectId: "b12-a10-514fb",
  storageBucket: "b12-a10-514fb.firebasestorage.app",
  messagingSenderId: "366204515067",
  appId: "1:366204515067:web:9f1e4d99e2b5fd0114365e",
};

const app = initializeApp(firebaseConfig);
export default app;
