import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si es administrador, redirigir a su panel
  if (user?.tipoUsuario === "administrador") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default AdminRoute;