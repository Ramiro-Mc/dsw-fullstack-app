import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../component-styles/MiPerfil/BarraLateral.css";
import { useAuth } from "../../context/AuthContext.jsx";

function BarraLateral({ onClose }) {
  const location = useLocation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <div className="Contenedor-barra">
        <Link to="/MiPerfil" className={`seccion ${isActive("/MiPerfil") ? "activo" : "no_activo"}`} onClick={handleLinkClick}>
          <i className="bi bi-person"></i>
          <span>Informacion Personal</span>
        </Link>

        <Link to="/MiPerfil/InformacionDeCobro" className={`seccion ${isActive("/MiPerfil/InformacionDeCobro") ? "activo" : "no_activo"}`} onClick={handleLinkClick}>
          <i className="bi bi-wallet2"></i>
          <span>Informacion de Cobro</span>
        </Link>

        <div className="opciones">
          <button className="seccion no_activo" onClick={toggleAccordion}>
            <i className="bi bi-person-video3 me-2"></i>
            <span>Mis Cursos</span>
            <i className={`bi bi-chevron-${isAccordionOpen ? "up" : "down"} ms-auto`}></i>
          </button>

          {isAccordionOpen && (
            <div className="accordion-content">
              <Link to="/MiPerfil/MisCursosComprados" className={`subseccion ${isActive("/MiPerfil/MisCursosComprados") ? "activo" : "no_activo"}`} onClick={handleLinkClick}>
                <i className="bi bi-bag-check-fill"></i>
                <span>Mis Cursos Comprados</span>
              </Link>
              <Link to="/MiPerfil/MisCursosCreados" className={`subseccion ${isActive("/MiPerfil/MisCursosCreados") ? "activo" : "no_activo"}`} onClick={handleLinkClick}>
                <i className="bi bi-person-video3"></i>
                <span>Mis Cursos Creados</span>
              </Link>
            </div>
          )}
        <Link to="/loginPage" onClick={handleLogout} className="seccion cerrarSesion">
          <i className="bi bi-door-open"></i>
          <span>Cerrar sesión</span>
        </Link>
        </div>

      </div>
      <div className="relleno"></div>
    </>
  );
}

export default BarraLateral;
