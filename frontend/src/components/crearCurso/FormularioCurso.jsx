import { useState, useRef } from 'react';
import { subirImagenCurso } from '../../services/mediaUpload';

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
  imagenCurso,
  setImagenCurso,
  tipoImagen,
  setTipoImagen
}) {
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errorImagen, setErrorImagen] = useState("");
  const fileInputRef = useRef(null);

  const handleImagenChange = (e) => {
    setImagenCurso(e.target.value);
    setErrorImagen("");
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setErrorImagen("Solo se permiten archivos JPG, JPEG o PNG");
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorImagen("La imagen no debe superar los 5MB");
      return;
    }

    setSubiendoImagen(true);
    setErrorImagen("");

    const resultado = await subirImagenCurso(file);

    if (resultado.success) {
      setImagenCurso(resultado.url);
      setTipoImagen('archivo');
    } else {
      setErrorImagen(resultado.error || "Error al subir la imagen");
    }

    setSubiendoImagen(false);
  };

  const handleImagenClick = () => {
    fileInputRef.current.click();
  };

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
            <option key={tipo.idTipo} value={tipo.idTipo} className="form-select-option">
              {tipo.nombreTipo}
            </option>
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

      {/* Sección para imagen del curso */}
      <p>Imagen del curso:</p>
      <div className="mb-3">
        <div className="btn-group mb-2 w-100" role="group">
          <input 
            type="radio" 
            className="btn-check" 
            name="tipoImagen" 
            id="imagenArchivo" 
            value="archivo"
            checked={tipoImagen === 'archivo'}
            onChange={(e) => setTipoImagen(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor="imagenArchivo">
            Subir desde PC
          </label>

          <input 
            type="radio" 
            className="btn-check" 
            name="tipoImagen" 
            id="imagenUrl" 
            value="url"
            checked={tipoImagen === 'url'}
            onChange={(e) => setTipoImagen(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor="imagenUrl">
            URL de imagen
          </label>

          <input 
            type="radio" 
            className="btn-check" 
            name="tipoImagen" 
            id="imagenDefault" 
            value="default"
            checked={tipoImagen === 'default'}
            onChange={(e) => {
              setTipoImagen(e.target.value);
              setImagenCurso("");
            }}
          />
          <label className="btn btn-outline-primary" htmlFor="imagenDefault">
            Imagen por defecto
          </label>
        </div>

        {tipoImagen === 'archivo' && (
          <div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/jpeg,image/jpg,image/png"
              style={{ display: "none" }}
            />
            <button 
              type="button" 
              className="btn btn-secondary w-100"
              onClick={handleImagenClick}
              disabled={subiendoImagen}
            >
              {subiendoImagen ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Subiendo imagen...
                </>
              ) : (
                <>
                  <i className="bi bi-upload me-2"></i>
                  {imagenCurso ? 'Cambiar imagen' : 'Seleccionar imagen'}
                </>
              )}
            </button>
            {errorImagen && (
              <div className="alert alert-danger mt-2 mb-0" role="alert">
                {errorImagen}
              </div>
            )}
          </div>
        )}

        {tipoImagen === 'url' && (
          <div className="input-group">
            <input 
              type="url" 
              className="form-control" 
              placeholder="https://ejemplo.com/imagen.jpg"
              value={imagenCurso}
              onChange={handleImagenChange}
            />
          </div>
        )}

        {/* Vista previa de la imagen */}
        {(imagenCurso || tipoImagen === 'default') && (
          <div className="mt-3 text-center">
            <p className="text-muted small mb-2">Vista previa:</p>
            <img 
              src={
                tipoImagen === 'default' 
                  ? '/default-course.jpg'   // usa la imagen local en public
                  : imagenCurso
              } 
              alt="Vista previa del curso" 
              style={{ 
                maxWidth: '300px', 
                maxHeight: '200px', 
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
              onError={(e) => {
                e.target.src = '/default-course.jpg'; // fallback local
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormularioCurso;