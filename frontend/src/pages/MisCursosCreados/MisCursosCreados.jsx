import React, { useState, useEffect } from "react";
import "./MisCursosCreados.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CursoCardPerfil from "../../components/MiPerfil/CursoCardPerfil";

function MisCursosCreados() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cursos, setCursos] = useState([]);

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchCursosUsuario = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/api/cursos?idProfesor=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

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
      <h3>Administra tus cursos</h3>

      <div className="container">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando cursos...</span>
            </div>
            <p className="mt-2">Cargando cursos...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-danger">{error}</p>
          </div>
        ) : cursos.length > 0 ? (
          cursos.map((curso) => <CursoCardPerfil key={curso.idCurso} idCurso={curso.idCurso} titulo={curso.titulo} descripcion={curso.descripcion} precio={curso.precio} imagen={curso.imagen || "/principal1.jpeg"} />)
        ) : (
          <div className="text-center">
            <div className="no-cursos-icon" style={{ fontSize: "4rem", marginBottom: "1rem" }}>
              📚
            </div>
            <h4>Aún no has creado ningún curso</h4>
            <p className="mb-3">¡Comienza a compartir tu conocimiento y crea tu primer curso!</p>
            <Link to="/crearCurso" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Crear mi primer curso
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MisCursosCreados;
