import React from "react";
import '../../component-styles/BarraSuperior.css';


function BarraSuperior ({completarClase, claseClicked, cantCompletada, modulos}) {

  const calcularPorcentaje = () => {

    {let total = 0;
    modulos.forEach(modulo => {
      total += modulo.clases.length;
    });
    return Number(((cantCompletada / total) * 100).toFixed(1));
  }}

  return(
    <div className="barraSuperior d-flex justify-content-between align-items-center">
      <div>
        <p className= "texto">Tu progreso actual es del {calcularPorcentaje()}%</p>
        <p className= "textoChico">Progreso {calcularPorcentaje()}%</p>  
      </div>
      <div> 
        {!claseClicked.completado? 
        <button
        className="boton-completar"
        onClick={() => {
          completarClase()
        }}
        ><i className="check bi bi-check-circle"></i><p className="desaparecer">Marcar como completado</p></button> 
        :  <button
        className="boton-completar"
        onClick={() => {
          completarClase()
        }}
        ><i className="check bi bi-x-circle boton-grande"></i><p className="desaparecer">Desmarcar como completado</p></button>
        }
      </div>
        
    </div>
  )
}

export default BarraSuperior;