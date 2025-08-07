import React from "react";
import '../styles/Modulo.css'; 

function ModuloItem({ titulo, clases, index, AcordionId}) {
  return (
    <div className="accordion-item bg-dark">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed bg-dark text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#modulo${index}`}
        >
          {titulo}
        </button>
      </h2>
      <div
        id={`modulo${index}`}
        className="accordion-collapse collapse"
        data-bs-parent={`#${AcordionId}`}
      >
        <div className="accordion-body d-flex flex-column">
          {clases.map((clase, i) => (
            <a href="#" key={i}>
              {clase}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModuloItem;
