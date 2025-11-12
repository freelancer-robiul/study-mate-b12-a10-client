import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const Ctx = createContext(null);
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const googleSignIn = () => signInWithPopup(auth, provider);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const updateUser = (profile) => updateProfile(auth.currentUser, profile);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, signIn, googleSignIn, register, updateUser, logout }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
