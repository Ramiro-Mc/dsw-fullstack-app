import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Foro.css";

function Foro() {
  const { idCurso } = useParams();
  const { user } = useAuth();
  const [curso, setCurso] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevaPublicacion, setNuevaPublicacion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cursos/${idCurso}`);
        const data = await response.json();
        
        if (data.success) {
          setCurso(data.contenido);
        }
      } catch (error) {
        console.error("Error al cargar el curso:", error);
        setError("Error al cargar información del curso");
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [idCurso]);

  const handlePublicar = (e) => {
    e.preventDefault();
    
    if (!nuevaPublicacion.trim()) return;

   
    const nuevaPublicacionObj = {
      id: Date.now(),
      usuario: user.nombreUsuario,
      contenido: nuevaPublicacion,
      fecha: new Date().toISOString(),
      fotoPerfil: user.fotoDePerfil || "/Default.jpg"
    };

    setPublicaciones([nuevaPublicacionObj, ...publicaciones]);
    setNuevaPublicacion("");
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
          <h1>Foro de (nombre del curso)  Mira que degrade mas fachero</h1>
          {curso && <h2>{curso.titulo}</h2>}
          <p>Comparte tus dudas, ideas y experiencias con otros estudiantes
          </p>
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
            <div className="alert alert-danger" role="alert">
              {error}
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
              <div key={pub.id} className="publicacion-card">
                <div className="publicacion-header">
                  <img 
                    src={pub.fotoPerfil || "/Default.jpg"} 
                    alt={pub.usuario}
                    className="usuario-avatar"
                    onError={(e) => {
                      e.target.src = "/Default.jpg";
                    }}
                  />
                  <div className="publicacion-info">
                    <h4 className="usuario-nombre">{pub.usuario}</h4>
                    <span className="publicacion-fecha">
                      {new Date(pub.fecha).toLocaleDateString("es-ES", {
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
                  <button className="btn-accion">
                    <i className="bi bi-hand-thumbs-up"></i> Me gusta
                  </button>
                  <button className="btn-accion">
                    <i className="bi bi-chat"></i> Comentar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Foro;