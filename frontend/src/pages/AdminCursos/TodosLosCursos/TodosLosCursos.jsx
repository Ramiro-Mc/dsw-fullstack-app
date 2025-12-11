import React, { useState, useEffect } from "react";
import AdmCursoCard from "../../../components/AdmCursoCard/AdmCursoCard";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import "./TodosLosCursos.css";

const TodosLosCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchCursos();
  }, []);

 const fetchCursos = async () => {
  try {
    setLoading(true);
    

    const response = await fetch("http://localhost:3000/api/admin/cursos/aprobados");
    const data = await response.json();

    console.log("Respuesta del backend:", data);

    if (data.success) {
      setCursos(data.contenido || []);
    } else {
      setError("Error al cargar los cursos");
      setCursos([]);
    }
  } catch (err) {
    console.error(" Error:", err);
    setError("Error de conexión");
    setCursos([]);
  } finally {
    setLoading(false);
  }
};

  const handleEliminarCurso = async (idCurso, titulo) => {
    setAlert({
      message: `¿Estás seguro de eliminar el curso "${titulo}"?`,
      type: "info",
      onClose: () => setAlert(null),
      actions: [
        {
          label: "Cancelar",
          onClick: () => setAlert(null),
        },
        {
          label: "Eliminar",
          onClick: async () => {
            setAlert(null);
            try {
              const response = await fetch(
                `http://localhost:3000/api/cursos/${idCurso}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = await response.json();

              if (data.success) {
              
                setCursos(
                  cursos.map((curso) =>
                    curso.idCurso === idCurso
                      ? { ...curso, estado: "eliminado" }
                      : curso
                  )
                );
                setAlert({
                  message: "Curso eliminado correctamente",
                  type: "success",
                  onClose: () => setAlert(null),
                });
              } else {
                setAlert({
                  message: data.msg || "Error al eliminar el curso",
                  type: "error",
                  onClose: () => setAlert(null),
                });
              }
            } catch (err) {
              console.error("❌ Error:", err);
              setAlert({
                message: "Error de conexión al eliminar",
                type: "error",
                onClose: () => setAlert(null),
              });
            }
          },
        },
      ],
    });
  };

  const handleRestaurarCurso = async (idCurso, titulo) => {
    setAlert({
      message: `¿Estás seguro de restaurar el curso "${titulo}"?`,
      type: "info",
      onClose: () => setAlert(null),
      actions: [
        {
          label: "Cancelar",
          onClick: () => setAlert(null),
        },
        {
          label: "Restaurar",
          onClick: async () => {
            setAlert(null);
            try {
              const response = await fetch(
                `http://localhost:3000/api/admin/cursos/${idCurso}/restaurar`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = await response.json();

              if (data.success) {
                setCursos(
                  cursos.map((curso) =>
                    curso.idCurso === idCurso
                      ? { ...curso, estado: "aprobado" }
                      : curso
                  )
                );
                setAlert({
                  message:
                    "Curso restaurado correctamente. Ahora está en estado aprobado.",
                  type: "success",
                  onClose: () => setAlert(null),
                });
              } else {
                setAlert({
                  message: data.msg || "Error al restaurar el curso",
                  type: "error",
                  onClose: () => setAlert(null),
                });
              }
            } catch (err) {
              console.error("Error:", err);
              setAlert({
                message: "Error de conexión al restaurar",
                type: "error",
                onClose: () => setAlert(null),
              });
            }
          },
        },
      ],
    });
  };

  if (loading) {
    return (
      <div className="todos-cursos">
        <div className="container">
          <h1>Todos los Cursos</h1>
          <div className="loading">
            <p>Cargando cursos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todos-cursos">
        <div className="container">
          <h1>Todos los Cursos</h1>
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={fetchCursos} className="retry-btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todos-cursos">
      <div className="container">
        <div className="header">
          <h1>Todos los Cursos</h1>
          <p className="subtitle">Total de cursos: {cursos.length}</p>
        </div>

        {cursos.length === 0 ? (
          <div className="empty-state">
            <p>No hay cursos disponibles</p>
          </div>
        ) : (
          <div className="cursos-grid">
            {cursos.map((curso) => (
              <AdmCursoCard
                key={curso.idCurso}
                curso={curso}
                variant="admin"
                showEstado={true}
                actions={
                  curso.estado === "eliminado"
                    ? [
                        {
                          label: "Restaurar",
                          className: "btn-restaurar",
                          onClick: () =>
                            handleRestaurarCurso(curso.idCurso, curso.titulo),
                        },
                      ]
                    : [
                        {
                          label: "Eliminar",
                          className: "btn-eliminar",
                          onClick: () =>
                            handleEliminarCurso(curso.idCurso, curso.titulo),
                        },
                      ]
                }
              />
            ))}
          </div>
        )}
      </div>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          actions={alert.actions}
          onClose={() => {
            setAlert(null);
            if (alert.onClose) alert.onClose();
          }}
        />
      )}
    </div>
  );
};

export default TodosLosCursos;
