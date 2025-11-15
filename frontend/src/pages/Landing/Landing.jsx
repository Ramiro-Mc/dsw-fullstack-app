import CursoCard from "../../components/LandingPage/CursoCard";
import TipoCursoBadge from "../../components/LandingPage/TipoCursoBarge";
import "./Landing.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function Landing() {
  const [cursos, setCursos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(true); // Loading separado para cursos
  const [loadingTipos, setLoadingTipos] = useState(true); // Loading separado para tipos
  const [error, setError] = useState("");
  const { user } = useAuth();

  const filtrarCursosPropios = (courseList) => {
    if (!user || !user.id) {
      return courseList;
    }

    const filtrados = courseList.filter((curso) => {
      return curso.idProfesor !== user.id;
    });

    return filtrados;
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoadingCursos(true);
        const response = await fetch(
          "http://localhost:3000/api/cursos/aprobados",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (data.success) {
          setCursos(filtrarCursosPropios(data.contenido)); // El backend devuelve { success: true, contenido: [...] }
        } else {
          setError(data.msg || "Error al cargar cursos");
        }
      } catch (error) {
        console.error("Error al cargar cursos:", error);
        setError("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoadingCursos(false);
      }
    };
    const fetchTipos = async () => {
      try {
        setLoadingTipos(true);
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
        setLoadingTipos(false);
      }
    };

    fetchCursos();
    fetchTipos();
  }, [user]); // Se ejecuta cuando cambia el usuario

  const handleSubmit = async (idTipo) => {
    setLoadingCursos(true);
    setError("");
    setCursos([]);

    try {
      const isAll =
        idTipo === 0 || idTipo === "0" || idTipo === "" || idTipo == null;
      const url = isAll
        ? "http://localhost:3000/api/cursos/aprobados"
        : `http://localhost:3000/api/cursos/aprobados?idTipo=${idTipo}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.success) {
        setCursos(filtrarCursosPropios(data.contenido));
      } else {
        setError(data.msg || "Error al cargar cursos");
      }
    } catch (error) {
      console.error("Error al cargar cursos:", error);
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoadingCursos(false);
    }
  };

  return (
    <main>
      {/* Seccion presentacion */}
      <section className="presentacion">
        <div
          id="carouselExampleIndicators"
          className="presentacion-carousel carousel slide"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active carousel-item-presentacion">
              <img src="/placeholder.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item carousel-item-presentacion">
              <img
                src="/ImagenCarrusel02.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item carousel-item-presentacion">
              <img
                src="/ImagenCarrusel03.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
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
            key={0}
            handleSubmit={handleSubmit}
            idTipo={0}
            tipo="Todos"
            icono=""
          />

          {loadingTipos ? ( // ← Usar loading específico
            <div className="text-center">
              <p>Cargando tipos...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-danger">{error}</p>
            </div>
          ) : tipos.length > 0 ? (
            tipos.map((tipo) => (
              <TipoCursoBadge
                key={tipo.idTipo}
                idTipo={tipo.idTipo}
                handleSubmit={handleSubmit}
                tipo={tipo.nombreTipo}
                icono={tipo.icono}
              />
            ))
          ) : (
            <div className="text-center">
              <p>No hay tipos disponibles</p>
            </div>
          )}
        </div>

        <div className="container contenedor-tarjetas">
          <div className="row">
            {loadingCursos ? ( // ← Usar loading específico
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
              cursos.map((curso) => (
                <CursoCard
                  key={curso.idCurso}
                  idCurso={curso.idCurso}
                  titulo={curso.titulo}
                  descripcion={curso.descripcion}
                  precio={curso.precio}
                  imagen={curso.imagen || "/principal1.jpeg"}
                />
              ))
            ) : (
              <div className="text-center">
                <p>No hay cursos disponibles para esta categoría</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
