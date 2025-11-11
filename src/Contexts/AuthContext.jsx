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
  sendPasswordResetEmail,
} from "firebase/auth";

const auth = getAuth(app);
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const un = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return () => un();
  }, []);

  const register = (email, password, name, photoURL) =>
    createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
      if (name || photoURL)
        await updateProfile(res.user, { displayName: name, photoURL });
      setUser({ ...res.user });
      return res;
    });

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        googleLogin,
        resetPassword,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
