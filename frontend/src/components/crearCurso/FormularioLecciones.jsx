import { useState, useRef } from "react";
import ListaLecciones from "../crearCurso/ListaLecciones";
import FormularioLeccion from "../crearCurso/FormularioLeccion";

function FormularioLecciones({ 
  modulo, 
  nombreModulo, 
  setNombreModulo, 
  editandoModulo, 
  onFinalizarModulo, 
  onCancelar 
}) {
  const [leccionesDelModulo, setLeccionesDelModulo] = useState(modulo.lecciones || []);
  const [editandoLeccion, setEditandoLeccion] = useState(null);
  
  // Referencia para el formulario de lección
  const formularioLeccionRef = useRef(null);

  const handleGuardarLeccion = (leccionData) => {
    if (editandoLeccion) {
      const leccionActualizada = { ...editandoLeccion, ...leccionData };
      setLeccionesDelModulo(prev => 
        prev.map(leccion => 
          leccion.id === editandoLeccion.id ? leccionActualizada : leccion
        )
      );
      alert(`Lección "${leccionData.tituloLec}" actualizada`);
      setEditandoLeccion(null);
    } else {
      const nuevaLeccion = { id: Date.now(), ...leccionData };
      setLeccionesDelModulo(prev => [...prev, nuevaLeccion]);
      alert(`Lección "${leccionData.tituloLec}" agregada al módulo`);
    }

    // Desplazar al principio del formulario de lección
    if (formularioLeccionRef.current) {
      formularioLeccionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handleEditarLeccion = (leccion) => {
    setEditandoLeccion(leccion);
    
    // También desplazar cuando se edita una lección
    setTimeout(() => {
      if (formularioLeccionRef.current) {
        formularioLeccionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const handleEliminarLeccion = (leccionId) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta lección?")) {
      setLeccionesDelModulo(prev => prev.filter(leccion => leccion.id !== leccionId));
    }
  };

  const handleCancelarEdicion = () => {
    setEditandoLeccion(null);
  };

  const handleFinalizarModulo = () => {
    if (leccionesDelModulo.length === 0) {
      alert("Debe agregar al menos una lección al módulo");
      return;
    }

    // Usar nombreModulo del estado en lugar de modulo.nombre
    const nombreFinal = editandoModulo ? nombreModulo : modulo.nombre;

    const moduloCompleto = {
      ...modulo,
      nombre: nombreFinal,
      lecciones: leccionesDelModulo
    };

    onFinalizarModulo(moduloCompleto);
  };

  return (
    <div className="mt-4 p-3 rounded container-modulos">
      <h4>
        {editandoModulo ? 'Editar' : 'Agregar Lección al Módulo'}: {nombreModulo || modulo.nombre}
      </h4>
      <hr />

      {editandoModulo && (
        <>
          <p>Nombre del módulo:</p>
          <div className="input-group mb-3">
            <input 
              type="text" 
              className="form-control" 
              value={nombreModulo}
              onChange={e => setNombreModulo(e.target.value)}
            />
          </div>
        </>
      )}
      
      <ListaLecciones
        lecciones={leccionesDelModulo}
        onEditarLeccion={handleEditarLeccion}
        onEliminarLeccion={handleEliminarLeccion}
      />

      {/* Agregar la referencia aquí */}
      <div ref={formularioLeccionRef}>
        <FormularioLeccion
          leccionEditando={editandoLeccion}
          moduloId={modulo.id}
          onGuardarLeccion={handleGuardarLeccion}
          onCancelarEdicion={handleCancelarEdicion}
        />
      </div>

      <div className="d-flex gap-2 mt-3">
        <button 
          type="button" 
          className="btn cancelar"
          onClick={onCancelar}
        >
          <i className="bi bi-x-circle"></i> Cancelar
        </button>
      </div>
      
      <div className="mt-3 container-finalizar">
        <button 
          type="button" 
          className="btn finalizar"
          onClick={handleFinalizarModulo}
        >
          <i className="bi bi-check-circle"></i> 
          {editandoModulo ? ' Actualizar' : ' Finalizar'} Módulo
        </button>
      </div>
    </div>
  );
}

export default FormularioLecciones;