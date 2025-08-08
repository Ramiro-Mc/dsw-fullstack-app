import React from "react";
import '../styles/Modulo.css'; 

function ModuloItem({ modulo, index, AccordionId}) {
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
        <div className="accordion-body d-flex flex-column">
          {modulo.clases.map((clase, i) => (
            <a href="#" key={i}>
              <span className="nombre-clase">{clase}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModuloItem;
