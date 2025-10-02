import React from "react";
import '../../component-styles/Modulo.css'; 

function ModuloItem({ modulo, index, AccordionId, manejarClick, claseClicked }) {
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

                  <span className="nombre-clase">
                    {clase.idClase === claseClicked.idClase?
                    <h6 className="clicked">{clase.tituloClase}</h6> 
                    : <h6 className="noClicked">{clase.tituloClase}</h6>
                      }
                    </span>
                    
                  <span className="icono-check">
                      {clase.completado ? <i className=" bi bi-check-circle-fill completado"></i>
                      : <i class="bi bi-circle noCompletado"></i>
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
