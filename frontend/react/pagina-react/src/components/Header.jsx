import React from 'react';
import logo from '../../public/logo.png'; // si lo pones en public, lo accedes así
import '../styles/Header.css'; 


function Header() {
  return (
    <header className="contenedor-header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container-fluid top-bar align-items-center d-flex justify-content-between">
          
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="index.html">
            <img 
              className="logo"
              src={logo} 
              alt="Logo de la página web" 
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
    </header>
  );
}

export default Header;
