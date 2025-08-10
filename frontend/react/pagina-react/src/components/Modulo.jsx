import React from "react";
import '../styles/Modulo.css'; 

function ModuloItem({ modulo, index, AccordionId, manejarClick }) {
  return (
    <div className="accordion-item bg-dark" style={{ border: 'none' }}>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed bg-dark text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#modulo${index}`}
        >
          <span className="titulo">{modulo.titulo}</span>
          <span className="titulo-corto">MOD{index + 1}</span>
         
        </button>
      </h2>
      <div
        id={`modulo${index}`}
        className="accordion-collapse collapse"
        data-bs-parent={`#${AccordionId}`}
      >
        <div className="accordion-body">
              {modulo.clases.map((clase, i) => (
                <a 
                  href="#" 
                  key={i}
                  onClick={(e) => {
                    e.preventDefault(); //prevenir el comportamiento por defecto del enlace
                    manejarClick(clase);
                  }}
                  className="clase-item"
                >
                  <span className="nombre-clase">{clase.tituloClase}</span>
                  <span className="icono-check">

                      {clase.completado ? <i style={{ color: 'green' }} className=" bi bi-check-circle"></i>
                      : <i style={{ color: 'red' }} className=" bi bi-check-circle-fill"></i>
                    }
                  </span>
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}

export default ModuloItem;
