import React from 'react';
import './AdmCursoCard.css';

const AdmCursoCard = ({ 
  curso, 
  showActions = true, 
  actions = [], 
  variant = 'default' 
}) => {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'aprobado': return 'success';
      case 'pendiente': return 'warning';
      case 'rechazado': return 'danger';
      default: return 'secondary';
    }
  };

  const getCardClass = () => {
    const baseClass = 'curso-card';
    switch (variant) {
      case 'pendiente':
        return `${baseClass} ${baseClass}--pendiente`;
      case 'admin':
        return `${baseClass} ${baseClass}--admin`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={getCardClass()}>
      <div className="card-header">
        <h3 className="curso-titulo">{curso.titulo}</h3>
        <span className={`estado-badge ${getEstadoColor(curso.estado)}`}>
          {curso.estado}
        </span>
      </div>
      
      <div className="card-body">
        <p className="curso-descripcion">
          {curso.descripcion || 'Sin descripción'}
        </p>
        
        {variant === 'pendiente' ? (
          <div className="curso-details">
            <div className="detail-item">
              <span className="label">Precio:</span>
              <span className="value precio">${curso.precio?.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="label">Tipo:</span>
              <span className="value">
                {curso.TipoCurso?.nombreTipo || 'Sin tipo'}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Fecha de solicitud:</span>
              <span className="value">{new Date(curso.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="curso-info">
            <div className="precio">
              <strong>${curso.precio?.toLocaleString()}</strong>
            </div>
            <div className="fechas">
              <small>Creado: {new Date(curso.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        )}
      </div>
      
      {showActions && actions.length > 0 && (
        <div className="card-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={action.className}
              disabled={action.disabled || false}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdmCursoCard;