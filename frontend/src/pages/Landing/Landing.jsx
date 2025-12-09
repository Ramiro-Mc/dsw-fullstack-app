import CursoCard from "../../components/LandingPage/CursoCard";
import TipoCursoBadge from "../../components/LandingPage/TipoCursoBadge";
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
  const [minPrecio, setMinPrecio] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");
  const [precioFiltrado, setPrecioFiltrado] = useState(false);
  const [cursosComprados, setCursosComprados] = useState([]);

  const filtrarCursosPropios = (courseList) => {
    if (!user || !user.id) return courseList;

    return courseList.filter((curso) => {
      const esMiCurso = curso.idProfesor === user.id;
      const yaComprado = cursosComprados.includes(curso.idCurso);

      return !esMiCurso && !yaComprado;
    });
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoadingCursos(true);
        const response = await fetch(
          "http://localhost:3000/api/cursos/aprobados"
        );
        const data = await response.json();

        if (data.success) {
          setCursos(data.contenido); // SIN filtrar
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
        const response = await fetch("http://localhost:3000/tipoCursos");
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

    const fetchCursosComprados = async () => {
      if (!user || !user.id) return;

      try {
        const response = await fetch(
          `http://localhost:3000/alumnos_cursos/usuario/${user.id}`
        );
        const data = await response.json();

        if (data.success) {
          setCursosComprados(data.contenido.map((c) => c.idCurso));
        }
      } catch (error) {
        console.error("Error al cargar cursos comprados:", error);
      }
    };

    fetchCursos();
    fetchTipos();
    fetchCursosComprados();
  }, [user]);

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
        const filtrados = data.contenido.filter((curso) => {
          const esMiCurso = user?.id && curso.idProfesor === user.id;
          const yaComprado = cursosComprados.includes(curso.idCurso);
          return !esMiCurso && !yaComprado;
        });

        setCursos(filtrados);
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

  useEffect(() => {
    if (!user || !user.id) return;

    const filtrados = cursos.filter((curso) => {
      const esMiCurso = curso.idProfesor === user.id;
      const yaComprado = cursosComprados.includes(curso.idCurso);
      return !esMiCurso && !yaComprado;
    });

    setCursos(filtrados);
  }, [cursosComprados, user]);

  const cursosFiltradosPorPrecio = cursos.filter((curso) => {
    if (!precioFiltrado) return true;
    const precio = Number(curso.precio);
    const min = minPrecio === "" ? 0 : Number(minPrecio);
    const max = maxPrecio === "" ? Infinity : Number(maxPrecio);
    return precio >= min && precio <= max;
  });

  const handlePrecioSubmit = (e) => {
    e.preventDefault();
    setPrecioFiltrado(true);
  };

  const handleResetPrecio = () => {
    setMinPrecio("");
    setMaxPrecio("");
    setPrecioFiltrado(false);
  };

  return (
    <>
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

      <section className="seccion-cursos">
        <div className="container seccion-titulo-filtro">
          <div className="titulo-cursos">
            <h2>Descubre los mejores cursos</h2>
            <p>¡Aprende algo nuevo!</p>
          </div>
          <form
            className="filtro-precio-card-inline"
            onSubmit={handlePrecioSubmit}
          >
            <h5 style={{ fontWeight: 600, marginBottom: "1rem" }}>Precio</h5>
            <div className="d-flex align-items-center mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Mínimo"
                value={minPrecio}
                onChange={(e) => setMinPrecio(e.target.value)}
                min={0}
                style={{ maxWidth: "100px" }}
              />
              <span className="mx-2">–</span>
              <input
                type="number"
                className="form-control"
                placeholder="Máximo"
                value={maxPrecio}
                onChange={(e) => setMaxPrecio(e.target.value)}
                min={0}
                style={{ maxWidth: "100px" }}
              />
              <button
                type="submit"
                className="btn-filtrar ms-2"
                title="Filtrar"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="#ffaa00"
                    strokeWidth="2"
                  />
                  <line
                    x1="16.5"
                    y1="16.5"
                    x2="22"
                    y2="22"
                    stroke="#ffaa00"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {precioFiltrado && (
              <button
                type="button"
                className="btn btn-link btn-sm"
                onClick={handleResetPrecio}
              >
                Quitar filtro
              </button>
            )}
          </form>
        </div>

        <div className="container categoria-botones text-center">
          <TipoCursoBadge
            key={0}
            handleSubmit={handleSubmit}
            idTipo={0}
            tipo="Todos"
            icono=""
          />

          {loadingTipos ? (
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
        <div className="container contenedor-tarjetas-centradas">
          <div className="row justify-content-center">
            {loadingCursos ? (
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
            ) : cursosFiltradosPorPrecio.length > 0 ? (
              cursosFiltradosPorPrecio.map((curso) => (
                <CursoCard
                  key={curso.idCurso}
                  idCurso={curso.idCurso}
                  titulo={curso.titulo}
                  descripcion={curso.descripcion}
                  precio={curso.precio}
                  imagen={curso.imagen}
                  descuento={curso.descuento}
                />
              ))
            ) : (
              <div className="noCursos text-center">
                <p>No hay cursos disponibles para este filtro</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
