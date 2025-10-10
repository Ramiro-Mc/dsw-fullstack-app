import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/loginPage" replace />;
  }

  if (requiredRole && user.tipoUsuario !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

//Este archivo 
// se usa para proteger rutas que requieren autenticación 
// y/o un rol específico. Si el usuario no está autenticado, 
// se redirige al login. Si no tiene el rol requerido, 
// se redirige a la página principal. Si todo está bien, 
// se renderizan los componentes hijos (children).