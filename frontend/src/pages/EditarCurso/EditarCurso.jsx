import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FormularioCurso from "../../components/crearCurso/FormularioCurso";
import ListaModulos from "../../components/crearCurso/ListaModulos";
import FormularioModulo from "../../components/crearCurso/FormularioModulo";
import FormularioLecciones from "../../components/crearCurso/FormularioLecciones";
import "../CrearCurso/CrearCurso.css";
import LoadingError from "../../components/LoadingError/LoadingError";

function EditarCursoPage() {
  const { idCurso } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados del formulario
  const [nombreCurso, setNombreCurso] = useState("");
  const [descripcionCurso, setDescripcionCurso] = useState("");
  const [precioCurso, setPrecioCurso] = useState("");
  const [moduloSeleccionado, setModuloSeleccionado] = useState("");
  const [modulosGuardados, setModulosGuardados] = useState([]);
  const [tiposCurso, setTiposCurso] = useState([]);

  // Estados para módulo
  const [mostrarFormularioModulo, setMostrarFormularioModulo] = useState(false);
  const [mostrarFormularioLecciones, setMostrarFormularioLecciones] = useState(false);
  const [nombreModulo, setNombreModulo] = useState("");
  const [moduloActual, setModuloActual] = useState(null);
  const [editandoModulo, setEditandoModulo] = useState(null);

  // Cargar curso y tipos de curso
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const responseCurso = await fetch(`http://localhost:3000/cursoDetalle/${idCurso}`);
        const dataCurso = await responseCurso.json();

        if (!dataCurso.success) {
          setError("Curso no encontrado");
          return;
        }

        const curso = dataCurso.contenido;

        // Verificar que el usuario sea el propietario
        if (curso.idProfesor !== user?.idUsuario && curso.idProfesor !== user?.id) {
          setError("No tienes permisos para editar este curso");
          return;
        }

        setNombreCurso(curso.titulo);
        setDescripcionCurso(curso.descripcion);
        setPrecioCurso(curso.precio.toString());
        setModuloSeleccionado(curso.idTipo.toString());

        // Convertir módulos al formato esperado con marcadores de existencia
        const modulosFormateados = curso.Modulos?.map(modulo => ({
          id: modulo.idModulo,
          nombre: modulo.titulo,
          esExistente: true, // Marcar como existente en BD
          lecciones: modulo.Lecciones?.map(leccion => ({
            id: leccion.numeroLec,
            tituloLec: leccion.tituloLec,
            descripcion: leccion.descripcionLec,
            descripcionLec: leccion.descripcionLec, // Agregar ambos campos
            horas: leccion.horasLec?.toString() || "",
            videoUrl: leccion.videoUrl || "",
            contenidoTexto: leccion.contenidoTexto || "",
            imagenUrl: leccion.imagenUrl || "",
            archivoUrl: leccion.archivoUrl || "",
            esExistente: true // Marcar como existente en BD
          })) || []
        })) || [];

        setModulosGuardados(modulosFormateados);

        // Cargar tipos de curso
        const responseTipos = await fetch("http://localhost:3000/tipos-curso");
        const tipos = await responseTipos.json();
        setTiposCurso(tipos);

      } catch (error) {
        console.error("Error cargando datos:", error);
        setError("Error al cargar el curso");
      } finally {
        setLoading(false);
      }
    };

    if (user && idCurso) {
      cargarDatos();
    }
  }, [idCurso, user]);

  // Función para crear módulo en la BD
  const crearModuloEnBD = async (nombreModulo) => {
    try {
      const response = await fetch("http://localhost:3000/modulos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: nombreModulo,
          idCurso: parseInt(idCurso),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error al crear módulo: ${response.status}`);
      }

      const resultado = await response.json();
      return resultado.contenido;
    } catch (error) {
      console.error("Error creando módulo:", error);
      throw error;
    }
  };

  // Función para crear lección en la BD
  const crearLeccionEnBD = async (leccion, idModulo) => {
    try {
      const datosLeccion = {
        tituloLec: leccion.tituloLec,
        descripcionLec: leccion.descripcionLec || leccion.descripcion || "Sin descripción", 
        horasLec: leccion.horas ? parseInt(leccion.horas) : 1, 
        idModulo: idModulo,
      };

      // Solo agregar URLs si tienen contenido válido
      if (leccion.videoUrl && leccion.videoUrl.trim()) {
        datosLeccion.videoUrl = leccion.videoUrl.trim();
      }
      
      if (leccion.contenidoTexto && leccion.contenidoTexto.trim()) {
        datosLeccion.contenidoTexto = leccion.contenidoTexto.trim();
      }
      
      if (leccion.imagenUrl && leccion.imagenUrl.trim()) {
        datosLeccion.imagenUrl = leccion.imagenUrl.trim();
      }
      
      if (leccion.archivoUrl && leccion.archivoUrl.trim()) {
        datosLeccion.archivoUrl = leccion.archivoUrl.trim();
      }

      const response = await fetch("http://localhost:3000/lecciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosLeccion),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error al crear lección: ${response.status}`);
      }

      const resultado = await response.json();
      return resultado.contenido;
    } catch (error) {
      console.error("Error creando lección:", error);
      throw error;
    }
  };

  // Eliminar lección de la BD
  const eliminarLeccionDeBD = async (numeroLec) => {
    try {
      
      const response = await fetch(`http://localhost:3000/lecciones/${numeroLec}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error al eliminar lección: ${response.status}`);
      }

      console.log("Lección eliminada de la BD");
      return true;
    } catch (error) {
      console.error("Error eliminando lección:", error);
      throw error;
    }
  };

  // Función para eliminar módulo de la BD
  const eliminarModuloDeBD = async (idModulo) => {
    try {
    
      const response = await fetch(`http://localhost:3000/modulos/${idModulo}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error al eliminar módulo: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error eliminando módulo:", error);
      throw error;
    }
  };

  const actualizarCursoCompleto = async (datoCurso) => {
    try {
     
      const response = await fetch(`http://localhost:3000/api/cursos/${idCurso}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datoCurso),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el curso");
      }

      const cursoActualizado = await response.json();
      return cursoActualizado;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGuardarCursoCompleto();
  };

  const handleGuardarCursoCompleto = async () => {
    if (!nombreCurso.trim() || !descripcionCurso.trim() || !precioCurso.trim() || !moduloSeleccionado) {
      alert("Por favor complete todos los campos del curso");
      return;
    }

    if (modulosGuardados.length === 0) {
      alert("Debe tener al menos un módulo en el curso");
      return;
    }

    const datosActualizados = {
      titulo: nombreCurso,
      descripcion: descripcionCurso,
      precio: parseFloat(precioCurso),
      idTipo: parseInt(moduloSeleccionado),
    };

    try {
      await actualizarCursoCompleto(datosActualizados);
      alert("¡Curso actualizado exitosamente!");
      navigate("/MiPerfil/misCursosCreados");
    } catch (error) {
      console.error("Error al actualizar curso:", error);
      alert("Error al actualizar el curso. Por favor intente nuevamente.");
    }
  };

  // Funciones para manejar módulos
  const handleCrearModulo = () => {
    setMostrarFormularioModulo(true);
  };

  const handleCancelarModulo = () => {
    setMostrarFormularioModulo(false);
    setNombreModulo("");
  };

  const handleGuardarModulo = async (nombreModulo) => {
    if (!nombreModulo.trim()) {
      alert("El nombre del módulo es requerido");
      return;
    }

    try {
      // Crear el módulo en la base de datos
      const moduloCreado = await crearModuloEnBD(nombreModulo);
      
      const nuevoModulo = {
        id: moduloCreado.idModulo,
        nombre: moduloCreado.titulo,
        esExistente: true,
        lecciones: [],
      };

      setModuloActual(nuevoModulo);
      setMostrarFormularioModulo(false);
      setMostrarFormularioLecciones(true);
      setNombreModulo("");
      
      console.log("Módulo creado en BD:", moduloCreado);
    } catch (error) {
      console.error("Error al crear módulo:", error);
      alert("Error al crear el módulo. Por favor intente nuevamente.");
    }
  };

  const handleEditarModulo = (modulo) => {
    setEditandoModulo(modulo);
    setModuloActual(modulo);
    setNombreModulo(modulo.nombre);
    setMostrarFormularioLecciones(true);
  };

  const handleEliminarModulo = async (moduloId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este módulo?")) {
      const modulo = modulosGuardados.find(m => m.id === moduloId);
      
      if (modulo?.esExistente) {
        try {
          // Eliminar de la BD si existe
          await eliminarModuloDeBD(moduloId);
          console.log(" Módulo eliminado de la BD");
        } catch (error) {
          console.error("Error eliminando módulo:", error);
          alert("Error al eliminar el módulo. Por favor intente nuevamente.");
          return;
        }
      }
      
      setModulosGuardados((prev) =>
        prev.filter((modulo) => modulo.id !== moduloId)
      );
    }
  };

  //  Manejar eliminación de lecciones
  const handleEliminarLeccion = async (leccionId, esExistente) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta lección?")) {
      if (esExistente) {
        try {
          // Eliminar de la BD si existe
          await eliminarLeccionDeBD(leccionId);
          console.log("Lección eliminada de la BD");
        } catch (error) {
          console.error("Error eliminando lección:", error);
          alert("Error al eliminar la lección. Por favor intente nuevamente.");
          return false; // Indicar que falló
        }
      }
      return true; // Indicar que se puede eliminar del estado local
    }
    return false; // Usuario canceló
  };

  const handleFinalizarModulo = async (moduloCompleto) => {
    try {
      if (editandoModulo) {
        // Actualizar módulo existente - solo crear las nuevas lecciones
        const leccionesNuevas = moduloCompleto.lecciones.filter(leccion => !leccion.esExistente);
        
        // Crear las nuevas lecciones en la BD
        const leccionesCreadas = [];
        for (const leccion of leccionesNuevas) {
          const leccionCreada = await crearLeccionEnBD(leccion, moduloCompleto.id);
          leccionesCreadas.push({
            ...leccion,
            id: leccionCreada.numeroLec,
            esExistente: true
          });
        }
        
        // Actualizar el estado con todas las lecciones (existentes + nuevas)
        const leccionesExistentes = moduloCompleto.lecciones.filter(leccion => leccion.esExistente);
        const todasLasLecciones = [...leccionesExistentes, ...leccionesCreadas];
        
        setModulosGuardados((prev) =>
          prev.map((modulo) =>
            modulo.id === editandoModulo.id ? {
              ...moduloCompleto,
              lecciones: todasLasLecciones
            } : modulo
          )
        );
        
        alert(`Módulo "${moduloCompleto.nombre}" actualizado con ${leccionesNuevas.length} nueva(s) lección(es)`);
        setEditandoModulo(null);
      } else {
        // Crear todas las lecciones del nuevo módulo en la BD
        
        const leccionesCreadas = [];
        for (const leccion of moduloCompleto.lecciones) {
          const leccionCreada = await crearLeccionEnBD(leccion, moduloCompleto.id);
          leccionesCreadas.push({
            ...leccion,
            id: leccionCreada.numeroLec,
            esExistente: true
          });
        }
        
        const moduloConLeccionesReales = {
          ...moduloCompleto,
          lecciones: leccionesCreadas
        };
        
        setModulosGuardados((prev) => [...prev, moduloConLeccionesReales]);
        alert(`Módulo "${moduloCompleto.nombre}" guardado con ${moduloCompleto.lecciones.length} lección(es)`);
      }

      setMostrarFormularioLecciones(false);
      setModuloActual(null);
      setNombreModulo("");
    } catch (error) {
      console.error("Error al finalizar módulo:", error);
      alert("Error al guardar las lecciones. Por favor intente nuevamente.");
    }
  };

  const handleCancelarLecciones = () => {
    setMostrarFormularioLecciones(false);
    setModuloActual(null);
    setEditandoModulo(null);
    setNombreModulo("");
  };

  if (loading || error) {
    return (
      <LoadingError
        loading={loading}
        error={error}
        retry={() => window.location.reload()}
      />
    );
  }

  return (
    <main style={{ backgroundColor: "#56565641", minHeight: "100vh" }}>
      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="formulario-curso p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Editar Curso</h3>
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => navigate("/MiPerfil/misCursosCreados")}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Volver
            </button>
          </div>
          <hr />
          
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
            />

            <ListaModulos
              modulos={modulosGuardados}
              onEditarModulo={handleEditarModulo}
              onEliminarModulo={handleEliminarModulo}
            />

            {!mostrarFormularioModulo && !mostrarFormularioLecciones && (
              <>
                <div className="d-flex gap-2 mt-3">
                  <button type="button" className="btn crear" onClick={handleCrearModulo}>
                    <i className="bi bi-plus-circle"></i> Crear nuevo módulo
                  </button>
                </div>
                <div className="mt-3 finalizar">
                  <button type="submit" className="btn finalizar">
                    <i className="bi bi-check-circle"></i> Actualizar curso
                  </button>
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
                onEliminarLeccion={handleEliminarLeccion}
              />
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default EditarCursoPage;