import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
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
import Profesores from "./pages/Profesores/profesores";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminCursos from "./pages/AdminCursos/AdminCursos";
import AdminUsuarios from "./pages/AdminUsuarios/AdminUsuarios";
import SolicitudesPendientes from "./pages/AdminCursos/SolicitudesPendientes/SolicitudesPendientes";
import TodosLosCursos from "./pages/AdminCursos/TodosLosCursos/TodosLosCursos";
import CompraCurso from "./pages/CompraCurso/CompraCurso";
import Checkout from "./pages/Checkout/Checkout"; 


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
        path: "profesores",
        element: <Profesores />,
      },
      {path: "compraCurso/:idCurso",
       element: <CompraCurso />
      },

      {
        path: "checkout/:idCurso",
        element: <Checkout />,
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
      {
        path: "admin/cursos/pendientes",
        element: (
          <ProtectedRoute requiredRole="administrador">
            <SolicitudesPendientes />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/cursos/todos",
        element: (
          <ProtectedRoute requiredRole="administrador">
            <TodosLosCursos />
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
