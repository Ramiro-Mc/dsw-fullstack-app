import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, requiredRole }) {
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

  // Si no está autenticado, redirigir a login
  if (!user) {
    return <Navigate to="/loginPage" replace />;
  }

  // Si es admin intentando acceder a rutas de usuario, redirigir a admin
  if (user.tipoUsuario === "administrador" && !requiredRole) {
    return <Navigate to="/admin" replace />;
  }

  // Si requiere rol específico y no lo tiene, redirigir
  if (requiredRole && user.tipoUsuario !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;