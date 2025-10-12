import React from "react";
import { Link } from "react-router-dom";
import "../../component-styles/MiPerfil/BarraLateral.css";

function BarraLateral() {
  return (
    <div className="Contenedor-barra">
      <Link to="/MiPerfil" className="seccion">
        <i className="bi bi-person"></i> Informacion Personal
      </Link>
      <Link to="/MiPerfil/InformacionDePago" className="seccion">
        <i className="bi bi-wallet2"></i> Informacion de Pago
      </Link>
      <Link to="/MiPerfil/MisCursos" className="seccion">
        <i className="bi bi-person-video3"></i> Mis Cursos
      </Link>
      <Link to="/MiPerfil/Reportes" className="seccion">
        <i className="bi bi-newspaper"></i> Reportes
      </Link>
    </div>
  );
}

export default BarraLateral;
