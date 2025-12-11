
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './AdminDashboard.css';
const AdminDashboard = () => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalCursos: 0,
    totalUsuarios: 0,
    totalCreadores: 0,
    ventasTotales: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchStats = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      

      
      const response = await fetch('http://localhost:3000/api/admin/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Datos recibidos:', data); 
      
      if (data.success) {
        setStats(data.stats);
      } else {
        setError('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      setError('Error al cargar las estadísticas: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, []); 


  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="admin-header">
          <h1 className="admin-title">Panel de Administración</h1>
          <span className="welcome-text">Bienvenido, {user?.nombreUsuario}</span>
        </div>

        <div className="dashboard-content">
          <div className="admin-menu">
            <div className="panel-header">
              <h3>Gestión</h3>
            </div>
            <div className="panel-body">
              <Link to="/admin/cursos" className="admin-link">
                Gestionar Cursos
              </Link>
              <Link to="/admin/usuarios" className="admin-link">
                Gestionar Usuarios
              </Link>
            </div>
          </div>

          <div className="admin-stats">
            <div className="panel-header">
              <h3>Estadísticas</h3>
            </div>
            <div className="panel-body">
              {loading ? (
                <div className="loading-stats">
                  <p>Cargando estadísticas...</p>
                </div>
              ) : error ? (
                <div className="error-stats">
                  <p>Error: {error}</p>
                  <button onClick={fetchStats} className="retry-btn">
                    Reintentar
                  </button>
                </div>
              ) : (
                <div className="stats-grid">
                  <div className="stat-card">
                    <h5 className="stat-title">Total Cursos</h5>
                    <p className="stat-number">{stats.totalCursos || 0}</p>
                  </div>
                  <div className="stat-card">
                    <h5 className="stat-title">Total Usuarios</h5>
                    <p className="stat-number">{stats.totalUsuarios || 0}</p>
                  </div>
                  <div className="stat-card">
                    <h5 className="stat-title">Total Creadores</h5>
                    <p className="stat-number">{stats.totalCreadores || 0}</p>
                  </div>
                  <div className="stat-card">
                    <h5 className="stat-title">Ventas Totales</h5>
                    <p className="stat-number">
                      ${(stats.ventasTotales || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;