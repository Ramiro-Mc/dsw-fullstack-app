import React, { useState, useEffect } from 'react';
import AdmUsuariosCard from '../../components/AdmUsuariosCard/AdmUsuariosCard';
import './AdminUsuarios.css';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      // Incluir usuarios inactivos para poder mostrarlos y reactivarlos
      const response = await fetch('http://localhost:3000/usuarios?includeInactivos=true'); 
      const data = await response.json();
      
      if (data.success) {
        setUsuarios(data.contenido || []); 
      } else {
        setError('Error al cargar los usuarios');
        setUsuarios([]);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarUsuario = async (idUsuario, nombreUsuario) => {
    if (!window.confirm(`¿Estás seguro de desactivar al usuario "${nombreUsuario}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Actualizar el estado del usuario en lugar de eliminarlo
        setUsuarios(usuarios.map(usuario => 
          usuario.idUsuario === idUsuario 
            ? { ...usuario, activo: false }
            : usuario
        ));
        alert('Usuario desactivado correctamente');
      } else {
        alert(data.msg || 'Error al desactivar el usuario'); 
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error de conexión al desactivar');
    }
  };

  const handleReactivarUsuario = async (idUsuario, nombreUsuario) => {
    if (!window.confirm(`¿Estás seguro de reactivar al usuario "${nombreUsuario}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${idUsuario}/reactivar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Actualizar el estado del usuario
        setUsuarios(usuarios.map(usuario => 
          usuario.idUsuario === idUsuario 
            ? { ...usuario, activo: true }
            : usuario
        ));
        alert('Usuario reactivado correctamente');
      } else {
        alert(data.msg || 'Error al reactivar el usuario');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error de conexión al reactivar');
    }
  };

  if (loading) {
    return (
      <div className="admin-usuarios">
        <div className="container">
          <h1>Administración de Usuarios</h1>
          <div className="loading">
            <p>Cargando usuarios...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-usuarios">
        <div className="container">
          <h1>Administración de Usuarios</h1>
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={fetchUsuarios} className="retry-btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const usuariosActivos = usuarios?.filter(u => u.activo).length || 0;
  const usuariosInactivos = usuarios?.filter(u => !u.activo).length || 0;

  return (
    <div className="admin-usuarios">
      <div className="container">
        <div className="header">
          <h1>Administración de Usuarios</h1>
          <p className="subtitle">
            Total: {usuarios?.length || 0} usuarios 
            ({usuariosActivos} activos, {usuariosInactivos} inactivos)
          </p>
        </div>

        {(usuarios?.length || 0) === 0 ? (
          <div className="empty-state">
            <p>No hay usuarios disponibles</p>
          </div>
        ) : (
          <div className="usuarios-grid">
            {usuarios?.map((usuario) => (
              <AdmUsuariosCard
                key={usuario.idUsuario}
                usuario={usuario}
                onEliminar={handleEliminarUsuario}
                onReactivar={handleReactivarUsuario}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsuarios;