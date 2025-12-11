import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import "./Foro.css";

function Foro() {
  const { idCurso } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [curso, setCurso] = useState(null);
  const [comunidad, setComunidad] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevaPublicacion, setNuevaPublicacion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editandoContenido, setEditandoContenido] = useState("");
  const [alert, setAlert] = useState(null);
  const [usuarioCompleto, setUsuarioCompleto] = useState(null); // ← NUEVO ESTADO

  useEffect(() => {
    const fetchCursoYComunidad = async () => {
      try {
        const idUsuario = user?.idUsuario || user?.id;

        // === 1. VERIFICAR SI EL USUARIO ESTÁ LOGUEADO ===
        if (!idUsuario) {
          setAlert({
            message: "Debes iniciar sesión para acceder al foro",
            type: "error",
            onClose: () => navigate("/loginPage"),
          });
          setLoading(false);
          return;
        }

        // === 1.5 CARGAR DATOS COMPLETOS DEL USUARIO ===
        const responseUsuario = await fetch(`http://localhost:3000/usuarios/${idUsuario}`);
        const dataUsuario = await responseUsuario.json();
        
        if (dataUsuario.success) {
          setUsuarioCompleto(dataUsuario.informacion);
        }

        // === 2. CARGAR INFORMACIÓN DEL CURSO ===
        const responseCurso = await fetch(`http://localhost:3000/cursoDetalle/${idCurso}`);
        const dataCurso = await responseCurso.json();

        if (dataCurso.success) {
          setCurso(dataCurso.contenido);

          // === 3. VERIFICAR SI EL USUARIO TIENE ACCESO AL CURSO ===
          const esCreador =
            dataCurso.contenido.idProfesor === idUsuario ||
            dataCurso.contenido.idProfesor === user?.idUsuario;

          if (!esCreador) {
            // Si no es el creador, verificar si compró el curso
            const resCompra = await fetch(
              `http://localhost:3000/alumnos_cursos/${idUsuario}/${idCurso}`
            );

            if (!resCompra.ok) {
              setAlert({
                message: "No tienes acceso a este foro. Debes comprar el curso primero.",
                type: "error",
                onClose: () => navigate(`/compraCurso/${idCurso}`),
              });
              setLoading(false);
              return;
            }

            const responseCompra = await resCompra.json();

            if (!responseCompra.success || !responseCompra.contenido) {
              setAlert({
                message: "No tienes acceso a este foro. Debes comprar el curso primero.",
                type: "error",
                onClose: () => navigate(`/compraCurso/${idCurso}`),
              });
              setLoading(false);
              return;
            }
          }
        } else {
          setError("Error al cargar el curso");
          setLoading(false);
          return;
        }

        // === 4. CARGAR COMUNIDAD DEL CURSO (solo si tiene acceso) ===
        const responseComunidad = await fetch(`http://localhost:3000/comunidades/curso/${idCurso}`);
        const dataComunidad = await responseComunidad.json();

        if (dataComunidad.success) {
          setComunidad(dataComunidad.contenido);

          // Cargar publicaciones de la comunidad
          const responsePublicaciones = await fetch(`http://localhost:3000/publicaciones/comunidad/${dataComunidad.contenido.idComunidad}`);
          const dataPublicaciones = await responsePublicaciones.json();

          if (dataPublicaciones.success) {
            setPublicaciones(dataPublicaciones.contenido);
          }
        } else {
          // Si no existe comunidad, crearla automáticamente
          const responseCrear = await fetch("http://localhost:3000/comunidades", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              titulo: `Foro de ${dataCurso.contenido?.titulo || "Curso"}`,
              idCurso: idCurso,
            }),
          });

          const dataCrear = await responseCrear.json();

          if (dataCrear.success) {
            setComunidad(dataCrear.contenido);
            setPublicaciones([]);
          } else {
            // Si falla (probablemente porque ya existe), intentar obtenerla
            const responseComunidadRetry = await fetch(`http://localhost:3000/comunidades/curso/${idCurso}`);
            const dataComunidadRetry = await responseComunidadRetry.json();

            if (dataComunidadRetry.success) {
              setComunidad(dataComunidadRetry.contenido);

              // Cargar publicaciones
              const responsePublicaciones = await fetch(`http://localhost:3000/publicaciones/comunidad/${dataComunidadRetry.contenido.idComunidad}`);
              const dataPublicaciones = await responsePublicaciones.json();

              if (dataPublicaciones.success) {
                setPublicaciones(dataPublicaciones.contenido);
              } else {
                setPublicaciones([]);
              }
            } else {
              setError("Error al cargar el foro del curso");
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError("Error al cargar información del foro");
      } finally {
        setLoading(false);
      }
    };

    fetchCursoYComunidad();
  }, [idCurso, user, navigate]); // Agregar navigate a las dependencias

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
        // Agregar la nueva publicación al inicio de la lista
        setPublicaciones([data.contenido, ...publicaciones]);
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

  const handleEditar = (pub) => {
    setEditandoId(pub.idPublicacion);
    setEditandoContenido(pub.contenido);
  };

  const handleGuardarEdicion = async (idPublicacion) => {
    if (!editandoContenido.trim()) {
      setError("El contenido no puede estar vacío");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/publicaciones/${idPublicacion}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contenido: editandoContenido,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPublicaciones(publicaciones.map((pub) => (pub.idPublicacion === idPublicacion ? { ...pub, contenido: editandoContenido } : pub)));
        setEditandoId(null);
        setEditandoContenido("");
        setError("");
      } else {
        setError(data.msg || "Error al editar publicación");
      }
    } catch (error) {
      console.error("Error al editar:", error);
      setError("Error al editar la publicación");
    }
  };

  const handleEliminar = async (idPublicacion) => {
    setAlert({
      message: "¿Estás seguro de que deseas eliminar esta publicación?",
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
              const response = await fetch(`http://localhost:3000/publicaciones/${idPublicacion}`, {
                method: "DELETE",
              });

              const data = await response.json();

              if (data.success) {
                setPublicaciones(publicaciones.filter((pub) => pub.idPublicacion !== idPublicacion));
                setError("");
              } else {
                setError(data.msg || "Error al eliminar publicación");
              }
            } catch (error) {
              console.error("Error al eliminar:", error);
              setError("Error al eliminar la publicación");
            }
          },
        },
      ],
    });
  };

  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setEditandoContenido("");
  };

  if (loading) {
    return (
      <div className="foro-container">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="foro-container">
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={alert.onClose} actions={alert.actions} />}

      <div className="foro-header">
        <div className="container">
          <button className="btn btn-link text-white mb-3" onClick={() => navigate(`/course/${idCurso}`)}>
            <i className="bi bi-arrow-left"></i> Volver al curso
          </button>
          <h1>Foro de {curso?.titulo || "Cargando..."}</h1>
          <p>Comparte tus dudas, ideas y experiencias con otros estudiantes</p>
        </div>
      </div>

      <div className="container foro-content">
        {/* Formulario para crear publicación */}
        <div className="crear-publicacion-card">
          <div className="publicacion-usuario-info">
            <img
              src={usuarioCompleto?.fotoDePerfil || "/Default.jpg"}
              alt={usuarioCompleto?.nombreUsuario || user?.nombreUsuario}
              className="usuario-avatar"
              onError={(e) => {
                e.target.src = "/Default.jpg";
              }}
            />
            <span className="usuario-nombre">{usuarioCompleto?.nombreUsuario || user?.nombreUsuario}</span>
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
              <button type="submit" className="btn btn-publicar" disabled={!nuevaPublicacion.trim()}>
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
            publicaciones.map((pub) => {
              const esProfesor = curso?.idProfesor === pub.idUsuario;

              return (
                <div key={pub.idPublicacion} className={`publicacion-card ${esProfesor ? "publicacion-profesor" : ""}`}>
                  <div className="publicacion-header">
                    <img
                      src={pub.UsuarioDePublicacion?.fotoDePerfil || "/Default.jpg"}
                      alt={pub.UsuarioDePublicacion?.nombreUsuario}
                      className={`usuario-avatar ${esProfesor ? "avatar-profesor" : ""}`}
                      onError={(e) => {
                        e.target.src = "/Default.jpg";
                      }}
                    />
                    <div className="publicacion-info">
                      <div className="usuario-nombre-container">
                        <h4 className="usuario-nombre">{pub.UsuarioDePublicacion?.nombreUsuario}</h4>
                        {esProfesor && (
                          <span className="badge-profesor">
                            <i className="bi bi-mortarboard-fill"></i> Profesor
                          </span>
                        )}
                      </div>
                      <span className="publicacion-fecha">
                        {new Date(pub.fechaPublicacion).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Mostrar botones solo si es el dueño */}
                    {(user?.idUsuario === pub.idUsuario || user?.id === pub.idUsuario) && (
                      <div className="publicacion-opciones-header">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditar(pub)} title="Editar publicación">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(pub.idPublicacion)} title="Eliminar publicación">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Publicación contenido */}
                  {editandoId === pub.idPublicacion ? (
                    <div className="publicacion-edicion">
                      <textarea className="form-control" value={editandoContenido} onChange={(e) => setEditandoContenido(e.target.value)} rows="3" />
                      <div className="publicacion-acciones-edicion mt-2">
                        <button className="btn btn-sm guardar" onClick={() => handleGuardarEdicion(pub.idPublicacion)}>
                          <i className="bi bi-check"></i> Guardar
                        </button>
                        <button className="btn btn-sm cancelar" onClick={handleCancelarEdicion}>
                          <i className="bi bi-x"></i> Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="publicacion-contenido">
                      <p>{pub.contenido}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Foro;
