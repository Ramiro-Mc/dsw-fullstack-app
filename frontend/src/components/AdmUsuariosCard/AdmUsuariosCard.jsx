import React from 'react';
import './AdmUsuariosCard.css';



const AdmUsuariosCard = ({ usuario, onEliminar }) => {
  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'administrador': return 'admin';
      case 'creador': return 'creator';
      case 'estudiante': return 'student';
      default: return 'default';
    }
  };

  return (
    <div className="usuario-card">
      <div className="card-header">
        <div className="usuario-info">
          <h3 className="usuario-nombre">{usuario.nombreUsuario}</h3>
          <p className="usuario-email">{usuario.email}</p>
        </div>
        <div className="badges">
          <span className={`tipo-badge ${getTipoColor(usuario.tipoUsuario)}`}>
            {usuario.tipoUsuario}
          </span>
        </div>
      </div>
      
      <div className="card-body">
        <div className="usuario-details">
          <div className="detail-item">
            <span className="label">ID:</span>
            <span className="value">#{usuario.idUsuario}</span>
          </div>
          <div className="detail-item">
            <span className="label">Tipo:</span>
            <span className="value">{usuario.tipoUsuario}</span>
          </div>
          <div className="detail-item">
            <span className="label">Registrado:</span>
            <span className="value">{new Date(usuario.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="card-actions">
        <button
          onClick={() => onEliminar(usuario.idUsuario, usuario.nombreUsuario)}
          className="btn-eliminar"
          disabled={usuario.tipoUsuario === 'administrador'}
        >
          {usuario.tipoUsuario === 'administrador'
            ? 'No se puede eliminar'
            : 'Eliminar Usuario'
          }
        </button>
      </div>
    </div>
  );
};

export default AdmUsuariosCard;