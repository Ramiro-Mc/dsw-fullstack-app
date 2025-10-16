import React from "react";
import "../../component-styles/MiPerfil/CursoCardPerfil.css";
import { Link } from "react-router-dom";

function CursoCardPerfil({ idCurso, titulo, descripcion, imagen, precio }) {
  return (
    <div className="card mb-3 curso-creado">
      <div className="row g-0 h-100">
        <div className="col-md-3">
          <img src={imagen} className="img-fluid rounded-start h-100 w-100" alt={titulo} style={{ objectFit: "cover" }} />
        </div>
        <div className="col-md-7">
          <div className="card-body h-100 d-flex flex-column justify-content-center">
            <h5 className="card-title TituloCurso mb-2">{titulo}</h5>
            <p className="card-text text-muted">{descripcion}</p>
          </div>
        </div>
        <div className="col-md-2 d-flex flex-column align-items-center justify-content-center sector-precio">
          <p className="precio fw-bold text-success mb-2 fs-4">${precio}</p>
          <Link to={`/editarCurso/${idCurso}`} className="btn btn-outline-warning btn-sm px-3">
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CursoCardPerfil;
