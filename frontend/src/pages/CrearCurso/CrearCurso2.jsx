import { useState } from "react";
import "./CrearCurso2.css";

function CrearCursoPage2() {
  const [moduloSeleccionado, setModuloSeleccionado] = useState("");
  const [mostrarFormularioModulo, setMostrarFormularioModulo] = useState(false);
  const [mostrarFormularioLecciones, setMostrarFormularioLecciones] = useState(false);
  
  // Estados para el curso
  const [nombreCurso, setNombreCurso] = useState("");
  const [descripcionCurso, setDescripcionCurso] = useState("");
  const [precioCurso, setPrecioCurso] = useState("");
  
  // Estados para módulo
  const [nombreModulo, setNombreModulo] = useState("");
  const [moduloActual, setModuloActual] = useState(null);
  const [modulosGuardados, setModulosGuardados] = useState([]);
  const [editandoModulo, setEditandoModulo] = useState(null);
  
  // Estados para lección
  const [tituloLeccion, setTituloLeccion] = useState("");
  const [descripcionLeccion, setDescripcionLeccion] = useState("");
  const [estadoLeccion, setEstadoLeccion] = useState("");
  const [horasLeccion, setHorasLeccion] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [contenidoTexto, setContenidoTexto] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [archivoUrl, setArchivoUrl] = useState("");
  const [leccionesDelModulo, setLeccionesDelModulo] = useState([]);
  const [editandoLeccion, setEditandoLeccion] = useState(null);

  // Opciones de módulos (puedes traerlas de un backend si quieres)
  const modulos = [
    { id: 1, nombre: "Programación" },
    { id: 2, nombre: "Diseño" },
    { id: 3, nombre: "Marketing" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGuardarCursoCompleto();
  };

  const handleCrearModulo = () => {
    setMostrarFormularioModulo(true);
  };

  const handleCancelarModulo = () => {
    setMostrarFormularioModulo(false);
    setNombreModulo("");
  };

  const handleGuardarModulo = () => {
    if (!nombreModulo.trim()) {
      alert("El nombre del módulo es requerido");
      return;
    }
    
    const nuevoModulo = {
      id: Date.now(),
      nombre: nombreModulo,
      lecciones: []
    };
    
    setModuloActual(nuevoModulo);
    setMostrarFormularioModulo(false);
    setMostrarFormularioLecciones(true);
    setNombreModulo("");
    setLeccionesDelModulo([]);
  };

  // Función para editar módulo
  const handleEditarModulo = (modulo) => {
    setEditandoModulo(modulo);
    setModuloActual(modulo);
    setNombreModulo(modulo.nombre);
    setLeccionesDelModulo(modulo.lecciones);
    setMostrarFormularioLecciones(true);
  };

  // Función para editar lección
  const handleEditarLeccion = (leccion) => {
    setEditandoLeccion(leccion);
    setTituloLeccion(leccion.tituloLec);
    setDescripcionLeccion(leccion.descripcionLec);
    setEstadoLeccion(leccion.estadoLec);
    setHorasLeccion(leccion.horasLec.toString());
    setVideoUrl(leccion.videoUrl);
    setContenidoTexto(leccion.contenidoTexto);
    setImagenUrl(leccion.imagenUrl);
    setArchivoUrl(leccion.archivoUrl);
  };

  // Función para eliminar módulo
  const handleEliminarModulo = (moduloId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este módulo?")) {
      setModulosGuardados(prev => prev.filter(modulo => modulo.id !== moduloId));
    }
  };

  // Función para eliminar lección
  const handleEliminarLeccion = (leccionId) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta lección?")) {
      setLeccionesDelModulo(prev => prev.filter(leccion => leccion.id !== leccionId));
    }
  };

  const handleCancelarLeccion = () => {
    setMostrarFormularioLecciones(false);
    setModuloActual(null);
    setLeccionesDelModulo([]);
    setEditandoModulo(null);
    setEditandoLeccion(null);
    limpiarFormularioLeccion();
    setNombreModulo("");
  };

  const handleGuardarLeccion = () => {
    if (!tituloLeccion.trim()) {
      alert("El título de la lección es requerido");
      return;
    }

    const leccionData = {
      idModulo: moduloActual.id,
      tituloLec: tituloLeccion,
      descripcionLec: descripcionLeccion,
      estadoLec: estadoLeccion,
      horasLec: parseInt(horasLeccion) || 0,
      videoUrl: videoUrl,
      contenidoTexto: contenidoTexto,
      imagenUrl: imagenUrl,
      archivoUrl: archivoUrl
    };

    if (editandoLeccion) {
      // Actualizar lección existente
      const leccionActualizada = { ...editandoLeccion, ...leccionData };
      setLeccionesDelModulo(prev => 
        prev.map(leccion => 
          leccion.id === editandoLeccion.id ? leccionActualizada : leccion
        )
      );
      alert(`Lección "${tituloLeccion}" actualizada`);
      setEditandoLeccion(null);
    } else {
      // Crear nueva lección
      const nuevaLeccion = { id: Date.now(), ...leccionData };
      setLeccionesDelModulo(prev => [...prev, nuevaLeccion]);
      alert(`Lección "${tituloLeccion}" agregada al ${moduloActual.nombre}`);
    }
    
    limpiarFormularioLeccion();
  };

  const limpiarFormularioLeccion = () => {
    setTituloLeccion("");
    setDescripcionLeccion("");
    setEstadoLeccion("");
    setHorasLeccion("");
    setVideoUrl("");
    setContenidoTexto("");
    setImagenUrl("");
    setArchivoUrl("");
  };

  const handleFinalizarModulo = () => {
    if (leccionesDelModulo.length === 0) {
      alert("Debe agregar al menos una lección al módulo");
      return;
    }

    const moduloCompleto = {
      ...moduloActual,
      nombre: nombreModulo,
      lecciones: leccionesDelModulo
    };

    if (editandoModulo) {
      // Actualizar módulo existente
      setModulosGuardados(prev => 
        prev.map(modulo => 
          modulo.id === editandoModulo.id ? moduloCompleto : modulo
        )
      );
      alert(`Módulo "${moduloActual.nombre}" actualizado`);
      setEditandoModulo(null);
    } else {
      // Crear nuevo módulo
      setModulosGuardados(prev => [...prev, moduloCompleto]);
      alert(`Módulo "${moduloActual.nombre}" guardado con ${leccionesDelModulo.length} lección(es)`);
    }
    
    setMostrarFormularioLecciones(false);
    setModuloActual(null);
    setLeccionesDelModulo([]);
    setNombreModulo("");
  };

  const handleGuardarCursoCompleto = () => {
    if (!nombreCurso.trim() || !descripcionCurso.trim() || !precioCurso.trim()) {
      alert("Por favor complete todos los campos del curso");
      return;
    }

    if (modulosGuardados.length === 0) {
      alert("Debe agregar al menos un módulo al curso");
      return;
    }

    const cursoCompleto = {
      nombre: nombreCurso,
      descripcion: descripcionCurso,
      precio: precioCurso,
      categoria: moduloSeleccionado,
      modulos: modulosGuardados
    };

    console.log("Curso completo:", cursoCompleto);
    alert("¡Curso creado exitosamente!");
    
    // Aquí podrías enviar los datos al backend
    // fetch('/api/cursos', { method: 'POST', body: JSON.stringify(cursoCompleto) })
  };

  return (
    <main style={{ backgroundColor: "#56565641", minHeight: "100vh" }}>
      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="formulario-curso bg-white bg-opacity-75 p-4 rounded shadow">
          <h3>Nuevo Curso</h3>
          <form onSubmit={handleSubmit}>
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
                {modulos.map(modulo => (
                  <option key={modulo.id} value={modulo.id}>{modulo.nombre}</option>
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

            {/* Resumen de módulos guardados con botones de edición */}
            {modulosGuardados.length > 0 && (
              <div className="mt-4 p-3 bg-light rounded container-modulos">
                <h5>Módulos del Curso:</h5>
                {modulosGuardados.map((modulo, index) => (
                  <div key={modulo.id} className="mb-2 p-2 border rounded bg-white">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <strong>Módulo {index + 1}: {modulo.nombre}</strong>
                        <div className="text-muted">
                          {modulo.lecciones.length} lección(es):
                          <ul className="mb-0 mt-1">
                            {modulo.lecciones.map((leccion, lecIndex) => (
                              <li key={leccion.id} className="small">
                                {leccion.tituloLec} ({leccion.horasLec}h)
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex gap-1">
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditarModulo(modulo)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleEliminarModulo(modulo.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!mostrarFormularioModulo && !mostrarFormularioLecciones && (
              <>
                <div className="d-flex gap-2 mt-3">
                  <button 
                    type="button" 
                    className="btn crear"
                    onClick={handleCrearModulo}
                  >
                    <i className="bi bi-plus-circle"></i> Crear nuevo módulo
                  </button>
                </div>
                <div className="mt-3 finalizar">
                  {modulosGuardados.length > 0 && (
                    <button 
                      type="submit" 
                      className="btn finalizar"
                    >
                      <i className="bi bi-check-circle"></i> Finalizar curso 
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Formulario para crear módulo */}
            {mostrarFormularioModulo && (
              <div className="mt-4 p-3 rounded container-modulos">
                <h4>Crear Nuevo Módulo</h4>
                
                <p>Título del módulo:</p>
                <div className="input-group mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ingrese el título del módulo"
                    value={nombreModulo}
                    onChange={e => setNombreModulo(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="btn crear"
                    onClick={handleGuardarModulo}
                  >
                    <i className="bi bi-plus-circle"></i> Crear Lecciones
                  </button>
                  <button 
                    type="button" 
                    className="btn cancelar"
                    onClick={handleCancelarModulo}
                  >
                    <i className="bi bi-x-circle"></i> Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Formulario para crear/editar lecciones */}
            {mostrarFormularioLecciones && moduloActual && (
              <div className="mt-4 p-3 rounded container-modulos">
                <h4>
                  {editandoModulo ? 'Editar' : 'Agregar Lección al Módulo'}: {moduloActual.nombre}
                </h4>

                {/* Campo para editar nombre del módulo */}
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
                
                {/* Mostrar lecciones con botones de edición */}
                {leccionesDelModulo.length > 0 && (
                  <div className="mb-3 p-2 bg-light rounded">
                    <strong>Lecciones:</strong>
                    <ul className="mb-0 mt-1">
                      {leccionesDelModulo.map((leccion, index) => (
                        <li key={leccion.id} className="small d-flex justify-content-between align-items-center">
                          <span>{leccion.tituloLec} ({leccion.horasLec}h)</span>
                          <div className="d-flex gap-1">
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEditarLeccion(leccion)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleEliminarLeccion(leccion.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <p>Título de la lección:</p>
                <div className="input-group mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ingrese el título de la lección"
                    value={tituloLeccion}
                    onChange={e => setTituloLeccion(e.target.value)}
                  />
                </div>

                <p>Descripción:</p>
                <div className="form-floating mb-3">
                  <textarea 
                    className="form-control" 
                    placeholder="Descripción de la lección" 
                    value={descripcionLeccion}
                    onChange={e => setDescripcionLeccion(e.target.value)}
                  ></textarea>
                </div>

                <p>Estado de la lección:</p>
                <div className="input-group mb-3">
                  <select 
                    className="form-control"
                    value={estadoLeccion}
                    onChange={e => setEstadoLeccion(e.target.value)}
                  >
                    <option value="">Seleccionar estado</option>
                    <option value="borrador">Borrador</option>
                    <option value="publicado">Publicado</option>
                    <option value="archivado">Archivado</option>
                  </select>
                </div>

                <p>Horas de duración:</p>
                <div className="input-group mb-3">
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Horas"
                    value={horasLeccion}
                    onChange={e => setHorasLeccion(e.target.value)}
                  />
                </div>

                <p>URL del video:</p>
                <div className="input-group mb-3">
                  <input 
                    type="url" 
                    className="form-control" 
                    placeholder="https://..."
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                  />
                </div>

                <p>Contenido de texto:</p>
                <div className="form-floating mb-3">
                  <textarea 
                    className="form-control" 
                    placeholder="Contenido de la lección" 
                    style={{height: "120px"}}
                    value={contenidoTexto}
                    onChange={e => setContenidoTexto(e.target.value)}
                  ></textarea>
                </div>

                <p>URL de imagen:</p>
                <div className="input-group mb-3">
                  <input 
                    type="url" 
                    className="form-control" 
                    placeholder="https://..."
                    value={imagenUrl}
                    onChange={e => setImagenUrl(e.target.value)}
                  />
                </div>

                <p>URL de archivo:</p>
                <div className="input-group mb-3">
                  <input 
                    type="url" 
                    className="form-control" 
                    placeholder="https://..."
                    value={archivoUrl}
                    onChange={e => setArchivoUrl(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={handleGuardarLeccion}
                  >
                    <i className="bi bi-save"></i>  
                    {editandoLeccion ? ' Actualizar' : ' Guardar'} Lección
                  </button>
                  {editandoLeccion && (
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditandoLeccion(null);
                        limpiarFormularioLeccion();
                      }}
                    >
                      <i className="bi bi-x-circle"></i> Cancelar Edición
                    </button>
                  )}
                  <button 
                    type="button" 
                    className="btn cancelar"
                    onClick={handleCancelarLeccion}
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
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default CrearCursoPage2;