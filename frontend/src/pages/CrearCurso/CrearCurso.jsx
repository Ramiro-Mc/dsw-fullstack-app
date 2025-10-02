import { useState } from "react";
import "./CrearCurso.css";

function CrearCursoPage() {
  const [moduloSeleccionado, setModuloSeleccionado] = useState("");
  const [tituloClase, setTituloClase] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);

  // Opciones de módulos (puedes traerlas de un backend si quieres)
  const modulos = [
    { id: 1, nombre: "Módulo 1" },
    { id: 2, nombre: "Módulo 2" },
    { id: 3, nombre: "Módulo 3" },
  ];

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica para enviar los datos al backend
    alert("Clase creada (simulado)");
  };

  return (
    <main style={{ backgroundColor: "#56565641", minHeight: "100vh" }}>
      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="formulario-curso bg-white bg-opacity-75 p-4 rounded shadow">
          <h3>Nueva clase</h3>
          <form onSubmit={handleSubmit}>
            <p>Seleccione un módulo:</p>
            <div className="text-center mb-3">
              <select
                name="seccion"
                id="seccion"
                className="form-select"
                value={moduloSeleccionado}
                onChange={e => setModuloSeleccionado(e.target.value)}
                required
              >
                <option value="">Seleccione un módulo</option>
                {modulos.map(modulo => (
                  <option key={modulo.id} value={modulo.id}>{modulo.nombre}</option>
                ))}
              </select>
            </div>
            <p>Ingrese el título de la clase:</p>
            <input
              className="input form-control mb-3"
              type="text"
              placeholder="Clase..."
              value={tituloClase}
              onChange={e => setTituloClase(e.target.value)}
              required
            />
            <p>Seleccione una descripción breve:</p>
            <textarea
              className="input form-control mb-3"
              name="descripcion"
              rows="1"
              placeholder="Escribe tu descripción aquí..."
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />

            <div className="archivo-multimedia mb-3">
              <p>Seleccione un archivo multimedia:</p>
              <input
                type="file"
                id="archivo"
                name="archivo"
                className="form-control mb-3"
                accept="image/*,audio/*,video/*"
                onChange={handleFileChange}
              />
              {archivo && <div className="mt-2">{archivo.name}</div>}
            </div>

            <div className="d-flex gap-2">
              <button type="button" className="boton-opciones btn btn-secondary">
                Agregar módulo
              </button>
              <button type="submit" className="boton-opciones btn btn-primary">
                Finalizar clase
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CrearCursoPage;