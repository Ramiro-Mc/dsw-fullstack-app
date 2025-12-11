import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Course from "./pages/Course/Course";
import Layout from "./components/Layout";
import Landing from "./pages/Landing/Landing";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LayoutMiPerfil from "./components/MiPerfil/LayoutMiPerfil";
import InformacionDeCobro from "./pages/InformacionDeCobro/InformacionDeCobro";
import MisCursosCreados from "./pages/MisCursosCreados/MisCursosCreados";
import MisCursosComprados from "./pages/MisCursosComprados/MisCursosComprados";
import InformacionPersonal from "./pages/InformacionPersonal/InformacionPersonal";
import CrearCursoPage from "./pages/CrearCurso/CrearCurso";
import EditarCursoPage from "./pages/EditarCurso/EditarCurso";
import Profesores from "./pages/Profesores/Profesores";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminCursos from "./pages/AdminCursos/AdminCursos";
import AdminUsuarios from "./pages/AdminUsuarios/AdminUsuarios";
import SolicitudesPendientes from "./pages/AdminCursos/SolicitudesPendientes/SolicitudesPendientes";
import TodosLosCursos from "./pages/AdminCursos/TodosLosCursos/TodosLosCursos";
import CompraCurso from "./pages/CompraCurso/CompraCurso";
import SobreNosotros from "./pages/SobreNosotros/SobreNosotros";
import Contacto from "./pages/Contacto/Contacto";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutSuccess from "./pages/Checkout/CheckoutSuccess";
import Foro from "./pages/Foro/Foro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AdminRoute><Landing /></AdminRoute>,
      },
      {
        path: "course/:idCurso",
        element: <ProtectedRoute><AdminRoute><Course /></AdminRoute></ProtectedRoute>,
      },
      {
        path: "loginPage",
        element: <AdminRoute><LoginPage /></AdminRoute>,
      },
      {
        path: "registerPage",
        element: <AdminRoute><RegisterPage /></AdminRoute>,
      },
      {
        path: "sobreNosotros",
        element: <AdminRoute><SobreNosotros/></AdminRoute>,
      },
      {
        path: "contacto",
        element: <AdminRoute><Contacto/></AdminRoute>,
      },
      {
        path: "foro/:idCurso",
        element: <ProtectedRoute><AdminRoute><Foro /></AdminRoute></ProtectedRoute>,
      },
      {
        path: "MiPerfil",
        element: <ProtectedRoute><AdminRoute><LayoutMiPerfil /></AdminRoute></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <InformacionPersonal />,
          },
          {
            path: "misCursosCreados",
            element: <MisCursosCreados />,
          },
          {
            path: "misCursosComprados",
            element: <MisCursosComprados />,
          },
          {
            path: "informacionDeCobro",
            element: <InformacionDeCobro />,
          },
        ],
      },
      {
        path: "crearCurso",
        element: <ProtectedRoute><AdminRoute><CrearCursoPage /></AdminRoute></ProtectedRoute>,
      },
      {
        path: "editarCurso/:idCurso", 
        element: <ProtectedRoute><AdminRoute><EditarCursoPage /></AdminRoute></ProtectedRoute>,
      },
      {
        path: "profesores",
        element: <AdminRoute><Profesores /></AdminRoute>,
      },
      {
        path: "compraCurso/:idCurso",
        element: <AdminRoute><CompraCurso /></AdminRoute>
      },
      {
        path: "checkout/:idCurso",
        element: <ProtectedRoute><Checkout /></ProtectedRoute>,
      },
      {
        path: "checkout/success", 
        element: <ProtectedRoute><CheckoutSuccess /></ProtectedRoute>,
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
