import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages";

const router = createBrowserRouter([{ path: "/", element: <Login /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
