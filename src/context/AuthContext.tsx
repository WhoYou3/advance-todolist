import React, { useContext, useState, useEffect } from "react";
import { auth } from "../App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  currentUser: firebase.User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextValue = {
    currentUser,
    signUp,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
