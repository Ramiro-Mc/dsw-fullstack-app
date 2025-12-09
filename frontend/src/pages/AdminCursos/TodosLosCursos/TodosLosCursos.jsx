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
      const response = await fetch("/api/cursos");
      const data = await response.json();

      if (data.success) {
        setCursos(data.contenido);
      } else {
        setError("Error al cargar los cursos");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error de conexión");
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
              const response = await fetch(`/api/cursos/${idCurso}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const data = await response.json();

              if (data.success) {
                setCursos(cursos.filter((curso) => curso.idCurso !== idCurso));
                setAlert({
                  message: "Curso eliminado correctamente",
                  type: "success",
                  onClose: () => setAlert(null),
                });
              } else {
                setAlert({
                  message: "Error al eliminar el curso",
                  type: "error",
                  onClose: () => setAlert(null),
                });
              }
            } catch (err) {
              console.error("Error:", err);
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
                actions={[
                  {
                    label:
                      curso.estado === "rechazado"
                        ? "Ya eliminado"
                        : "Eliminar",
                    className: "btn-eliminar",
                    onClick: () =>
                      handleEliminarCurso(curso.idCurso, curso.titulo),
                    disabled: curso.estado === "rechazado",
                  },
                ]}
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
