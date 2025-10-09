function FormularioModulo({ nombreModulo, setNombreModulo, onGuardar, onCancelar }) {
  const handleGuardar = () => {
    onGuardar(nombreModulo);
  };

  return (
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
          onClick={handleGuardar}
        >
          <i className="bi bi-plus-circle"></i> Crear Lecciones
        </button>
        <button 
          type="button" 
          className="btn cancelar"
          onClick={onCancelar}
        >
          <i className="bi bi-x-circle"></i> Cancelar
        </button>
      </div>
    </div>
  );
}

export default FormularioModulo;