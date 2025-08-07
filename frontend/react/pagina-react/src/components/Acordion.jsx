import React from "react";
import '../styles/Acordion.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modulo from './Modulo';
    
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
              id="Acordion"
            >
              {modulos.map((modulo, index) => (
                <Modulo
                  key={index}
                  titulo={modulo.titulo}
                  clases={modulo.clases}
                  index={index}
                  AcordionId="Acordion"
                />
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
