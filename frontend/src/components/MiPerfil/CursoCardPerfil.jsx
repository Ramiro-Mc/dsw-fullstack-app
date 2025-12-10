import React from "react";
import "../../component-styles/MiPerfil/CursoCardPerfil.css";
import { Link } from "react-router-dom";

function CursoCardPerfil({
  idCurso,
  titulo,
  descripcion,
  imagen,
  precio,
  descuento,
  estado,
  editar,
  agregandoDesc,
  handleDescuentoChange,
  handleGuardar,
  eliminarDesc,
}) {
  return (
    <div className="card mb-3 curso-creado">
      <div className="row g-0 h-100">
        <div className="col-12 col-md-3">
          <img
            src={imagen}
            className="img-fluid rounded-start h-100 w-100 img-curso"
            alt={titulo}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-md-7">
          <div className="card-body h-100 d-flex flex-column justify-content-center">
            <h5 className="card-title TituloCurso mb-2">{titulo}</h5>
            <p className="card-text text-muted">{descripcion}</p>

            {/* Botón de editar curso */}
            <div className="mt-2">
              <Link
                to={`/editarCurso/${idCurso}`}
                className="btn btn-outline-primary btn-sm"
              >
                <i className="bi bi-pencil-square me-1"></i>
                Editar curso
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-2 d-flex flex-column align-items-center justify-content-center sector-precio py-3 py-md-0">
          <div className="estado mb-2 mb-md-0">
            {estado === "aprobado" ? (
              <span className="badge bg-success">Aprobado</span>
            ) : estado === "rechazado" ? (
              <span className="badge bg-danger">Rechazado</span>
            ) : (
              <span className="badge bg-warning text-dark">Pendiente</span>
            )}
          </div>
          <Link to={`/foro/${idCurso}`} className="btn-foro btn-foro-curso-creado" title="Ir al foro del curso">
            <i className="bi bi-chat-dots"></i> Ver Foro
          </Link>
          <hr
            className="d-none d-md-block"
            style={{
              color: "black",
              width: "80%",
              margin: "30px 10px 10px 10px",
              height: "1px",
            }}
          />

          {descuento === 0 ? (
            <p className="precio fw-bold text-success mb-2 fs-4">${precio}</p>
          ) : (
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
              <p className="precio-tachado mb-0">${precio}</p>
              <p className="precio fw-bold text-success mb-0 fs-4">
                ${(precio - (precio * descuento) / 100).toFixed(0)}
              </p>
            </div>
          )}

          {!agregandoDesc ? (
            descuento !== 0 ? (
              <div className="descuento-contenedor mt-2">
                <input type="text" disabled="true" value={descuento} />
                <button
                  type="button"
                  className="btn btn-danger eliminar"
                  onClick={eliminarDesc}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-warning mb-2"
                onClick={editar}
              >
                Agregar Descuento
              </button>
            )
          ) : (
            <div className="descuento-contenedor mt-2">
              <input
                type="text"
                placeholder="%"
                onChange={handleDescuentoChange}
              />
              <button
                type="button"
                className="btn btn-success eliminar"
                onClick={handleGuardar}
              >
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
