import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Course from "./pages/Course/Course";
import Layout from "./components/Layout";
import Landing from "./pages/Landing/Landing";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UsuariosPage from "./pages/UsuariosPage/UsuariosPage";
import LayoutMiPerfil from "./components/MiPerfil/LayoutMiPerfil";
import InformacionDePago from "./pages/InformacionDePago/InformacionDePago";
import Reportes from "./pages/Reportes/Reportes";
import MisCursos from "./pages/MisCursos/MisCursos";
import InformacionPersonal from "./pages/InformacionPersonal/InformacionPersonal";
import CrearCursoPage from "./pages/CrearCurso/CrearCurso";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminCursos from "./pages/AdminCursos/AdminCursos";
import AdminUsuarios from "./pages/AdminUsuarios/AdminUsuarios";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
        path: "course/:idCurso",
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
        path: "MiPerfil",
        element: <LayoutMiPerfil />,
        children: [
          {
            index: true,
            element: <InformacionPersonal />,
          },
          {
            path: "misCursos",
            element: <MisCursos />,
          },
          {
            path: "informacionDePago",
            element: <InformacionDePago />,
          },
          {
            path: "reportes",
            element: <Reportes />,
          },
        ],
      },
      {
        path: "usuariosPage",
        element: <UsuariosPage />,
      },
      {
        path: "crearCurso",
        element: <CrearCursoPage />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute requiredRole="administrador">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/cursos",
        element: (
          <ProtectedRoute requiredRole="administrador">
            <AdminCursos />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/usuarios",
        element: (
          <ProtectedRoute requiredRole="administrador">
            <AdminUsuarios />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
