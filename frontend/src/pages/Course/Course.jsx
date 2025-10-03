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
        console.log("Curso cargado desde BD:", cursoData);
        setCurso(cursoData);
        
        // Verificar que existan módulos y clases antes de asignar
        if (cursoData.modulos?.length > 0 && cursoData.modulos[0].clases?.length > 0) {
          setClaseClicked(cursoData.modulos[0].clases[0]);
        }
        
        // Calcular clases completadas inicial
        const clasesCompletadas = cursoData.modulos?.reduce((total, modulo) => {
          return total + (modulo.clases?.filter(clase => clase.completado).length || 0);
        }, 0) || 0;
        setCantCompletada(clasesCompletadas);
        
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
      // Actualizar en la base de datos
      const response = await fetch(`http://localhost:3000/api/clases/${claseClicked.idClase}/completar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completado: !claseClicked.completado
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la clase');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.msg || 'Error al actualizar la clase');
      }

      // Actualizar el estado local si la BD se actualizó correctamente
      setCurso((prevCurso) => ({
        ...prevCurso,
        modulos: prevCurso.modulos.map((modulo) => ({
          ...modulo,
          clases: modulo.clases.map((clase) => 
            clase.idClase === claseClicked.idClase 
              ? { ...clase, completado: !clase.completado } 
              : clase
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
      console.error("Error al completar clase:", error);
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