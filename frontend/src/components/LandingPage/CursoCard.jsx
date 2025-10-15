import React from "react";
import "../../component-styles/LandingPage/CursoCard.css";
import { Link } from "react-router-dom";

function CursoCard({ idCurso, titulo, descripcion, imagen, precio }) {
  return (
    <div className="columna col-12 col-md-3 col-sm-6">
      <Link to={`/compraCurso/${idCurso}`} className="card-link">
        <div className="card">
          {" "}
          {/* ← AGREGAR div con clase card */}
          <img src={imagen} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="TituloCurso">{titulo}</p>
            <hr />
            <p className="card-text">{descripcion}</p>
            <p className="precio">${precio}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CursoCard;
