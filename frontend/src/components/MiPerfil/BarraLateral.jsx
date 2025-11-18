import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../component-styles/MiPerfil/BarraLateral.css";
import { useAuth } from "../../context/AuthContext.jsx";

function BarraLateral() {
  const location = useLocation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { logout } = useAuth();

  // Función para determinar si un link está activo
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="Contenedor-barra">
        <Link to="/MiPerfil" className={`seccion ${isActive("/MiPerfil") ? "activo" : "no_activo"}`}>
          <i className="bi bi-person"></i> Informacion Personal
        </Link>

        <Link to="/MiPerfil/InformacionDeCobro" className={`seccion ${isActive("/MiPerfil/InformacionDeCobro") ? "activo" : "no_activo"}`}>
          <i className="bi bi-wallet2"></i> Informacion de Cobro
        </Link>

        {/* Acordeón manual */}
        <div className="opciones">
          <button className="seccion no_activo" onClick={toggleAccordion}>
            <i className="bi bi-person-video3 me-2"></i>
            Mis Cursos
            <i className={`bi bi-chevron-${isAccordionOpen ? "up" : "down"} ms-auto`}></i>
          </button>

          {isAccordionOpen && (
            <div className="accordion-content">
              <Link to="/MiPerfil/MisCursosComprados" className={`subseccion ${isActive("/MiPerfil/MisCursosComprados") ? "activo" : "no_activo"}`}>
                <i class="bi bi-pencil-fill"></i> Mis Cursos Comprados
              </Link>
              <Link to="/MiPerfil/MisCursosCreados" className={`subseccion ${isActive("/MiPerfil/MisCursosCreados") ? "activo" : "no_activo"}`}>
                <i class="bi bi-person-video3"></i> Mis Cursos Creados
              </Link>
            </div>
          )}
        </div>

        <Link to="/MiPerfil/Reportes" className={`seccion ${isActive("/MiPerfil/Reportes") ? "activo" : "no_activo"}`}>
          <i className="bi bi-newspaper"></i> Reportes
        </Link>

        <Link to="/loginPage" onClick={handleLogout} className={`seccion cerrarSesion`}>
          <i class="bi bi-door-open"></i> Cerrar sesión
        </Link>
        
                    
      </div>
      <div className="relleno"></div>
    </>
  );
}

export default BarraLateral;
