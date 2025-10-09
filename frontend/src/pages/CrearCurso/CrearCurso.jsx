import { useState } from "react";
import FormularioCurso from "../../components/crearCurso/FormularioCurso";
import ListaModulos from "../../components/crearCurso/ListaModulos";
import FormularioModulo from "../../components/crearCurso/FormularioModulo";
import FormularioLecciones from "../../components/crearCurso/FormularioLecciones";
import "./CrearCurso.css";

function CrearCursoPage() {
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

  // Opciones de módulos
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

  const handleGuardarModulo = (nombreModulo) => {
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
  };

  const handleEditarModulo = (modulo) => {
    setEditandoModulo(modulo);
    setModuloActual(modulo);
    setNombreModulo(modulo.nombre);
    setMostrarFormularioLecciones(true);
  };

  const handleEliminarModulo = (moduloId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este módulo?")) {
      setModulosGuardados(prev => prev.filter(modulo => modulo.id !== moduloId));
    }
  };

  const handleFinalizarModulo = (moduloCompleto) => {
    if (editandoModulo) {
      setModulosGuardados(prev => 
        prev.map(modulo => 
          modulo.id === editandoModulo.id ? moduloCompleto : modulo
        )
      );
      alert(`Módulo "${moduloCompleto.nombre}" actualizado`);
      setEditandoModulo(null);
    } else {
      setModulosGuardados(prev => [...prev, moduloCompleto]);
      alert(`Módulo "${moduloCompleto.nombre}" guardado con ${moduloCompleto.lecciones.length} lección(es)`);
    }
    
    setMostrarFormularioLecciones(false);
    setModuloActual(null);
    setNombreModulo("");
  };

  const handleCancelarLecciones = () => {
    setMostrarFormularioLecciones(false);
    setModuloActual(null);
    setEditandoModulo(null);
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
  };

  return (
    <main style={{ backgroundColor: "#56565641", minHeight: "100vh" }}>
      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="formulario-curso bg-white bg-opacity-75 p-4 rounded shadow">
          <h3>Nuevo Curso</h3>
          <form onSubmit={handleSubmit}>
            <FormularioCurso
              nombreCurso={nombreCurso}
              setNombreCurso={setNombreCurso}
              descripcionCurso={descripcionCurso}
              setDescripcionCurso={setDescripcionCurso}
              precioCurso={precioCurso}
              setPrecioCurso={setPrecioCurso}
              moduloSeleccionado={moduloSeleccionado}
              setModuloSeleccionado={setModuloSeleccionado}
              modulos={modulos}
            />

            <ListaModulos 
              modulos={modulosGuardados}
              onEditarModulo={handleEditarModulo}
              onEliminarModulo={handleEliminarModulo}
            />
            
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

            {mostrarFormularioModulo && (
              <FormularioModulo
                nombreModulo={nombreModulo}
                setNombreModulo={setNombreModulo}
                onGuardar={handleGuardarModulo}
                onCancelar={handleCancelarModulo}
              />
            )}

            {mostrarFormularioLecciones && moduloActual && (
              <FormularioLecciones
                modulo={moduloActual}
                nombreModulo={nombreModulo}
                setNombreModulo={setNombreModulo}
                editandoModulo={editandoModulo}
                onFinalizarModulo={handleFinalizarModulo}
                onCancelar={handleCancelarLecciones}
              />
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default CrearCursoPage;