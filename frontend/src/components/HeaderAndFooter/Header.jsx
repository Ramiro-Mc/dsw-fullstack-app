import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../component-styles/Header.css";
import { useAuth } from "../../context/AuthContext.jsx";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/loginPage");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const logo = "/logo.png";

  return (
    <header className="contenedor-header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container-fluid top-bar align-items-center d-flex justify-content-between">
          
          <Link
            className="boton navbar-brand d-flex align-items-center"
            to="/"
            onClick={closeMenu}
          >
            <img className="logo" src={logo} alt="Logo de la página web" />
          </Link>

          
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          
          <div
            className={`collapse navbar-collapse justify-content-end ${
              isMenuOpen ? "show" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {user?.tipoUsuario !== "administrador" && (
                <>
                  <li className="nav-item">
                    <Link
                      className="boton nav-link fw-bold"
                      to="/profesores"
                      onClick={closeMenu}
                    >
                      Profesores
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="boton nav-link fw-bold"
                      to="/contacto"
                      onClick={closeMenu}
                    >
                      Contacto
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="boton nav-link fw-bold"
                      to="/sobreNosotros"
                      onClick={closeMenu}
                    >
                      Sobre Nosotros
                    </Link>
                  </li>
                </>
              )}

              {user ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link fw-bold dropdown-toggle"
                    to={
                      user.tipoUsuario === "administrador"
                        ? "/admin"
                        : "/MiPerfil"
                    }
                    onClick={closeMenu}
                  >
                    <i className="bi bi-person-circle"></i>
                    <span className="ms-1">{user.nombreUsuario}</span>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {user.tipoUsuario === "administrador" ? (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/admin"
                            onClick={closeMenu}
                          >
                            <i className="bi bi-shield-check"></i> Panel de
                            Admin
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            <i className="bi bi-door-open"></i> Cerrar sesión
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/MiPerfil"
                            onClick={closeMenu}
                          >
                            <i className="bi bi-person"></i> Mi perfil
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/MiPerfil/informacionDeCobro"
                            onClick={closeMenu}
                          >
                            <i className="bi bi-wallet2"></i> Informacion de
                            cobro
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/MiPerfil/misCursosComprados"
                            onClick={closeMenu}
                          >
                            <i className="bi bi-pencil-fill"></i> Cursos
                            Comprados
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/MiPerfil/misCursosCreados"
                            onClick={closeMenu}
                          >
                            <i className="bi bi-person-video3"></i> Cursos
                            Creados
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            <i className="bi bi-door-open"></i> Cerrar sesión
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              ) : (
                <li>
                  <Link
                    className="nav-link fw-bold"
                    to="/loginPage"
                    onClick={closeMenu}
                  >
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
