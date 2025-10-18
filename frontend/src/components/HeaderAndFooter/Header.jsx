import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import "../../component-styles/Header.css";
import { useAuth } from "../../context/AuthContext.jsx";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/loginPage");
  };

  return (
    <header className="contenedor-header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container-fluid top-bar align-items-center d-flex justify-content-between">
          {/* Logo */}
          <Link className="boton navbar-brand d-flex align-items-center" to="/">
            <img className="logo" src={logo} alt="Logo de la página web" />
          </Link>

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
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="boton nav-link fw-bold" to="/profesores">
                  Profesores
                </Link>
              </li>
              {user ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link fw-bold dropdown-toggle"
                    to="/MiPerfil"
                  >
                    <i className="bi bi-person-circle"></i>
                    <span className="ms-1">{user.nombreUsuario}</span>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/MiPerfil">
                        <i className="bi bi-person"></i> Mi perfil
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/MiPerfil/informacionDeCobro">
                        <i className="bi bi-wallet2"></i> Informacion de cobro
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/MiPerfil/misCursosComprados">
                        <i class="bi bi-pencil-fill"></i> Cursos Comprados
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/MiPerfil/misCursosCreados">
                        <i class="bi bi-person-video3"></i> Cursos Creados
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/MiPerfil/reportes">
                        <i className="bi bi-newspaper"></i> Reportes
                      </Link>
                    </li>

                    {user.tipoUsuario === "administrador" && (
                      <>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/admin">
                            Panel de Admin
                          </Link>
                        </li>
                      </>
                    )}

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i class="bi bi-door-open"></i> Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <Link className="nav-link fw-bold" to="/loginPage">
                    Iniciar sesión
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
