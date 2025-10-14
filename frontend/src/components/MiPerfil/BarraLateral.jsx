import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../component-styles/MiPerfil/BarraLateral.css";

function BarraLateral() {
  const location = useLocation();

  // Función para determinar si un link está activo
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="Contenedor-barra">
        <Link to="/MiPerfil" className={`seccion ${isActive("/MiPerfil") ? "activo" : "no_activo"}`}>
          <i className="bi bi-person"></i> Informacion Personal
        </Link>
        <Link to="/MiPerfil/InformacionDePago" className={`seccion ${isActive("/MiPerfil/InformacionDePago") ? "activo" : "no_activo"}`}>
          <i className="bi bi-wallet2"></i> Informacion de Pago
        </Link>
        <Link to="/MiPerfil/MisCursos" className={`seccion ${isActive("/MiPerfil/MisCursos") ? "activo" : "no_activo"}`}>
          <i className="bi bi-person-video3"></i> Mis Cursos
        </Link>
        <Link to="/MiPerfil/Reportes" className={`seccion ${isActive("/MiPerfil/Reportes") ? "activo" : "no_activo"}`}>
          <i className="bi bi-newspaper"></i> Reportes
        </Link>
      </div>
      <div className="relleno"></div>
    </>
  );
}

export default BarraLateral;
