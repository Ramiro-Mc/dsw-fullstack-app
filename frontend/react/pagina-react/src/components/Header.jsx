import React from 'react';
import logo from '../../../../imagenes/logo.png'; // si lo pones en public, lo accedes así

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="index.html">
          <img 
            src={logo} 
            alt="Logo de la página web" 
            style={{ height: '40px' }}
          />
        </a>

        {/* Botón hamburguesa */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#">Cerrar Sesión</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Header;
