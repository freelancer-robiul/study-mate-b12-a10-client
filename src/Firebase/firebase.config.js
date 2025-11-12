import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXLPLSY87hANjsspjiM8vQDrtoK4LV23U",
  authDomain: "b12-a10-514fb.firebaseapp.com",
  projectId: "b12-a10-514fb",
  storageBucket: "b12-a10-514fb.appspot.com",
  messagingSenderId: "366204515067",
  appId: "1:366204515067:web:9f1e4d99e2b5fd0114365e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
