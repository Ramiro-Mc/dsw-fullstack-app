import React from 'react';
import './AdmUsuariosCard.css';

const AdmUsuariosCard = ({ usuario, onEliminar, onReactivar }) => {
  
  return (
    <div className={`usuario-card ${!usuario.activo ? 'usuario-inactivo' : ''}`}>
      <div className="card-header">
        <div className="usuario-info">
          <h3 className="usuario-nombre">
            {usuario.nombreUsuario}
            {!usuario.activo && <span className="badge-inactivo">Inactivo</span>}
          </h3>
          <p className="usuario-email">{usuario.email}</p>
        </div>
      </div>
      
      <div className="card-body">
        <div className="usuario-details">
          <div className="detail-item">
            <span className="label">ID:</span>
            <span className="value">#{usuario.idUsuario}</span>
          </div>
          <div className="detail-item">
            <span className="label">Registrado:</span>
            <span className="value">{new Date(usuario.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <span className="label">Estado:</span>
            <span className={`value ${usuario.activo ? 'estado-activo' : 'estado-inactivo'}`}>
              {usuario.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="card-actions">
        {usuario.activo ? (
          <button
            onClick={() => onEliminar(usuario.idUsuario, usuario.nombreUsuario)}
            className="btn-eliminar"
            disabled={usuario.tipoUsuario === 'administrador'}
          >
            {usuario.tipoUsuario === 'administrador'
              ? 'No se puede desactivar el Administrador'
              : 'Desactivar Usuario'
            }
          </button>
        ) : (
          <button
            onClick={() => onReactivar(usuario.idUsuario, usuario.nombreUsuario)}
            className="btn-reactivar"
          >
            Reactivar Usuario
          </button>
        )}
      </div>
    </div>
  );
};

export default AdmUsuariosCard;