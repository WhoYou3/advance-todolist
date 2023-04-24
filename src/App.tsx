import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login } from "./pages";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, getDocs, getFirestore, doc } from "firebase/firestore";
import { firebaseConfig } from "./firebase.config";

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();

export const db = getFirestore();
console.log(db);

export const usersRef = collection(db, "Users");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Home />
      </AuthRoute>
    ),
  },
  {
    path: "/:userId",
    element: (
      <AuthRoute>
        <Home />
      </AuthRoute>
    ),
  },
  {
    path: "/Login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
