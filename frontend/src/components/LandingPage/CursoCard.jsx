import React from "react";
import "../../component-styles/LandingPage/CursoCard.css";
import { Link } from "react-router-dom";

function CursoCard({ idCurso, titulo, descripcion, imagen, precio, descuento }) {
  return (
    <div className="columna col-12 col-md-3 col-sm-6">
      <Link to={`/compraCurso/${idCurso}`} className="card-link">
        <div className="card">

          <img src={imagen} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="TituloCurso">{titulo}</p>
            <hr />
            <p className="card-text">{descripcion}</p>

            {descuento === 0 ? (
              <p className="precio fw-bold text-success mb-2 fs-4">${precio}</p>
            ) : (
              <div className="d-flex precio-conjunto">
                <p className="precio-tachado mb-2 ">${precio}</p>
                <p className=" fw-bold text-success mb-2 fs-4">${(precio - (precio * descuento) / 100).toFixed(0)}</p>
              </div>
            )}

          </div>
        </div>
      </Link>
    </div>
  );
}

export default CursoCard;
