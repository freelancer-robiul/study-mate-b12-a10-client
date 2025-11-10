// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // auth apis
  const register = (email, password, name, photoURL) =>
    createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
      if (name || photoURL) {
        await updateProfile(res.user, { displayName: name, photoURL });
      }
      setUser({ ...res.user });
      return res;
    });

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const value = { user, loading, register, login, googleLogin, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
