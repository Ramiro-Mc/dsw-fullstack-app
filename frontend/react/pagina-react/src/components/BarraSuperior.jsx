import React from "react";
import '../styles/BarraSuperior.css';


function BarraSuperior ({completarClase,clase, claseClicked}) {
    
  return(
      
    <div className="barraSuperior d-flex justify-content-between align-items-center">
      <button>
      <i className="bi bi-arrow-left-circle"></i>
      </button>
      
      <div>
        <p className= "texto">Tu progreso actual es del %</p> 
      </div>
      
      <div> 
        {!claseClicked.completado? 
        <button
        onClick={() => {
          completarClase(clase)
        }}
        ><i className="check bi bi-check-circle"></i>Marcar como completado</button> 
        :  <button
        onClick={() => {
          completarClase(clase)
        }}
        ><i className="check bi bi-check-circle"></i>Desmarcar como completado</button>}
      </div>
        
    </div>
  )
}

export default BarraSuperior;