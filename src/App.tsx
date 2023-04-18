import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login } from "./pages";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import AuthRoute from "./components/AuthRoute/AuthRoute";

export const app = initializeApp(firebaseConfig);

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
