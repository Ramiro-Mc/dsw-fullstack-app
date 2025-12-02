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
  // Eliminar esta línea ya que no la usamos
  // const [cursoOriginal, setCursoOriginal] = useState(null);

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
        // Usar el endpoint de cursoDetalle que ya existe
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

        // Eliminar esta línea también
        // setCursoOriginal(curso);
        setNombreCurso(curso.titulo);
        setDescripcionCurso(curso.descripcion);
        setPrecioCurso(curso.precio.toString());
        setModuloSeleccionado(curso.idTipo.toString());

        // Convertir módulos al formato esperado
        const modulosFormateados = curso.Modulos?.map(modulo => ({
          id: modulo.idModulo,
          nombre: modulo.titulo,
          lecciones: modulo.Lecciones?.map(leccion => ({
            tituloLec: leccion.tituloLec,
            descripcion: leccion.descripcionLec,
            horas: leccion.horasLec?.toString() || "",
            videoUrl: leccion.videoUrl || "",
            contenidoTexto: leccion.contenidoTexto || "",
            imagenUrl: leccion.imagenUrl || "",
            archivoUrl: leccion.archivoUrl || ""
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
      navigate("/MiPerfil/misCursosCreados"); // Corregir la ruta
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

  const handleGuardarModulo = (nombreModulo) => {
    if (!nombreModulo.trim()) {
      alert("El nombre del módulo es requerido");
      return;
    }

    const nuevoModulo = {
      id: Date.now(),
      nombre: nombreModulo,
      lecciones: [],
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
      setModulosGuardados((prev) =>
        prev.filter((modulo) => modulo.id !== moduloId)
      );
    }
  };

  const handleFinalizarModulo = (moduloCompleto) => {
    if (editandoModulo) {
      setModulosGuardados((prev) =>
        prev.map((modulo) =>
          modulo.id === editandoModulo.id ? moduloCompleto : modulo
        )
      );
      alert(`Módulo "${moduloCompleto.nombre}" actualizado`);
      setEditandoModulo(null);
    } else {
      setModulosGuardados((prev) => [...prev, moduloCompleto]);
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
              onClick={() => navigate("/MiPerfil/misCursosCreados")} // Corregir la ruta
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
              />
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default EditarCursoPage;