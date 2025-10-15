// import { useEffect } from 'react';

function FormularioCurso({ 
  nombreCurso, 
  setNombreCurso, 
  descripcionCurso, 
  setDescripcionCurso, 
  precioCurso, 
  setPrecioCurso,
  moduloSeleccionado,
  setModuloSeleccionado,
  modulos,
  // cargarTiposCurso
}) {

  // useEffect(() => {
  //   cargarTiposCurso();
  // }, [cargarTiposCurso]);

  return (
    <div>
      <div>
        <p>Seleccione una categoria</p>                
        <select
          name="seccion"
          id="seccion"
          className="form-select"
          value={moduloSeleccionado}
          onChange={e => setModuloSeleccionado(e.target.value)}
          required
        >
          <option value="">Elegir...</option>
          {modulos.map(tipo => (
            <option key={tipo.idTipo} value={tipo.idTipo} className="form-select-option">{tipo.nombreTipo}</option>
          ))}
        </select>
      </div>
      
      <p>Ingrese el nombre del curso:</p>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={nombreCurso}
          onChange={e => setNombreCurso(e.target.value)}
          required
        />
      </div>
      
      <p>Ingrese una descripcion breve:</p>
      <div className="form-floating">
        <textarea 
          className="form-control" 
          placeholder="Descripción del curso" 
          id="floatingTextarea"
          value={descripcionCurso}
          onChange={e => setDescripcionCurso(e.target.value)}
          required
        ></textarea>
      </div>
      
      <p>Ingrese el precio:</p>
      <div className="input-group mb-3">
        <input 
          type="number" 
          className="form-control" 
          value={precioCurso}
          onChange={e => setPrecioCurso(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default FormularioCurso;