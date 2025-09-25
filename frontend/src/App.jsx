import "./App.css";
import "./estilos-a-revisar.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Course from "./pages/Course";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader, action, children, etc.
  },
  {
    path: "/course",
    element: <Course />,
  },
  // ...más rutas
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;