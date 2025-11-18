import React from "react";
import "../../component-styles/MiPerfil/CursoCardPerfil.css";
import { Link } from "react-router-dom";

function CursoCardPerfil({  titulo, descripcion, imagen, precio, descuento, editar, agregandoDesc, handleDescuentoChange, handleGuardar, eliminarDesc }) {
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
          {descuento === 0 ? (
            <p className="precio fw-bold text-success mb-2 fs-4">${precio}</p>
          ) : (
            <div className="d-flex">
              <p className="precio-tachado mb-2 ">${precio}</p>
              <p className="precio fw-bold text-success mb-2 fs-4">${(precio - (precio * descuento) / 100).toFixed(0)}</p>
            </div>
          )}

          {/* <Link to={`/editarCurso/${idCurso}`} className="btn btn-outline-warning btn-sm px-3">
            Editar
          </Link> */}

          <div className="separador">
            <p>Descuento</p>
          </div>

          {!agregandoDesc ? (
            descuento !== 0 ? (
              <div className="descuento-contenedor">
                <input type="text" disabled="true" value={descuento} />
                <button type="button" className="btn btn-danger eliminar" onClick={eliminarDesc}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            ) : (
              <button type="button" className="btn btn-warning" onClick={editar}>
                Agregar
              </button>
            )
          ) : (
            <div className="descuento-contenedor">
              <input type="text" onChange={handleDescuentoChange} />
              <button type="button" className="btn btn-success eliminar" onClick={handleGuardar}>
                <i className="bi bi-check2"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CursoCardPerfil;
