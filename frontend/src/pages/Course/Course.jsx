import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import Accordion from "../../components/Course/Accordion.jsx";
import Contenido from "../../components/Course/Contenido.jsx";
import BarraSuperior from "../../components/Course/BarraSuperior.jsx";
import "../../App.css";
import "./Course.css";

function Course() {
  const { idCurso } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate(); 
  
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

        const idUsuario = user?.idUsuario || user?.id;

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

        if (idUsuario) {
          const esCreador = 
            cursoData.idProfesor === idUsuario || 
            cursoData.idProfesor === user?.idUsuario;

          if (!esCreador) {
            const resCompra = await fetch(
              `http://localhost:3000/alumnos_cursos/${idUsuario}/${idCurso}`
            );

            if (!resCompra.ok) {
              throw new Error("No tienes acceso a este curso");
            }

            const responseCompra = await resCompra.json();

            if (!responseCompra.success || !responseCompra.contenido) {
              setAlert({
                message: "No tienes acceso a este curso. Debes comprarlo primero.",
                type: "error",
                onClose: () => navigate(`/compraCurso/${idCurso}`),
              });
              setCargando(false);
              return;
            }
          }
        } else {
          setAlert({
            message: "Debes iniciar sesión para acceder a este curso",
            type: "error",
            onClose: () => navigate("/loginPage"),
          });
          setCargando(false);
          return;
        }

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
              completado: progresoUsuario[leccion.numeroLec] || false,
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

        if (
          cursoMapeado.modulos?.length > 0 &&
          cursoMapeado.modulos[0].lecciones?.length > 0
        ) {
          setClaseClicked(cursoMapeado.modulos[0].lecciones[0]);
        }

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
          message: `Error: ${err.message}`,
          type: "error",
          onClose: () => navigate("/"),
        });
      }
    };

    cargarCursoConProgreso();
  }, [idCurso, user, navigate]);

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
        <strong>Acceso a curso no autorizado.</strong>
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
