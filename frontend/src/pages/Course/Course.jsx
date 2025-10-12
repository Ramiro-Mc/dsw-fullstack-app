import "../../App.css";
import "./Course.css";
import Accordion from "../../components/Course/Accordion.jsx";
import Contenido from "../../components/Course/Contenido.jsx";
import BarraSuperior from "../../components/Course/BarraSuperior.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Course() {
  console.log("Course esta cargando...");
  const { idCurso } = useParams(); // Obtener el ID del curso desde la URL
  const [curso, setCurso] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [claseClicked, setClaseClicked] = useState({});
  const [cantCompletada, setCantCompletada] = useState(0);

  useEffect(() => {
    if (!idCurso) {
      console.error("No se proporcionó ID de curso");
      setCargando(false);
      return;
    }

    console.log("Intentando cargar curso desde la base de datos...");
    // Usar el endpoint del curso completo
    fetch(`http://localhost:3000/cursoDetalle/${idCurso}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
              console.log("Respuesta del servidor:", response);
              
              if (!response.success) {
                throw new Error(response.msg || 'Error al cargar el curso');
              }

              const cursoData = response.contenido;
              
              // Mapear la estructura de la BD al formato esperado por el frontend
              const cursoMapeado = {
                ...cursoData,
                modulos: cursoData.Modulos.map(modulo => ({
                  ...modulo,
                  titulo: modulo.titulo,
                  lecciones: modulo.Leccions.map(leccion => ({
                    idLeccion: leccion.numeroLec,
                    tituloLeccion: leccion.tituloLec,
                    contenido: leccion.contenidoTexto,
                    videoLeccion: leccion.videoUrl,
                    completado: leccion.completado,
                    descripcion: leccion.descripcionLec,
                    horas: leccion.horasLec,
                    estado: leccion.estadoLec,
                    idModulo: leccion.idModulo
                  }))
                }))
              };
              
              console.log("Curso mapeado:", cursoMapeado);
              setCurso(cursoMapeado);
              
              // Verificar que existan módulos y lecciones antes de asignar
              if (cursoMapeado.modulos?.length > 0 && cursoMapeado.modulos[0].lecciones?.length > 0) {
                setClaseClicked(cursoMapeado.modulos[0].lecciones[0]);
              }
              
              // Calcular lecciones completadas inicial
              const leccionesCompletadas = cursoMapeado.modulos?.reduce((total, modulo) => {
                return total + (modulo.lecciones?.filter(leccion => leccion.completado).length || 0);
              }, 0) || 0;
              setCantCompletada(leccionesCompletadas);
              
              setCargando(false);
            })
      .catch((err) => {
        console.error("Error al cargar curso desde BD:", err);
        setCargando(false);
        alert(`Error al cargar el curso: ${err.message}`);
      });
  }, [idCurso]);

  const manejarClick = (clase) => {
    setClaseClicked(clase);
  };

  const completarClase = async () => {
    try {
      // Actualizar en la base de datos - usar numeroLec en lugar de idClase
      const response = await fetch(`http://localhost:3000/lecciones/${claseClicked.idLeccion}/completar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completado: !claseClicked.completado
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la lección');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.msg || 'Error al actualizar la lección');
      }

      // Actualizar el estado local si la BD se actualizó correctamente
      setCurso((prevCurso) => ({
        ...prevCurso,
        modulos: prevCurso.modulos.map((modulo) => ({
          ...modulo,
          lecciones: modulo.lecciones.map((leccion) => 
            leccion.idLeccion === claseClicked.idLeccion 
              ? { ...leccion, completado: !leccion.completado } 
              : leccion
          ),
        }))
      }));
      
      setClaseClicked({ ...claseClicked, completado: !claseClicked.completado });
      
      if (!claseClicked.completado) {
        setCantCompletada(cantCompletada + 1);
      } else {
        setCantCompletada(cantCompletada - 1);
      }
    } catch (error) {
      console.error("Error al completar lección:", error);
      alert(`Error al actualizar el progreso: ${error.message}`);
    }
  };

  if (cargando) {
    return <div className="loading-container">
      <strong>Cargando curso...</strong>
    </div>;
  }

  if (!curso) {
    return <div className="error-container">
      <strong>No se pudo cargar el curso.</strong>
    </div>;
  }

  return (
    <div className="app-container">
      <main className="main-content">
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
      </main>
    </div>
  );
}

export default Course;