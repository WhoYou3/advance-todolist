import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
}
const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Czyszczenie subskrypcji przy odmontowywaniu komponentu
  }, [auth]);

  useEffect(() => {
    if (!loading) {
      // Sprawdzenie, czy loading jest ustawione na false
      if (auth.currentUser) {
        console.log("tescik");
        console.log(auth.currentUser);
        // Sprawdzenie, czy użytkownik jest zalogowany
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [loading, auth, navigate]);

  if (loading) return <p>loading..</p>;

  return <>{children}</>;
};

export default AuthRoute;
