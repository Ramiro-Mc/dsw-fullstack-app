import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminDashboard = () => {
  const { user, logout } = useAuth();


  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <div className="admin-info">
          <span>Bienvenido, {user?.nombreUsuario}</span>
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-menu">
          <h2>Gestión</h2>
          <nav>
            <Link to="/admin/cursos" className="admin-link">
              Gestionar Cursos
            </Link>
            {/* <Link to="/admin/usuarios" className="admin-link">
              Gestionar Usuarios
            </Link>
            <Link to="/admin/descuentos" className="admin-link">
              Gestionar Descuentos
            </Link> */}
          </nav>
        </div>

        <div className="admin-stats">
          <h2>Estadísticas</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Cursos</h3>
              <p className="stat-number">25</p>
            </div>
            <div className="stat-card">
              <h3>Total Usuarios</h3>
              <p className="stat-number">150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;