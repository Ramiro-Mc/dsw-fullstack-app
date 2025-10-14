import { useState, useEffect } from "react";
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


  // Opciones de tipos de curso (cargadas desde el backend)
  const [tiposCurso, setTiposCurso] = useState([]);

  // Cargar tipos de curso al montar el componente
  const cargarTiposCurso = async () => {
    try {
      const response = await fetch('http://localhost:3000/tipos-curso');
      const tipos = await response.json();
      setTiposCurso(tipos);
    } catch (error) {
      console.error('Error al cargar tipos de curso:', error);
    }
  };

  useEffect(() => {
    cargarTiposCurso();
  }, []);

  // Función para crear el curso completo
  const crearCursoCompleto = async (datoCurso) => {
    try {
      const response = await fetch('http://localhost:3000/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datoCurso),
      });

      if (!response.ok) {
        throw new Error('Error al crear el curso');
      }

      const cursoCreado = await response.json();
      return cursoCreado;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

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

  const handleGuardarCursoCompleto = async () => {
    if (!nombreCurso.trim() || !descripcionCurso.trim() || !precioCurso.trim() || !moduloSeleccionado) {
      alert("Por favor complete todos los campos del curso");
      return;
    }

    if (modulosGuardados.length === 0) {
      alert("Debe agregar al menos un módulo al curso");
      return;
    }

    // Obtener el ID del usuario logueado (profesor)
    // Esto depende de cómo se maneja la autenticación 
    const usuario = JSON.parse(localStorage.getItem('usuario')); // O de donde obtengas el usuario
    const idProfesor = usuario?.idUsuario;

    if (!idProfesor) {
      alert("Error: No se pudo identificar al profesor. Por favor inicie sesión nuevamente.");
      return;
    }

    const cursoCompleto = {
      titulo: nombreCurso,
      descripcion: descripcionCurso,
      precio: parseFloat(precioCurso),
      idTipo: parseInt(moduloSeleccionado),
      idProfesor: idProfesor,
      modulos: modulosGuardados.map(modulo => ({
        titulo: modulo.nombre,
        lecciones: modulo.lecciones.map(leccion => ({
          tituloLec: leccion.titulo,
          descripcionLec: leccion.descripcion || null,
          horasLec: leccion.horas ? parseInt(leccion.horas) : null,
          videoUrl: leccion.videoUrl || null,
          contenidoTexto: leccion.contenidoTexto || null,
          imagenUrl: leccion.imagenUrl || null,
          archivoUrl: leccion.archivoUrl || null,
          estadoLec: 'activo',
          completado: false
        }))
      }))
    };

    try {
      await crearCursoCompleto(cursoCompleto);
      alert("¡Curso creado exitosamente!");
      
      // Limpiar formulario
      setNombreCurso("");
      setDescripcionCurso("");
      setPrecioCurso("");
      setModuloSeleccionado("");
      setModulosGuardados([]);
      
    } catch (error) {
      alert("Error al crear el curso. Por favor intente nuevamente.");
    }
  };

  return (
    <main style={{ backgroundColor: "#56565641", minHeight: "100vh" }}>
      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="formulario-curso p-4">
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
              modulos={tiposCurso}
              // cargarTiposCurso={cargarTiposCurso}
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