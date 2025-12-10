import React, { useState, useEffect } from "react";
import "./MisCursosCreados.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CursoCardPerfil from "../../components/MiPerfil/CursoCardPerfil";
import LoadingError from "../../components/LoadingError/LoadingError";

function MisCursosCreados() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cursos, setCursos] = useState([]);

  const [cursoEditandoDesc, setCursoEditandoDesc] = useState(null);
  const [descuento, setDescuento] = useState(0);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const editar = (idCurso, valorDescuento) => {
    setCursoEditandoDesc(idCurso);
    setDescuento(valorDescuento);
  };

  const handleDescuentoChange = (e) => {
    setDescuento(e.target.value);
  };

  const eliminarDesc = async (idCurso) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/cursos/${idCurso}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descuento: 0,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCursos(
          cursos.map((c) =>
            c.idCurso === idCurso ? { ...c, descuento: 0 } : c
          )
        );
        setCursoEditandoDesc(null);
        setAlert({
          message: "Descuento eliminado correctamente",
          type: "success",
          onClose: () => setAlert(null),
        });
      } else {
        setAlert({
          message:
            "Error al eliminar el descuento: " +
            (data.msg || "Error desconocido"),
          type: "error",
          onClose: () => setAlert(null),
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        message: "Error al conectar con el servidor",
        type: "error",
        onClose: () => setAlert(null),
      });
    }
  };

  const handleGuardar = async () => {
    // Validación frontend
    const valor = Number(descuento);
    if (isNaN(valor) || valor <= 0 || valor > 100) {
      setAlert({
        message: "El descuento debe ser mayor a 0 y menor a 100",
        type: "error",
        onClose: () => setAlert(null),
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/cursos/${cursoEditandoDesc}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descuento: descuento,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCursos(
          cursos.map((c) =>
            c.idCurso === cursoEditandoDesc ? { ...c, descuento: descuento } : c
          )
        );
        setCursoEditandoDesc(null);
        setAlert({
          message: "Información actualizada correctamente",
          type: "success",
          onClose: () => setAlert(null),
        });
      } else {
        setAlert({
          message: "Error al actualizar la información: " + data.msg,
          type: "error",
          onClose: () => setAlert(null),
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        message: "Error al conectar con el servidor",
        type: "error",
        onClose: () => setAlert(null),
      });
    }
  };

  const handleCrearClick = async () => {
    try {
      const res = await fetch(`http://localhost:3000/usuarios/${user.id}`);
      const data = await res.json();
      if (!data.success)
        throw new Error(data.msg || "No se pudo obtener el usuario");

      const u = data.informacion || data.contenido || data.usuario || {};
      const tienePerfil = !!u.descripcion;
      const tieneCobro = !!u.cvu;

      if (tienePerfil && tieneCobro) {
        navigate("/crearCurso");
        return;
      }

      setAlert({
        message: "Para crear un curso primero completa:",
        type: "info",
        actions: [
          !tienePerfil && {
            label: "Información personal",
            onClick: () => navigate("/MiPerfil"),
          },
          !tieneCobro && {
            label: "Información de cobro",
            onClick: () => navigate("/MiPerfil/InformacionDeCobro"),
          },
        ].filter(Boolean),
        onClose: () => setAlert(null),
      });
    } catch (error) {
      console.error(error);
      setAlert({
        message: "Error al validar tus datos. Intenta de nuevo.",
        type: "error",
        onClose: () => setAlert(null),
      });
    }
  };

  useEffect(() => {
    const fetchCursosUsuario = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/cursos?idProfesor=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (data.success) {
          setCursos(data.contenido);
        } else if (data.msg === "No hay cursos") {
          // Si no hay cursos, no es un error, solo dejamos el array vacío
          setCursos([]);
        } else {
          setError(data.msg || "Error al cargar cursos");
        }
      } catch (error) {
        console.error("Error al cargar curso:", error);
        setError("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchCursosUsuario(user.id);
    } else if (user !== undefined) {
      setLoading(false);
    }
  }, [user, authLoading]);

  return (
    <div className="contenedor-mis-cursos">
      <div className="container">
        {loading || error ? (
          <LoadingError
            loading={loading}
            error={error}
            retry={() => window.location.reload()}
          />
        ) : cursos.length > 0 ? (
          <>
            <h3>Administra tus cursos</h3>
            {cursos.map((curso) => (
              <CursoCardPerfil
                key={curso.idCurso}
                idCurso={curso.idCurso}
                titulo={curso.titulo}
                descripcion={curso.descripcion}
                precio={curso.precio}
                imagen={curso.imagen || "/principal1.jpeg"}
                descuento={curso.descuento}
                estado={curso.estado}
                editar={() => editar(curso.idCurso, curso.descuento)}
                agregandoDesc={cursoEditandoDesc === curso.idCurso}
                handleDescuentoChange={handleDescuentoChange}
                handleGuardar={handleGuardar}
                eliminarDesc={() => eliminarDesc(curso.idCurso)}
              />
            ))}
            {/* Botón para crear más cursos cuando ya tiene cursos */}
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCrearClick}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Crear nuevo curso
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div
              className="no-cursos-icon"
              style={{ fontSize: "4rem", marginBottom: "1rem" }}
            >
              📚
            </div>
            <h4>Aún no has creado ningún curso</h4>
            <p className="mb-3">
              ¡Comienza a compartir tu conocimiento y crea tu primer curso!
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCrearClick}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Crear mi primer curso
            </button>
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
          actions={alert.actions}
        />
      )}
    </div>
  );
}

export default MisCursosCreados;
