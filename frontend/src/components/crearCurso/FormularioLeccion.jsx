import { useState, useEffect, useRef } from "react";
import CustomAlert from "../CustomAlert/CustomAlert";
import { subirVideoLeccion, subirImagenLeccion, subirArchivoLeccion } from "../../services/mediaUpload";

function FormularioLeccion({ leccionEditando, onGuardarLeccion, onCancelarEdicion }) {
  const [tituloLeccion, setTituloLeccion] = useState("");
  const [descripcionLeccion, setDescripcionLeccion] = useState("");
  const [horasLeccion, setHorasLeccion] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [contenidoTexto, setContenidoTexto] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [archivoUrl, setArchivoUrl] = useState("");
  const [alert, setAlert] = useState(null);

  // Estados para tipo de carga
  const [tipoVideo, setTipoVideo] = useState("url");
  const [tipoImagen, setTipoImagen] = useState("url");
  const [tipoArchivo, setTipoArchivo] = useState("url");

  // Estados de carga
  const [subiendoVideo, setSubiendoVideo] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [subiendoArchivo, setSubiendoArchivo] = useState(false);

  // Referencias para inputs de archivo
  const videoInputRef = useRef(null);
  const imagenInputRef = useRef(null);
  const archivoInputRef = useRef(null);

  useEffect(() => {
    if (leccionEditando) {
      setTituloLeccion(leccionEditando.tituloLec || "");
      setDescripcionLeccion(leccionEditando.descripcionLec || leccionEditando.descripcion || "");
      setHorasLeccion(leccionEditando.horasLec?.toString() || leccionEditando.horas?.toString() || "");
      setVideoUrl(leccionEditando.videoUrl || "");
      setContenidoTexto(leccionEditando.contenidoTexto || "");
      setImagenUrl(leccionEditando.imagenUrl || "");
      setArchivoUrl(leccionEditando.archivoUrl || "");

      // Establecer tipos según si ya tienen URL
      setTipoVideo(leccionEditando.videoUrl ? "url" : "url");
      setTipoImagen(leccionEditando.imagenUrl ? "url" : "url");
      setTipoArchivo(leccionEditando.archivoUrl ? "url" : "url");
    }
  }, [leccionEditando]);

  const limpiarFormulario = () => {
    setTituloLeccion("");
    setDescripcionLeccion("");
    setHorasLeccion("");
    setVideoUrl("");
    setContenidoTexto("");
    setImagenUrl("");
    setArchivoUrl("");
    setTipoVideo("url");
    setTipoImagen("url");
    setTipoArchivo("url");
  };

  // Manejadores de subida de archivos
  const handleVideoFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
    if (!validTypes.includes(file.type)) {
      setAlert({
        message: "Solo se permiten videos MP4, AVI, MOV o WMV",
        type: "error",
        onClose: () => setAlert(null)
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB
      setAlert({
        message: "El video no debe superar los 100MB",
        type: "error",
        onClose: () => setAlert(null)
      });
      return;
    }

    setSubiendoVideo(true);
    const resultado = await subirVideoLeccion(file);

    if (resultado.success) {
      setVideoUrl(resultado.url);
    } else {
      setAlert({
        message: resultado.error || "Error al subir el video",
        type: "error",
        onClose: () => setAlert(null)
      });
    }

    setSubiendoVideo(false);
  };

  const handleImagenFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setAlert({
        message: "Solo se permiten imágenes JPG, JPEG o PNG",
        type: "error",
        onClose: () => setAlert(null)
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setAlert({
        message: "La imagen no debe superar los 5MB",
        type: "error",
        onClose: () => setAlert(null)
      });
      return;
    }

    setSubiendoImagen(true);
    const resultado = await subirImagenLeccion(file);

    if (resultado.success) {
      setImagenUrl(resultado.url);
    } else {
      setAlert({
        message: resultado.error || "Error al subir la imagen",
        type: "error",
        onClose: () => setAlert(null)
      });
    }

    setSubiendoImagen(false);
  };

  const handleArchivoFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip', 'rar'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setAlert({
        message: "Formato de archivo no válido. Permitidos: PDF, DOC, XLS, PPT, TXT, ZIP, RAR",
        type: "error",
        onClose: () => setAlert(null)
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      setAlert({
        message: "El archivo no debe superar los 10MB",
        type: "error",
        onClose: () => setAlert(null)
      });
      return;
    }

    setSubiendoArchivo(true);
    const resultado = await subirArchivoLeccion(file);

    if (resultado.success) {
      setArchivoUrl(resultado.url);
    } else {
      setAlert({
        message: resultado.error || "Error al subir el archivo",
        type: "error",
        onClose: () => setAlert(null)
      });
    }

    setSubiendoArchivo(false);
  };

  const handleGuardarLeccion = () => {
    if (!tituloLeccion.trim()) {
      setAlert({
        message: "El título de la lección es requerido",
        type: "error",
        onClose: () => setAlert(null)
      });
      return;
    }

    const leccionData = {
      tituloLec: tituloLeccion,
      descripcion: descripcionLeccion,
      descripcionLec: descripcionLeccion,
      horas: horasLeccion,
      horasLec: parseInt(horasLeccion) || 0,
      videoUrl: videoUrl || null,
      contenidoTexto: contenidoTexto || null,
      imagenUrl: imagenUrl || null,
      archivoUrl: archivoUrl || null
    };

    if (leccionEditando) {
      leccionData.id = leccionEditando.id;
      leccionData.esExistente = leccionEditando.esExistente;
    }

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

      {/* Video */}
      <p>Video de la lección:</p>
      <div className="mb-3">
        <div className="btn-group mb-2 w-100" role="group">
          <input 
            type="radio" 
            className="btn-check" 
            name="tipoVideo" 
            id="videoArchivoLeccion"          // <-- id único
            value="archivo"
            checked={tipoVideo === 'archivo'}
            onChange={(e) => setTipoVideo(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor="videoArchivoLeccion">
            Subir video
          </label>

          <input 
            type="radio" 
            className="btn-check" 
            name="tipoVideo" 
            id="videoUrlLeccion"              // <-- id único
            value="url"
            checked={tipoVideo === 'url'}
            onChange={(e) => setTipoVideo(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor="videoUrlLeccion">
            URL del video
          </label>
        </div>

        {tipoVideo === 'archivo' && (
          <div>
            <input 
              type="file" 
              ref={videoInputRef}
              onChange={handleVideoFileSelect}
              accept="video/mp4,video/avi,video/mov,video/wmv"
              style={{ display: "none" }}
            />
            <button 
              type="button" 
              className="btn btn-secondary w-100"
              onClick={() => videoInputRef.current.click()}
              disabled={subiendoVideo}
            >
              {subiendoVideo ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Subiendo video...
                </>
              ) : (
                <>
                  <i className="bi bi-upload me-2"></i>
                  {videoUrl ? 'Cambiar video' : 'Seleccionar video'}
                </>
              )}
            </button>
          </div>
        )}

        {tipoVideo === 'url' && (
          <input 
            type="url" 
            className="form-control" 
            placeholder="https://..."
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
          />
        )}

        {videoUrl && (
          <div className="mt-2">
            <small className="text-success">
              <i className="bi bi-check-circle me-1"></i>
              Video cargado
            </small>
          </div>
        )}
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

      {/* Imagen */}
      <p>Imagen de la lección:</p>
      <div className="mb-3">
        <div className="btn-group mb-2 w-100" role="group">
          <input 
            type="radio" 
            className="btn-check" 
            name="tipoImagen" 
            id="imagenArchivoLeccion"         // <-- id único
            value="archivo"
            checked={tipoImagen === 'archivo'}
            onChange={(e) => setTipoImagen(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor="imagenArchivoLeccion">
            Subir imagen
          </label>

          <input 
            type="radio" 
            className="btn-check" 
            name="tipoImagen" 
            id="imagenUrlLeccion"             // <-- id único
            value="url"
            checked={tipoImagen === 'url'}
            onChange={(e) => setTipoImagen(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor="imagenUrlLeccion">
            URL de imagen
          </label>
        </div>

        {tipoImagen === 'archivo' && (
          <div>
            <input 
              type="file" 
              ref={imagenInputRef}
              onChange={handleImagenFileSelect}
              accept="image/jpeg,image/jpg,image/png"
              style={{ display: "none" }}
            />
            <button 
              type="button" 
              className="btn btn-secondary w-100"
              onClick={() => imagenInputRef.current.click()}
              disabled={subiendoImagen}
            >
              {subiendoImagen ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Subiendo imagen...
                </>
              ) : (
                <>
                  <i className="bi bi-upload me-2"></i>
                  {imagenUrl ? 'Cambiar imagen' : 'Seleccionar imagen'}
                </>
              )}
            </button>
          </div>
        )}

        {tipoImagen === 'url' && (
          <input 
            type="url" 
            className="form-control" 
            placeholder="https://..."
            value={imagenUrl}
            onChange={e => setImagenUrl(e.target.value)}
          />
        )}

        {imagenUrl && (
          <div className="mt-2 text-center">
            <img 
              src={imagenUrl} 
              alt="Vista previa" 
              style={{ 
                maxWidth: '200px', 
                maxHeight: '150px', 
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Archivo */}
      <p>Archivo adjunto:</p>
      <div className="mb-3">
        <div className="btn-group mb-2 w-100" role="group">
          <input 
            type="radio" 
            className="btn-check" 
            name="tipoArchivo" 
            id="archivoFileLeccion"           // <-- id único
            value="archivo"
            checked={tipoArchivo === 'archivo'}
            onChange={(e) => setTipoArchivo(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor="archivoFileLeccion">
            Subir archivo
          </label>

          <input 
            type="radio" 
            className="btn-check" 
            name="tipoArchivo" 
            id="archivoUrlLeccion"            // <-- id único
            value="url"
            checked={tipoArchivo === 'url'}
            onChange={(e) => setTipoArchivo(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor="archivoUrlLeccion">
            URL del archivo
          </label>
        </div>

        {tipoArchivo === 'archivo' && (
          <div>
            <input 
              type="file" 
              ref={archivoInputRef}
              onChange={handleArchivoFileSelect}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
              style={{ display: "none" }}
            />
            <button 
              type="button" 
              className="btn btn-secondary w-100"
              onClick={() => archivoInputRef.current.click()}
              disabled={subiendoArchivo}
            >
              {subiendoArchivo ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Subiendo archivo...
                </>
              ) : (
                <>
                  <i className="bi bi-upload me-2"></i>
                  {archivoUrl ? 'Cambiar archivo' : 'Seleccionar archivo'}
                </>
              )}
            </button>
          </div>
        )}

        {tipoArchivo === 'url' && (
          <input 
            type="url" 
            className="form-control" 
            placeholder="https://..."
            value={archivoUrl}
            onChange={e => setArchivoUrl(e.target.value)}
          />
        )}

        {archivoUrl && (
          <div className="mt-2">
            <small className="text-success">
              <i className="bi bi-check-circle me-1"></i>
              Archivo cargado
            </small>
          </div>
        )}
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
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => {
            setAlert(null);
            if (alert.onClose) alert.onClose();
          }}
        />
      )}
    </div>
  );
}

export default FormularioLeccion;