import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login } from "./pages";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebase.config";

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Home />
      </AuthRoute>
    ),
  },
  { path: "/Login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
