import "./App.css";
import "./estilos-a-revisar.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Course from "./pages/Course";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsuariosPage from "./pages/UsuariosPage";
import CrearCursoPage from "./pages/CrearCurso";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "loginPage",
        element: <LoginPage />,
      },
      {
        path: "registerPage",
        element: <RegisterPage />,
      },
      {
        path: "usuariosPage",
        element: <UsuariosPage />,
      },
      {
        path: "crearCurso",
        element: <CrearCursoPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
