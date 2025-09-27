import "./App.css";
import "./estilos-a-revisar.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Course from "./pages/Course";
import Header from "./components/HeaderAndFooter/Header";
import Footer from "./components/HeaderAndFooter/Footer";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsuariosPage from "./pages/UsuariosPage";
import CrearCursoPage from "./pages/CrearCurso";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    // loader, action, children, etc.
  },
  {
    path: "/course",
    element: <Course />,
  },
  {
    path: "/loginPage",
    element: <LoginPage />,
  },
  {
    path: "/registerPage",
    element: <RegisterPage />,
  },
  {
    path: "/usuariosPage",
    element: <UsuariosPage />,
  },
  {
    path: "/crearCurso",
    element: <CrearCursoPage />,
  },
  // ...más rutas
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  )
}

export default App;