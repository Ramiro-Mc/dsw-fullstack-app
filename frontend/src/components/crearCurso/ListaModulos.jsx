function ListaModulos({ modulos, onEditarModulo, onEliminarModulo }) {
  if (modulos.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-light rounded container-modulos">
      <h5>Módulos del Curso:</h5>
      {modulos.map((modulo, index) => (
        <div key={modulo.id} className="mb-2 p-2 border rounded bg-white">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <strong>Módulo {index + 1}: {modulo.nombre}</strong>
              <div className="text-muted">
                {modulo.lecciones.length} lección(es):
                <ul className="mb-0 mt-1">
                  {modulo.lecciones.map((leccion) => (
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
                onClick={() => onEditarModulo(modulo)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button 
                type="button" 
                className="btn btn-sm btn-outline-danger"
                onClick={() => onEliminarModulo(modulo.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaModulos;