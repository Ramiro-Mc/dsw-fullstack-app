import CursoCard from "../../components/LandingPage/CursoCard";
import TipoCursoBadge from "../../components/LandingPage/TipoCursoBarge";
import "./Landing.css";
import { useEffect, useState } from "react";

function Landing() {
  const [cursos, setCursos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Busco los cursos cuando el componente se monta
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cursos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setCursos(data.contenido); // El backend devuelve { success: true, contenido: [...] }
        } else {
          setError(data.msg || "Error al cargar cursos");
        }
      } catch (error) {
        console.error("Error al cargar cursos:", error);
        setError("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    const fetchTipos = async () => {
      try {
        const response = await fetch("http://localhost:3000/tipoCursos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setTipos(data.contenido); 
        } else {
          setError(data.msg || "Error al cargar tipos");
        }
      } catch (error) {
        console.error("Error al cargar tipos:", error);
        setError("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
    fetchTipos();
  }, []);

  const handleSubmit = async (categoria) =>{

    setLoading(true);
    setError("");

    try {

      const url = categoria && categoria !== 'Todos' 
      ? `http://localhost:3000/api/cursos?categoria=${categoria}`
      : "http://localhost:3000/api/cursos";

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
    console.log('Respuesta del servidor:', data); // ← Para debug

      if (data.success) {
        setCursos(data.contenido); // El backend devuelve { success: true, contenido: [...] }
      } else {
        setError(data.msg || "Error al cargar cursos");
      }
    } catch (error) {
      console.error("Error al cargar cursos:", error);
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* Seccion presentacion */}
      <section className="presentacion">
        <div id="carouselExampleIndicators" className="presentacion-carousel carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active carousel-item-presentacion">
              <img src="/placeholder.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item carousel-item-presentacion">
              <img src="/placeholder.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item carousel-item-presentacion">
              <img src="/placeholder.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Seccion cursos */}

      <section className="seccion-cursos ">
        <div className="container seccion-titulo">
          <h2>Descubre los mejores cursos</h2>
          <p>¡Aprende algo nuevo!</p>
        </div>

        <div className="container categoria-botones text-center">
          
          <TipoCursoBadge
            handleSubmit={handleSubmit}
            tipo="Todos"
            icono=""
          />
          
          {loading ? (
            <div className="text-center">
              <p>Cargando tipos...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger">{error}</p>
            </div>
          ) : tipos.length > 0 ? (
            tipos.map((tipo) => 
            <TipoCursoBadge 
              key={tipo.idTipo}
              handleSubmit={handleSubmit}
              tipo={tipo.nombreTipo}
              icono={tipo.icono}
            />)
          ) : (
            <div className="text-center">
              <p>No hay tipos disponibles</p>
            </div>
          )}
         
        </div>

        <div className="container contenedor-tarjetas">
          <div className="row">
            {loading ? (
              <div className="text-center">
                <p>Cargando cursos...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-danger">{error}</p>
              </div>
            ) : cursos.length > 0 ? (
              cursos.map((curso) => 
              <CursoCard 
                key={curso.idCurso} 
                titulo={curso.titulo} 
                descripcion={curso.descripcion} 
                precio={curso.precio}
                imagen={curso.imagen || "/principal1.jpeg"} 
              />)
            ) : (
              <div className="text-center">
                <p>No hay cursos disponibles</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
