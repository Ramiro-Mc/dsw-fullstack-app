import "../../App.css";
import "./Course.css";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import Accordion from "../../components/Course/Accordion.jsx";
import Contenido from "../../components/Course/Contenido.jsx";
import BarraSuperior from "../../components/Course/BarraSuperior.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Course() {
  console.log("Course esta cargando...");
  const { idCurso } = useParams(); // Obtener el ID del curso desde la URL
  const { user } = useAuth(); // Usar el contexto de autenticación
  const [curso, setCurso] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [claseClicked, setClaseClicked] = useState({});
  const [cantCompletada, setCantCompletada] = useState(0);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!idCurso) {
      console.error("No se proporcionó ID de curso");
      setCargando(false);
      return;
    }

    const cargarCursoConProgreso = async () => {
      try {
        console.log("Intentando cargar curso desde la base de datos...");

        // Obtener el usuario desde el contexto
        const idUsuario = user?.idUsuario || user?.id;

        // Cargar el curso
        const resCurso = await fetch(
          `http://localhost:3000/cursoDetalle/${idCurso}`
        );
        if (!resCurso.ok) {
          throw new Error(`HTTP error! status: ${resCurso.status}`);
        }

        const responseCurso = await resCurso.json();
        if (!responseCurso.success) {
          throw new Error(responseCurso.msg || "Error al cargar el curso");
        }

        const cursoData = responseCurso.contenido;

        // Si hay usuario logueado, cargar su progreso
        let progresoUsuario = {};
        if (idUsuario) {
          try {
            const resProgreso = await fetch(
              `http://localhost:3000/progreso/${idUsuario}/${idCurso}`
            );
            if (resProgreso.ok) {
              const responseProgreso = await resProgreso.json();
              if (responseProgreso.success && responseProgreso.contenido) {
                responseProgreso.contenido.forEach((p) => {
                  progresoUsuario[p.numeroLec] = p.completado;
                });
                console.log("Progreso cargado:", progresoUsuario);
              }
            }
          } catch (err) {
            console.error("Error al cargar progreso del usuario:", err);
          }
        }

        // Mapear la estructura de la BD al formato esperado por el frontend
        const cursoMapeado = {
          ...cursoData,
          modulos: cursoData.Modulos.map((modulo) => ({
            ...modulo,
            titulo: modulo.titulo,
            lecciones: modulo.Lecciones.map((leccion) => ({
              idLeccion: leccion.numeroLec,
              tituloLeccion: leccion.tituloLec,
              contenido: leccion.contenidoTexto,
              videoLeccion: leccion.videoUrl,
              completado: progresoUsuario[leccion.numeroLec] || false, // Usar progreso del usuario
              descripcion: leccion.descripcionLec,
              horas: leccion.horasLec,
              estado: leccion.estadoLec,
              imagenUrl: leccion.imagenUrl,
              archivoUrl: leccion.archivoUrl,
              idModulo: leccion.idModulo,
            })),
          })),
        };

        console.log("Curso mapeado:", cursoMapeado);
        setCurso(cursoMapeado);

        // Verificar que existan módulos y lecciones antes de asignar
        if (
          cursoMapeado.modulos?.length > 0 &&
          cursoMapeado.modulos[0].lecciones?.length > 0
        ) {
          setClaseClicked(cursoMapeado.modulos[0].lecciones[0]);
        }

        // Calcular lecciones completadas inicial
        const leccionesCompletadas =
          cursoMapeado.modulos?.reduce((total, modulo) => {
            return (
              total +
              (modulo.lecciones?.filter((leccion) => leccion.completado)
                .length || 0)
            );
          }, 0) || 0;
        setCantCompletada(leccionesCompletadas);

        setCargando(false);
      } catch (err) {
        console.error("Error al cargar curso desde BD:", err);
        setCargando(false);
        setAlert({
          message: `Error al cargar el curso: ${err.message}`,
          type: "error",
          onClose: () => setAlert(null),
        });
      }
    };

    cargarCursoConProgreso();
  }, [idCurso, user]); // Agregar user como dependencia

  const manejarClick = (clase) => {
    setClaseClicked(clase);
  };

  const completarClase = async () => {
    try {
      const idUsuario = user?.idUsuario || user?.id;

      if (!idUsuario) {
        setAlert({
          message: "Debes estar logueado para marcar el progreso",
          type: "error",
          onClose: () => setAlert(null),
        });
        return;
      }

      const nuevoEstado = !claseClicked.completado;

      // Actualizar en la base de datos
      const response = await fetch(
        `http://localhost:3000/lecciones/${claseClicked.idLeccion}/completar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completado: nuevoEstado,
            idUsuario: idUsuario,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la lección");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.msg || "Error al actualizar la lección");
      }

      // Actualizar estado local después de confirmar en BD
      setCurso((prevCurso) => ({
        ...prevCurso,
        modulos: prevCurso.modulos.map((modulo) => ({
          ...modulo,
          lecciones: modulo.lecciones.map((leccion) =>
            leccion.idLeccion === claseClicked.idLeccion
              ? { ...leccion, completado: nuevoEstado }
              : leccion
          ),
        })),
      }));

      setClaseClicked({
        ...claseClicked,
        completado: nuevoEstado,
      });

      // Actualizar contador
      setCantCompletada(nuevoEstado ? cantCompletada + 1 : cantCompletada - 1);

      setAlert({
        message: nuevoEstado
          ? "Lección marcada como completada"
          : "Lección desmarcada",
        type: "success",
        onClose: () => setAlert(null),
      });
    } catch (error) {
      console.error("Error al completar lección:", error);
      setAlert({
        message: `Error al actualizar el progreso: ${error.message}`,
        type: "error",
        onClose: () => setAlert(null),
      });
    }
  };

  if (cargando) {
    return (
      <div className="loading-container">
        <strong>Cargando curso...</strong>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="error-container">
        <strong>No se pudo cargar el curso.</strong>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <Accordion
                modulos={curso.modulos}
                manejarClick={manejarClick}
                claseClicked={claseClicked}
              />
            </div>

            <div className="col-9">
              <BarraSuperior
                completarClase={completarClase}
                claseClicked={claseClicked}
                cantCompletada={cantCompletada}
                modulos={curso.modulos}
                curso={curso}
              />
              <Contenido claseClicked={claseClicked} />
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default Course;
