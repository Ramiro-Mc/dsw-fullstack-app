import React from "react";
import "../../component-styles/LandingPage/CursoCard.css";

function CursoCard ({titulo, descripcion, imagen, precio}) {
  return(
  <div className="columna col-12 col-md-3 col-sm-6">
    <a href="curso.html" className="card" style={{ textDecoration: "none", color: "inherit" }}>
      <img src={imagen} className="card-img-top" alt="..." />
      <div className="card-body">
        <p className="TituloCurso">{titulo}</p>
        <p className="card-text">{descripcion}</p>
        <p className="precio">${precio}</p>
      </div>
    </a>
  </div>
  )
}

export default CursoCard;