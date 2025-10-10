import React from 'react';
import { Link } from 'react-router-dom';
import './AdminCursos.css';

const AdminCursos = () => {
  return (
    <div className="admin-cursos">
      <div className="cursos-container">
        <div className="cursos-header">
          <h1 className="cursos-title">Administración de Cursos</h1>
          <span className="cursos-subtitle">Gestiona las solicitudes y cursos del sistema</span>
        </div>

        <div className="cursos-content">
          <div className="cursos-menu">
            <div className="panel-header">
              <h3>Opciones de Gestión</h3>
            </div>
            <div className="panel-body">
              <Link to="/admin/cursos/pendientes" className="admin-link">
                 Solicitudes Pendientes
              </Link>
              
              <Link to="/admin/cursos/todos" className="admin-link">
                 Ver Todos los Cursos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCursos;