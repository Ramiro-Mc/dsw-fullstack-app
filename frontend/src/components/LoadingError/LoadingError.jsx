import React from "react";

const LoadingError = ({ loading, error, retry }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h4>Error</h4>
        <p>{error}</p>
        {retry && (
          <button onClick={retry} className="btn-retry">
            Reintentar
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default LoadingError;
