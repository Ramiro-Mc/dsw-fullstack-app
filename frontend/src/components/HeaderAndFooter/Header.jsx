import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png"; // si lo pones en public, lo accedes así
import "../../styles/Header.css";

function Header() {
  return (
    <header className="contenedor-header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container-fluid top-bar align-items-center d-flex justify-content-between">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img className="logo" src={logo} alt="Logo de la página web" />
          </Link>

          {/* Botón hamburguesa */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú de navegación */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link className="nav-link fw-bold dropdown-toggle" to="/MiPerfil" >
                  <i className="bi bi-person-circle"></i>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/MiPerfil">
                      Mi perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/course">
                      Mis Cursos
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" to="/loginPage">
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
