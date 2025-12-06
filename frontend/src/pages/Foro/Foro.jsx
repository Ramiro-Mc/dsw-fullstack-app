import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Foro.css";

function Foro() {
  const { idCurso } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [curso, setCurso] = useState(null);
  const [comunidad, setComunidad] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevaPublicacion, setNuevaPublicacion] = useState("");
  const [respuestas, setRespuestas] = useState({}); // { idPublicacion: "texto respuesta" }
  const [mostrarRespuesta, setMostrarRespuesta] = useState({}); // { idPublicacion: true/false }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCursoYComunidad = async () => {
      try {
        // Cargar información del curso
        const responseCurso = await fetch(`http://localhost:3000/api/cursos/${idCurso}`);
        const dataCurso = await responseCurso.json();
        
        if (dataCurso.success) {
          setCurso(dataCurso.contenido);
        }

        // Cargar comunidad del curso
        const responseComunidad = await fetch(`http://localhost:3000/comunidades/curso/${idCurso}`);
        const dataComunidad = await responseComunidad.json();
        
        if (dataComunidad.success) {
          setComunidad(dataComunidad.contenido);
          
          // Cargar publicaciones de la comunidad
          const responsePublicaciones = await fetch(
            `http://localhost:3000/publicaciones/comunidad/${dataComunidad.contenido.idComunidad}`
          );
          const dataPublicaciones = await responsePublicaciones.json();
          
          if (dataPublicaciones.success) {
            setPublicaciones(dataPublicaciones.contenido);
          }
        } else {
          setError("Este curso no tiene comunidad asociada");
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError("Error al cargar información del foro");
      } finally {
        setLoading(false);
      }
    };

    fetchCursoYComunidad();
  }, [idCurso]);

  const handlePublicar = async (e) => {
    e.preventDefault();
    
    if (!nuevaPublicacion.trim()) return;

    if (!user?.idUsuario && !user?.id) {
      setError("Debes estar logueado para publicar");
      return;
    }

    if (!comunidad?.idComunidad) {
      setError("No se puede publicar sin comunidad");
      return;
    }

    try {
      const idUsuario = user?.idUsuario || user?.id;

      const response = await fetch("http://localhost:3000/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: "Publicación",
          contenido: nuevaPublicacion,
          idComunidad: comunidad.idComunidad,
          idUsuario: idUsuario,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Agregar la nueva publicación con array de respuestas vacío
        setPublicaciones([{ ...data.contenido, Respuestas: [] }, ...publicaciones]);
        setNuevaPublicacion("");
        setError("");
      } else {
        setError(data.msg || "Error al crear publicación");
      }
    } catch (error) {
      console.error("Error al publicar:", error);
      setError("Error al crear la publicación");
    }
  };

  const handleResponder = async (idPublicacion) => {
    const textoRespuesta = respuestas[idPublicacion];
    
    if (!textoRespuesta?.trim()) return;

    if (!user?.idUsuario && !user?.id) {
      setError("Debes estar logueado para responder");
      return;
    }

    try {
      const idUsuario = user?.idUsuario || user?.id;

      const response = await fetch("http://localhost:3000/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: "Respuesta",
          contenido: textoRespuesta,
          idComunidad: comunidad.idComunidad,
          idUsuario: idUsuario,
          idPublicacionPadre: idPublicacion,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Actualizar el estado local agregando la respuesta
        setPublicaciones(publicaciones.map(pub => {
          if (pub.idPublicacion === idPublicacion) {
            return {
              ...pub,
              Respuestas: [...(pub.Respuestas || []), data.contenido]
            };
          }
          return pub;
        }));

        // Limpiar el campo de respuesta
        setRespuestas({ ...respuestas, [idPublicacion]: "" });
        setMostrarRespuesta({ ...mostrarRespuesta, [idPublicacion]: false });
        setError("");
      } else {
        setError(data.msg || "Error al crear respuesta");
      }
    } catch (error) {
      console.error("Error al responder:", error);
      setError("Error al crear la respuesta");
    }
  };

  const toggleMostrarRespuesta = (idPublicacion) => {
    setMostrarRespuesta({
      ...mostrarRespuesta,
      [idPublicacion]: !mostrarRespuesta[idPublicacion]
    });
  };

  if (loading) {
    return (
      <main className="foro-container">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="foro-container">
      <div className="foro-header">
        <div className="container">
          <button 
            className="btn btn-link text-white mb-3" 
            onClick={() => navigate(`/course/${idCurso}`)}
          >
            <i className="bi bi-arrow-left"></i> Volver al curso
          </button>
          <h1>Foro de {curso?.titulo || "Cargando..."}</h1>
          {comunidad && <h2>{comunidad.titulo}</h2>}
          <p>Comparte tus dudas, ideas y experiencias con otros estudiantes</p>
        </div>
      </div>

      <div className="container foro-content">
        {/* Formulario para crear publicación */}
        <div className="crear-publicacion-card">
          <div className="publicacion-usuario-info">
            <img 
              src={user?.fotoDePerfil || "/Default.jpg"} 
              alt={user?.nombreUsuario}
              className="usuario-avatar"
              onError={(e) => {
                e.target.src = "/Default.jpg";
              }}
            />
            <span className="usuario-nombre">{user?.nombreUsuario}</span>
          </div>

          <form onSubmit={handlePublicar}>
            <textarea
              className="form-control publicacion-textarea"
              placeholder="¿Qué estás pensando?"
              value={nuevaPublicacion}
              onChange={(e) => setNuevaPublicacion(e.target.value)}
              rows="4"
            />
            <div className="publicacion-acciones">
              <button 
                type="submit" 
                className="btn btn-publicar"
                disabled={!nuevaPublicacion.trim()}
              >
                <i className="bi bi-send"></i> Publicar
              </button>
            </div>
          </form>
        </div>

        {/* Lista de publicaciones */}
        <div className="publicaciones-lista">
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError("")}></button>
            </div>
          )}

          {publicaciones.length === 0 ? (
            <div className="sin-publicaciones">
              <i className="bi bi-chat-left-text"></i>
              <h3>Aún no hay publicaciones</h3>
              <p>Sé el primero en compartir algo en este foro</p>
            </div>
          ) : (
            publicaciones.map((pub) => (
              <div key={pub.idPublicacion} className="publicacion-card">
                {/* Publicación principal */}
                <div className="publicacion-header">
                  <img 
                    src={pub.UsuarioDePublicacion?.fotoDePerfil || "/Default.jpg"} 
                    alt={pub.UsuarioDePublicacion?.nombreUsuario}
                    className="usuario-avatar"
                    onError={(e) => {
                      e.target.src = "/Default.jpg";
                    }}
                  />
                  <div className="publicacion-info">
                    <h4 className="usuario-nombre">
                      {pub.UsuarioDePublicacion?.nombreUsuario}
                    </h4>
                    <span className="publicacion-fecha">
                      {new Date(pub.fechaPublicacion).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>

                <div className="publicacion-contenido">
                  <p>{pub.contenido}</p>
                </div>

                <div className="publicacion-acciones-footer">
                  <button 
                    className="btn-accion"
                    onClick={() => toggleMostrarRespuesta(pub.idPublicacion)}
                  >
                    <i className="bi bi-chat"></i> 
                    {pub.Respuestas?.length > 0 
                      ? `${pub.Respuestas.length} ${pub.Respuestas.length === 1 ? 'respuesta' : 'respuestas'}`
                      : 'Responder'
                    }
                  </button>
                </div>

                {/* Respuestas existentes */}
                {pub.Respuestas?.length > 0 && (
                  <div className="respuestas-container">
                    {pub.Respuestas.map((respuesta) => (
                      <div key={respuesta.idPublicacion} className="respuesta-card">
                        <div className="publicacion-header">
                          <img 
                            src={respuesta.UsuarioDePublicacion?.fotoDePerfil || "/Default.jpg"} 
                            alt={respuesta.UsuarioDePublicacion?.nombreUsuario}
                            className="usuario-avatar-small"
                            onError={(e) => {
                              e.target.src = "/Default.jpg";
                            }}
                          />
                          <div className="publicacion-info">
                            <h5 className="usuario-nombre-small">
                              {respuesta.UsuarioDePublicacion?.nombreUsuario}
                            </h5>
                            <span className="publicacion-fecha-small">
                              {new Date(respuesta.fechaPublicacion).toLocaleDateString("es-ES", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="respuesta-contenido">
                          <p>{respuesta.contenido}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulario para responder */}
                {mostrarRespuesta[pub.idPublicacion] && (
                  <div className="responder-form">
                    <textarea
                      className="form-control"
                      placeholder="Escribe tu respuesta..."
                      value={respuestas[pub.idPublicacion] || ""}
                      onChange={(e) => setRespuestas({
                        ...respuestas,
                        [pub.idPublicacion]: e.target.value
                      })}
                      rows="2"
                    />
                    <div className="responder-acciones">
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => toggleMostrarRespuesta(pub.idPublicacion)}
                      >
                        Cancelar
                      </button>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleResponder(pub.idPublicacion)}
                        disabled={!respuestas[pub.idPublicacion]?.trim()}
                      >
                        <i className="bi bi-send"></i> Responder
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Foro;