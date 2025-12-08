import React, { useEffect } from "react";
import "../component-styles/ModalProfesor.css";

function ModalProfesor({ nombre, foto, desc, frase, educ, fecha, mostrar, correo }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="modal-overlay" onClick={mostrar}>
        <div className="mi-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="d-flex">
              <img src={foto || "/Default.jpg"} alt="Foto de perfil" className="img-fluid rounded-circle foto-preview borde-naranja" />
              <div className="ms-3">
                <p className="nombre">
                  {nombre} <a href={`mailto:${correo}`}>{correo}</a>
                </p>
                <p className="frase">"{frase}"</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="modal-body">
            <strong>Descripción</strong>
            <div className="informacion-prof">{desc}</div>
            <strong>Educación</strong>
            <div className="informacion-prof">{educ}</div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <p className="fecha-creacion-cuenta fecha-preview">Se unió el {new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(new Date(fecha))}</p>
            <button type="button" className="btn btn-secondary btn-cerrar" onClick={mostrar}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalProfesor;
