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
    const response = await fetch('/api/admin/usuarios'); // ← CAMBIO AQUÍ
    const data = await response.json();
    
    if (data.success) {
      setUsuarios(data.usuarios); // ← CAMBIO: 'contenido' por 'usuarios'
    } else {
      setError('Error al cargar los usuarios');
    }
  } catch (err) {
    console.error('Error:', err);
    setError('Error de conexión');
  } finally {
    setLoading(false);
  }
};

const handleEliminarUsuario = async (idUsuario, nombreUsuario) => {
  if (!window.confirm(`¿Estás seguro de ELIMINAR PERMANENTEMENTE al usuario "${nombreUsuario}"?\n\nEsta acción NO se puede deshacer.`)) {
    return;
  }

  try {
    const response = await fetch(`/api/admin/usuarios/${idUsuario}`, { // ← CAMBIO AQUÍ
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      setUsuarios(usuarios.filter(usuario => usuario.idUsuario !== idUsuario));
      alert('Usuario eliminado correctamente');
    } else {
      alert(data.message || 'Error al eliminar el usuario'); // ← CAMBIO: 'msg' por 'message'
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Error de conexión al eliminar');
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

  return (
    <div className="admin-usuarios">
      <div className="container">
        <div className="header">
          <h1>Administración de Usuarios</h1>
          <p className="subtitle">Total de usuarios: {usuarios.length}</p>
        </div>

        {usuarios.length === 0 ? (
          <div className="empty-state">
            <p>No hay usuarios disponibles</p>
          </div>
        ) : (
          <div className="usuarios-grid">
            {usuarios.map((usuario) => (
              <AdmUsuariosCard
                key={usuario.idUsuario}
                usuario={usuario}
                onEliminar={handleEliminarUsuario}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsuarios;