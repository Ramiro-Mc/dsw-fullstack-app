import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./MisCursosComprados.css";
import LoadingError from "../../components/LoadingError/LoadingError";

function MisCursosComprados() {
  const [cursosComprados, setCursosComprados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchCursosComprados = async () => {
      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/alumnos_cursos/usuario/${user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setCursosComprados(data.contenido);
        } else {
          setError(data.msg || "Error al cargar cursos");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    if (user !== undefined) {
      fetchCursosComprados();
    }
  }, [user]);

  if (loading || error) {
    return <LoadingError loading={loading} error={error} retry={() => window.location.reload()} />;
  }

  return (
    <div className="mis-cursos-comprados">
      <div className="header">
        <h1>Mis Cursos Comprados</h1>
        <p>Aquí encontrarás todos los cursos que has adquirido</p>
      </div>

      {cursosComprados.length === 0 ? (
        <div className="no-cursos">
          <div className="no-cursos-icon">📚</div>
          <h3>Aún no has comprado ningún curso</h3>
          <p>Explora nuestro catálogo y encuentra el curso perfecto para ti</p>
          <Link to="/" className="btn-explorar">
            Explorar Cursos
          </Link>
        </div>
      ) : (
        <div className="cursos-container">
          <div className="cursos-stats">
            <p>
              Total de cursos: <strong>{cursosComprados.length}</strong>
            </p>
          </div>

          <div className="cursos-grid">
            {cursosComprados.map((compra) => (
              <div key={compra.idCurso} className="curso-card">
                <div className="curso-imagen">
                  <img
                    src={compra.Curso.imagen}
                    alt={compra.Curso.titulo}
                    onError={(e) => {
                      e.target.src = "/default-course.jpg";
                    }}
                  />
                  <div className="curso-estado">
                    <span className="badge-comprado">Comprado</span>
                  </div>
                </div>

                <div className="curso-info">
                  <h3 className="curso-titulo">{compra.Curso.titulo}</h3>
                  <p className="curso-descripcion">
                    {compra.Curso.descripcion?.substring(0, 100)}
                    {compra.Curso.descripcion?.length > 100 ? "..." : ""}
                  </p>

                  <div className="curso-detalles">
                    <div className="instructor">
                      <i className="bi bi-person-circle"></i>
                      <span>Por: {compra.Curso.Creador?.nombreUsuario || "Instructor"}</span>
                    </div>

                    <div className="fecha-compra">
                      <i className="bi bi-calendar-check"></i>
                      <span>Comprado: {new Date(compra.fechaCompra).toLocaleDateString("es-ES")}</span>
                    </div>

                    <div className="precio-pagado">
                      <i className="bi bi-currency-dollar"></i>
                      <span>
                        Pagaste: <strong>${compra.precioCompra}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="curso-acciones">
                    <Link 
                      to={`/foro/${compra.idCurso}`} 
                      className="btn-foro"
                      title="Ir al foro del curso"
                    >
                      <i className="bi bi-chat-dots"></i>
                      Ver Foro
                    </Link>

                    <div className="acciones-secundarias">
                      <Link to={`/course/${compra.idCurso}`} className="btn-continuar">
                        <i className="bi bi-play-circle"></i>
                        Continuar curso
                      </Link>

                      <button className="btn-detalles" title="Ver detalles">
                        <Link to={`/compraCurso/${compra.idCurso}`}>
                          <i className="bi bi-info-circle"></i>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MisCursosComprados;