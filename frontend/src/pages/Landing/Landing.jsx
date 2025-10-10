import CursoCard from "../../components/LandingPage/CursoCard";
import "./Landing.css";
import { useEffect, useState } from "react";

function Landing() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Busco los cursos cuando el componente se monta
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("http://localhost:3000/cursos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setCursos(data.cursos); // Asumiendo que el backend devuelve { success: true, cursos: [...] }
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

    fetchCursos();
  }, []);

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
          <form method="GET" action="#locales" className="d-inline">
            <button type="submit" name="categoria" value="Todos" className="btn btn-outline-info">
              Todos
            </button>
            <button type="submit" name="categoria" value="Accesorios" className="btn btn-outline-info">
              <i class="bi bi-filetype-html"></i> HTML
            </button>
            <button type="submit" name="categoria" value="Deportes" className="btn btn-outline-info">
              <i class="bi bi-filetype-css"></i> CSS
            </button>
            <button type="submit" name="categoria" value="Electro" className="btn btn-outline-info">
              <i class="bi bi-people"></i> Coaching
            </button>
            <button type="submit" name="categoria" value="Estetica" className="btn btn-outline-info">
              <i class="bi bi-camera"></i> Fotografia
            </button>
            <button type="submit" name="categoria" value="Gastronomía" className="btn btn-outline-info">
              <i class="bi bi-cookie"></i> Gastronomía
            </button>
            <button type="submit" name="categoria" value="Calzado" className="btn btn-outline-info">
              <i class="bi bi-chat-left-dots"></i> ChatGPT
            </button>
            <button type="submit" name="categoria" value="Indumentaria" className="btn btn-outline-info">
              <i class="bi bi-graph-up-arrow"></i> Innovacion
            </button>
          </form>
        </div>

        <div className="container contenedor-tarjetas">
          <div className="row">
            

            <CursoCard titulo="hola" descripcion="xd" imagen="/principal1.jpeg" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
