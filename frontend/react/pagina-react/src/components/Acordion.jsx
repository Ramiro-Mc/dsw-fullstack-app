import React from "react";
import '../styles/Acordion.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
    
function Acordion() {
  const modulos = [
    { titulo: "MÓDULO 0", clases: ["Clase 1", "Clase 2", "Clase 3"] },
    { titulo: "MÓDULO 1", clases: ["Clase 1", "Clase 2", "Clase 3"] },
    { titulo: "MÓDULO 2", clases: ["Clase 1", "Clase 2", "Clase 3"] },
    { titulo: "MÓDULO 3", clases: ["Clase 1", "Clase 2", "Clase 3"] },
    { titulo: "MÓDULO 4", clases: ["Clase 1", "Clase 2", "Clase 3"] }
  ];

  return (
    <main>
      <div className="container-fluid">
        <div className="row">

          {/* Sidebar */}
          <div className="col-3 bg-dark text-white overflow-auto">
            <div 
              className="accordion" 
              id="sidebarAccordion"
            >
              {modulos.map((modulo, index) => (
                <div className="accordion-item bg-dark" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-dark text-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#mod${index}`}
                    >
                      {modulo.titulo}
                    </button>
                  </h2>
                  <div
                    id={`mod${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#sidebarAccordion"  /* 👈 Esto hace que solo se abra uno */
                  >
                    <div className="accordion-body d-flex flex-column">
                      {modulo.clases.map((clase, i) => (
                        <a href="#" key={i}>
                          {clase}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="col-8 bg-light cont-principal">
            <h2>Contenido del módulo</h2>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Acordion;
