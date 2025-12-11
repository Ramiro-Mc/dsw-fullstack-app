import React, { useState, useEffect } from "react";
import AdmCursoCard from "../../../components/AdmCursoCard/AdmCursoCard";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import "./SolicitudesPendientes.css";

const SolicitudesPendientes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/cursos/pendientes");
      const data = await response.json();

      console.log(" Respuesta del backend:", data);

      if (data.success) {
        setSolicitudes(data.contenido || data.informacion || []);
        console.log(" Solicitudes cargadas:", data.contenido || data.informacion);
      } else {
        setError("Error al cargar las solicitudes");
      }
    } catch (err) {
      console.error(" Error:", err);
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleAprobarCurso = async (idCurso, titulo) => {
    setAlert({
      message: `¿Aprobar el curso "${titulo}"?`,
      type: "info",
      onClose: () => setAlert(null),
      actions: [
        {
          label: "Cancelar",
          onClick: () => setAlert(null),
        },
        {
          label: "Aprobar",
          onClick: async () => {
            setAlert(null);
            try {
              const response = await fetch(
                `/api/admin/cursos/${idCurso}/aprobar`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = await response.json();

              if (data.success) {
                setSolicitudes(
                  solicitudes.filter((curso) => curso.idCurso !== idCurso)
                );
                setAlert({
                  message: "Curso aprobado correctamente",
                  type: "success",
                  onClose: () => setAlert(null),
                });
              } else {
                setAlert({
                  message: data.msg || "Error al aprobar el curso",
                  type: "error",
                  onClose: () => setAlert(null),
                });
              }
            } catch (err) {
              console.error("❌ Error:", err);
              setAlert({
                message: "Error de conexión al aprobar",
                type: "error",
                onClose: () => setAlert(null),
              });
            }
          },
        },
      ],
    });
  };

  const handleRechazarCurso = async (idCurso, titulo) => {
    setAlert({
      message: `¿Rechazar el curso "${titulo}"?`,
      type: "warning",
      onClose: () => setAlert(null),
      actions: [
        {
          label: "Cancelar",
          onClick: () => setAlert(null),
        },
        {
          label: "Rechazar",
          onClick: async () => {
            setAlert(null);
            try {
              const response = await fetch(`/api/admin/cursos/${idCurso}/rechazar`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const data = await response.json();

              if (data.success) {
                setSolicitudes(
                  solicitudes.filter((curso) => curso.idCurso !== idCurso)
                );
                setAlert({
                  message: "Curso rechazado correctamente",
                  type: "success",
                  onClose: () => setAlert(null),
                });
              } else {
                setAlert({
                  message: data.msg || "Error al rechazar el curso",
                  type: "error",
                  onClose: () => setAlert(null),
                });
              }
            } catch (err) {
              console.error("❌ Error:", err);
              setAlert({
                message: "Error de conexión al rechazar",
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
      <div className="solicitudes-pendientes">
        <div className="container">
          <h1>Solicitudes Pendientes</h1>
          <div className="loading">
            <p>Cargando solicitudes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="solicitudes-pendientes">
        <div className="container">
          <h1>Solicitudes Pendientes</h1>
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={fetchSolicitudes} className="retry-btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="solicitudes-pendientes">
      <div className="container">
        <div className="header">
          <h1>Solicitudes Pendientes</h1>
          <p className="subtitle">
            {solicitudes.length === 0
              ? "No hay solicitudes pendientes"
              : `${solicitudes.length} solicitud${
                  solicitudes.length !== 1 ? "es" : ""
                } pendiente${solicitudes.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {solicitudes.length === 0 ? (
          <div className="empty-state">
            <h3>¡Todo al día!</h3>
            <p>No hay solicitudes de cursos pendientes de revisión</p>
          </div>
        ) : (
          <div className="solicitudes-grid">
            {solicitudes.map((curso) => (
              <AdmCursoCard
                key={curso.idCurso}
                curso={curso}
                variant="pendiente"
                actions={[
                  {
                    label: "✓ Aprobar",
                    className: "btn-aprobar",
                    onClick: () =>
                      handleAprobarCurso(curso.idCurso, curso.titulo),
                  },
                  {
                    label: "✗ Rechazar",
                    className: "btn-rechazar",
                    onClick: () =>
                      handleRechazarCurso(curso.idCurso, curso.titulo),
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

export default SolicitudesPendientes;