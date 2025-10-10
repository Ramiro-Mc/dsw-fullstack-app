import React, { useState, useEffect } from 'react';
import CursoCard from '../../../components/CursoCard/CursoCard';
import './SolicitudesPendientes.css';

const SolicitudesPendientes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/cursos/pendientes');
      const data = await response.json();
      
      if (data.success) {
        setSolicitudes(data.informacion);
      } else {
        setError('Error al cargar las solicitudes');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };


  const handleAprobarCurso = async (idCurso, titulo) => {
    if (!window.confirm(`¿Aprobar el curso "${titulo}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/cursos/${idCurso}/aprobar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.success) {
      
        setSolicitudes(solicitudes.filter(curso => curso.idCurso !== idCurso));
        alert('Curso aprobado correctamente');
      } else {
        alert('Error al aprobar el curso');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error de conexión al aprobar');
    }
  };


  const handleRechazarCurso = async (idCurso, titulo) => {
    const motivo = window.prompt(`¿Por qué rechazar "${titulo}"?\n(Opcional - motivo del rechazo):`);
    
    
    if (motivo === null) return;

    try {
      const response = await fetch(`/api/admin/cursos/${idCurso}/rechazar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ motivo: motivo || 'Sin motivo especificado' })
      });

      const data = await response.json();

      if (data.success) {
        
        setSolicitudes(solicitudes.filter(curso => curso.idCurso !== idCurso));
        alert('Curso rechazado correctamente');
      } else {
        alert('Error al rechazar el curso');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error de conexión al rechazar');
    }
  };

  if (loading) {
    return (
      <div className="solicitudes-pendientes">
        <div className="container">
          <h1>Solicitudes Pendientes</h1>
          <div className="loading">
            <p>Cargando solicitudes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="solicitudes-pendientes">
        <div className="container">
          <h1>Solicitudes Pendientes</h1>
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={fetchSolicitudes} className="retry-btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

return (
    <div className="solicitudes-pendientes">
      <div className="container">
        <div className="header">
          <h1>Solicitudes Pendientes</h1>
          <p className="subtitle">
            {solicitudes.length === 0 
              ? 'No hay solicitudes pendientes' 
              : `${solicitudes.length} solicitud${solicitudes.length !== 1 ? 'es' : ''} pendiente${solicitudes.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        {solicitudes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>¡Todo al día!</h3>
            <p>No hay solicitudes de cursos pendientes de revisión</p>
          </div>
        ) : (
          <div className="solicitudes-grid">
            {solicitudes.map((curso) => (
              <CursoCard
                key={curso.idCurso}
                curso={curso}
                variant="pendiente"
                actions={[
                  {
                    label: '✓ Aprobar',
                    className: 'btn-aprobar',
                    onClick: () => handleAprobarCurso(curso.idCurso, curso.titulo)
                  },
                  {
                    label: '✗ Rechazar',
                    className: 'btn-rechazar',
                    onClick: () => handleRechazarCurso(curso.idCurso, curso.titulo)
                  }
                ]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitudesPendientes;