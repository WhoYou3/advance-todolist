import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./GlobalStyles";
import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
