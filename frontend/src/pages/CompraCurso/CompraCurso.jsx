import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CompraCurso.css";

const CompraCurso = () => {
  const { idCurso } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prof, setProfesor] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const base = "http://localhost:3000";
    fetch(`${base}/api/cursos/${idCurso}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        
        setCurso(data.informacion || data.contenido || data);
        setLoading(false);

        // Cargar el profesor después de obtener el curso
        const idProfesor = data.informacion.idProfesor; 
        if (idProfesor) {
          fetch(`http://localhost:3000/usuarios/${idProfesor}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => res.json())
          .then((profData) => {
            
            if (profData.success) {
              setProfesor(profData.informacion);
            }
          })
          .catch((error) => console.error("Error al cargar usuario:", error));
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [idCurso]);

  if (loading) return <div className="compra-curso-container">Cargando...</div>;
  if (!curso) return <div className="compra-curso-container">No se encontró el curso.</div>;

  const handleComprarAhora = () => {
    // Redirige a la ruta de checkout ya creada (/checkout/:idCurso)
    navigate(`/checkout/${idCurso}`);
  };

  return (
    <div className="compra-curso-container">
      <div className="curso-preview">
        <img src={curso.imagen?.includes("drive.google.com") ? curso.imagen.replace("/file/d/", "/uc?id=").replace("/view?usp=sharing", "") : curso.imagen || "https://img-c.udemycdn.com/course/480x270/placeholder.jpg"} alt={`Vista previa - ${curso.titulo || "Curso"}`} className="curso-imagen-preview" />
        <div className="curso-header">
          <h1>{curso.titulo}</h1>
          <p className="curso-descripcion">{curso.descripcion}</p>
          <div className="curso-metadata">
            <span>Creado por {prof.nombreUsuario || "Desconocido"}</span>
            {curso.updatedAt && <span> • Última actualización: {new Date(curso.updatedAt).toLocaleDateString()}</span>}
          </div>
        </div>
      </div>

      <aside className="curso-detalles">
        <div className="curso-precio-card curso-precio-card-fisica">
          <div className="precio-container">
            {curso.descuento === 0 ? (
              <p className="precio fw-bold text-success mb-2 fs-4">${curso.precio}</p>
            ) : (
              <div className="d-flex">
                <p className="precio-tachado mb-2 ">${curso.precio}</p>
                <p className="precio fw-bold text-success mb-2 fs-4">${(curso.precio - (curso.precio * curso.descuento) / 100).toFixed(0)}</p>
              </div>
            )}
            <div className="botones-compra">
              <button className="btn-comprar-ahora" onClick={handleComprarAhora}>
                Comprar ahora
              </button>
            </div>
          </div>
        </div>

        <div className="curso-incluye-card curso-precio-card-fisica">
          <div className="curso-incluye">
            <h3>Este curso incluye:</h3>
            <ul>
              <li>{curso.duracion || "Videos bajo demanda"}</li>
              <li>Tareas</li>
              <li>Acceso móvil</li>
              <li>Certificado de finalización</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CompraCurso;
