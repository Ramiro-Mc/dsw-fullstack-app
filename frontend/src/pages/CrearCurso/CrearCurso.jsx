import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import FormularioCurso from "../../components/crearCurso/FormularioCurso";
import ListaModulos from "../../components/crearCurso/ListaModulos";
import FormularioModulo from "../../components/crearCurso/FormularioModulo";
import FormularioLecciones from "../../components/crearCurso/FormularioLecciones";
import "./CrearCurso.css";

function CrearCursoPage() {
  const { user } = useAuth(); // Obtener el usuario del contexto (puede ser 'user' o 'usuario')
  const [moduloSeleccionado, setModuloSeleccionado] = useState("");
  const [mostrarFormularioModulo, setMostrarFormularioModulo] = useState(false);
  const [mostrarFormularioLecciones, setMostrarFormularioLecciones] =
    useState(false);
  const [alert, setAlert] = useState(null);

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
      const response = await fetch("http://localhost:3000/tipos-curso");
      const tipos = await response.json();
      setTiposCurso(tipos);
    } catch (error) {
      console.error("Error al cargar tipos de curso:", error);
    }
  };

  useEffect(() => {
    cargarTiposCurso();
  }, []);

  // Función para crear el curso completo
  const crearCursoCompleto = async (datoCurso) => {
    try {
      const response = await fetch("http://localhost:3000/cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datoCurso),
      });

      if (!response.ok) {
        throw new Error("Error al crear el curso");
      }

      const cursoCreado = await response.json();
      return cursoCreado;
    } catch (error) {
      console.error("Error:", error);
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
      setAlert({
        message: "El nombre del módulo es requerido",
        type: "error",
        onClose: () => setAlert(null),
      });
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

  const confirmarEliminarModulo = (moduloId) => {
    setAlert({
      message: "¿Está seguro de que desea eliminar este módulo?",
      type: "info",
      onClose: () => {
        setModulosGuardados((prev) =>
          prev.filter((modulo) => modulo.id !== moduloId)
        );
        setAlert(null);
      },
    });
  };

  const handleEditarModulo = (modulo) => {
    setEditandoModulo(modulo);
    setModuloActual(modulo);
    setNombreModulo(modulo.nombre);
    setMostrarFormularioLecciones(true);
  };

  const handleEliminarModulo = (moduloId) => {
    confirmarEliminarModulo(moduloId);
  };

  const handleFinalizarModulo = (moduloCompleto) => {
    if (editandoModulo) {
      setModulosGuardados((prev) =>
        prev.map((modulo) =>
          modulo.id === editandoModulo.id ? moduloCompleto : modulo
        )
      );
      setAlert({
        message: `Módulo "${moduloCompleto.nombre}" actualizado`,
        type: "success",
        onClose: () => setAlert(null),
      });
      setEditandoModulo(null);
    } else {
      setModulosGuardados((prev) => [...prev, moduloCompleto]);
      setAlert({
        message: `Módulo "${moduloCompleto.nombre}" guardado con ${moduloCompleto.lecciones.length} lección(es)`,
        type: "success",
        onClose: () => setAlert(null),
      });
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
    if (
      !nombreCurso.trim() ||
      !descripcionCurso.trim() ||
      !precioCurso.trim() ||
      !moduloSeleccionado
    ) {
      setAlert({
        message: "Por favor complete todos los campos del curso",
        type: "error",
        onClose: () => setAlert(null),
      });
      return;
    }

    if (modulosGuardados.length === 0) {
      setAlert({
        message: "Debe agregar al menos un módulo al curso",
        type: "error",
        onClose: () => setAlert(null),
      });
      return;
    }

    const idProfesor = user?.idUsuario || user?.id;

    if (!idProfesor) {
      setAlert({
        message:
          "Error: No se pudo identificar al profesor. Por favor inicie sesión nuevamente.",
        type: "error",
        onClose: () => setAlert(null),
      });

      return;
    }

    modulosGuardados.forEach((modulo, index) => {
      console.log(`Módulo ${index + 1}:`, modulo);
      console.log(`Lecciones del módulo ${index + 1}:`, modulo.lecciones);
      modulo.lecciones?.forEach((leccion, lecIndex) => {
        console.log(`  Lección ${lecIndex + 1}:`, leccion);
        console.log(`  Título de lección ${lecIndex + 1}:`, leccion.tituloLec);
      });
    });

    const cursoCompleto = {
      titulo: nombreCurso,
      descripcion: descripcionCurso,
      precio: parseFloat(precioCurso),
      idTipo: parseInt(moduloSeleccionado),
      idProfesor: idProfesor,
      modulos: modulosGuardados.map((modulo) => ({
        titulo: modulo.nombre,
        lecciones: modulo.lecciones.map((leccion) => ({
          tituloLec: leccion.tituloLec,
          descripcionLec: leccion.descripcion || null,
          horasLec: leccion.horas ? parseInt(leccion.horas) : null,
          videoUrl: leccion.videoUrl || null,
          contenidoTexto: leccion.contenidoTexto || null,
          imagenUrl: leccion.imagenUrl || null,
          archivoUrl: leccion.archivoUrl || null,
          estadoLec: "activo",
          completado: false,
        })),
      })),
    };

    try {
      await crearCursoCompleto(cursoCompleto);
      setAlert({
        message: "¡Curso creado exitosamente!",
        type: "success",
        onClose: () => setAlert(null),
      });
      // Limpiar formulario
      setNombreCurso("");
      setDescripcionCurso("");
      setPrecioCurso("");
      setModuloSeleccionado("");
      setModulosGuardados([]);
    } catch (error) {
      console.error("Error al crear curso:", error);
      setAlert({
        message: "Error al crear el curso. Por favor intente nuevamente.",
        type: "error",
        onClose: () => setAlert(null),
      });
    }
  };

  return (
    <main style={{ backgroundColor: "#56565641", minHeight: "100vh" }}>
      <section
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="formulario-curso p-4">
          <h3>Nuevo Curso</h3>
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
                    <button type="submit" className="btn finalizar">
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
    </main>
  );
}

export default CrearCursoPage;
