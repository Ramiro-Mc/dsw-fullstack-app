import "./Landing.css";

function Landing() {
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
            <div className="columna col-12 col-md-3 col-sm-6">
              <a href="curso.html" className="card" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="/principal1.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
              </a>
            </div>

            <div className="columna col-12 col-md-3 col-sm-6">
              <a href="curso.html" className="card" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="/principal1.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
              </a>
            </div>

            <div className="columna col-12 col-md-3 col-sm-6">
              <a href="curso.html" className="card" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="/principal1.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
              </a>
            </div>

            <div className="columna col-12 col-md-3 col-sm-6">
              <a href="curso.html" className="card" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="/principal1.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
              </a>
            </div>
          </div>

        </div>

      </section>
    </main>
  );
}

export default Landing;
