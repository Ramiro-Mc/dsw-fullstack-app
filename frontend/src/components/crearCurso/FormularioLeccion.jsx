import { useState, useEffect } from "react";

function FormularioLeccion({ leccionEditando, moduloId, onGuardarLeccion, onCancelarEdicion }) {
  const [tituloLeccion, setTituloLeccion] = useState("");
  const [descripcionLeccion, setDescripcionLeccion] = useState("");
  const [estadoLeccion, setEstadoLeccion] = useState("");
  const [horasLeccion, setHorasLeccion] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [contenidoTexto, setContenidoTexto] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [archivoUrl, setArchivoUrl] = useState("");

  useEffect(() => {
    if (leccionEditando) {
      setTituloLeccion(leccionEditando.tituloLec || "");
      setDescripcionLeccion(leccionEditando.descripcionLec || "");
      setEstadoLeccion(leccionEditando.estadoLec || "");
      setHorasLeccion(leccionEditando.horasLec?.toString() || "");
      setVideoUrl(leccionEditando.videoUrl || "");
      setContenidoTexto(leccionEditando.contenidoTexto || "");
      setImagenUrl(leccionEditando.imagenUrl || "");
      setArchivoUrl(leccionEditando.archivoUrl || "");
    }
  }, [leccionEditando]);

  const limpiarFormulario = () => {
    setTituloLeccion("");
    setDescripcionLeccion("");
    setEstadoLeccion("");
    setHorasLeccion("");
    setVideoUrl("");
    setContenidoTexto("");
    setImagenUrl("");
    setArchivoUrl("");
  };

  const handleGuardarLeccion = () => {
    if (!tituloLeccion.trim()) {
      alert("El título de la lección es requerido");
      return;
    }

    const leccionData = {
      idModulo: moduloId,
      tituloLec: tituloLeccion,
      descripcionLec: descripcionLeccion,
      estadoLec: estadoLeccion,
      horasLec: parseInt(horasLeccion) || 0,
      videoUrl: videoUrl,
      contenidoTexto: contenidoTexto,
      imagenUrl: imagenUrl,
      archivoUrl: archivoUrl
    };

    onGuardarLeccion(leccionData);
    
    if (!leccionEditando) {
      limpiarFormulario();
    }
  };

  const handleCancelarEdicion = () => {
    onCancelarEdicion();
    limpiarFormulario();
  };

  return (
    <div className="formulario-leccion">
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
          {leccionEditando ? ' Actualizar' : ' Guardar'} Lección
        </button>
        {leccionEditando && (
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleCancelarEdicion}
          >
            <i className="bi bi-x-circle"></i> Cancelar Edición
          </button>
        )}
      </div>
    </div>
  );
}

export default FormularioLeccion;