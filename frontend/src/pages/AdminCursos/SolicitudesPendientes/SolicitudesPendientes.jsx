import React, { useState, useEffect } from "react";
import AdmCursoCard from "../../../components/AdmCursoCard/AdmCursoCard";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import "./SolicitudesPendientes.css";

const SolicitudesPendientes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [mostrarInputMotivo, setMostrarInputMotivo] = useState(false);
  const [cursoParaRechazar, setCursoParaRechazar] = useState(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/cursos/pendientes");
      const data = await response.json();

      if (data.success) {
        setSolicitudes(data.informacion);
      } else {
        setError("Error al cargar las solicitudes");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleAprobarCurso = async (idCurso, titulo) => {
    setAlert({
      message: `¿Aprobar el curso "${titulo}"?`,
      type: "info",
      onClose: async () => {
        setAlert(null);
        try {
          const response = await fetch(`/api/admin/cursos/${idCurso}/aprobar`, {
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
              message: "Curso aprobado correctamente",
              type: "success",
              onClose: () => setAlert(null),
            });
          } else {
            setAlert({
              message: "Error al aprobar el curso",
              type: "error",
              onClose: () => setAlert(null),
            });
          }
        } catch (err) {
          console.error("Error:", err);
          setAlert({
            message: "Error de conexión al aprobar",
            type: "error",
            onClose: () => setAlert(null),
          });
        }
      },
    });
  };

  const handleRechazarCurso = async (idCurso, titulo) => {
    setCursoParaRechazar({ idCurso, titulo });
    setMostrarInputMotivo(true);
  };

  const confirmarRechazo = async () => {
    if (!cursoParaRechazar) return;

    const { idCurso, titulo } = cursoParaRechazar;

    try {
      const response = await fetch(`/api/admin/cursos/${idCurso}/rechazar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motivo: motivoRechazo || "Sin motivo especificado",
        }),
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
          message: "Error al rechazar el curso",
          type: "error",
          onClose: () => setAlert(null),
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setAlert({
        message: "Error de conexión al rechazar",
        type: "error",
        onClose: () => setAlert(null),
      });
    } finally {
      setMostrarInputMotivo(false);
      setMotivoRechazo("");
      setCursoParaRechazar(null);
    }
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
          onClose={() => {
            setAlert(null);
            if (alert.onClose) alert.onClose();
          }}
        />
      )}
      {mostrarInputMotivo && (
        <div
          className="custom-alert-overlay"
          onClick={() => setMostrarInputMotivo(false)}
        >
          <div
            className="custom-alert-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="custom-alert-header info">!</div>
            <div className="custom-alert-body">
              <p>¿Por qué rechazar "{cursoParaRechazar?.titulo}"?</p>
              <textarea
                value={motivoRechazo}
                onChange={(e) => setMotivoRechazo(e.target.value)}
                placeholder="Motivo del rechazo (opcional)"
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>
            <div className="custom-alert-footer">
              <button
                className="custom-alert-btn"
                onClick={() => setMostrarInputMotivo(false)}
                style={{ marginRight: "10px", background: "#6c757d" }}
              >
                Cancelar
              </button>
              <button className="custom-alert-btn" onClick={confirmarRechazo}>
                Rechazar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitudesPendientes;
