function ListaLecciones({ lecciones, onEditarLeccion, onEliminarLeccion }) {
  if (lecciones.length === 0) return null;

  return (
    <div className="mb-3 p-2 bg-light rounded container-lecciones">
      <strong>Lecciones:</strong>
      <ul className="mb-0 mt-1">
        {lecciones.map((leccion) => (
          <li key={leccion.id} className="small d-flex justify-content-between align-items-center">
            <span>{leccion.tituloLec} ({leccion.horasLec}h)</span>
            <div className="d-flex gap-1">
              <button 
                type="button" 
                className="btn btn-sm btn-outline-primary"
                onClick={() => onEditarLeccion(leccion)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button 
                type="button" 
                className="btn btn-sm btn-outline-danger"
                onClick={() => onEliminarLeccion(leccion.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaLecciones;