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
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserData: {
    boards: [];
    id: string;
  };
  fetchData: (object: any) => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<boolean>(false);
  console.log(currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.uid && user.email) {
        setCurrentUser((prev) => (prev = user));
        console.log("set");
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (sessionStorage.length === 0) {
      logout();
      console.log("clear");
    }
  }, [sessionStorage.length]);

  const fetchData = (object: any) => {
    setCurrentUserData(object);
  };

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const value: AuthContextValue = {
    currentUser,
    signUp,
    login,
    logout,
    theme,
    setTheme,
    currentUserData,
    fetchData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
