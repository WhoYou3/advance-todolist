import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface AuthRouteProps {
  children: React.ReactNode;
}
const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();

  const context = useAuth();

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      navigate(`/${context?.currentUser?.uid}`);
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

export default AuthRoute;
