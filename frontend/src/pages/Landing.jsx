


function Landing() {
  return (
    <main>

      {/* Seccion presentacion */}
      <section className="presentacion">
        <div id="carouselExampleIndicators" className="presentacion-carousel carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active carousel-item-presentacion">
              <img src="/imagenes/principal1.jpeg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item carousel-item-presentacion">
              <img src="/imagenes/principal1.jpeg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item carousel-item-presentacion">
              <img src="/imagenes/principal1.jpeg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Seccion cursos */}
      <h2 className="seccion-titulo">¿Listo para reinventar tu carrera profesional?</h2>
      <p className="text-center">
        Consigue las habilidades y la experiencia real que buscan los empleadores con los aceleradores
        para carreras profesionales.
      </p>

      <section className="seccion-cursos seccion-oscura">
        <div className="container">
          <h3 className="seccion-titulo text-center">Cursos destacados</h3>
          <p className="text-center">Explora nuestros cursos más populares y comienza tu viaje de aprendizaje hoy mismo.</p>
        </div>
        <div className="container categoria-botones text-center">
          <form method="GET" action="#locales" className="d-inline">
            <button type="submit" name="categoria" value="Todos" className="btn btn-secondary">Todos</button>
            <button type="submit" name="categoria" value="Accesorios" className="btn btn-secondary">HTML</button>
            <button type="submit" name="categoria" value="Deportes" className="btn btn-secondary">CSS</button>
            <button type="submit" name="categoria" value="Electro" className="btn btn-secondary">Coaching</button>
            <button type="submit" name="categoria" value="Estetica" className="btn btn-secondary">Fotografia</button>
            <button type="submit" name="categoria" value="Gastronomía" className="btn btn-secondary">Gastronomía</button>
            <button type="submit" name="categoria" value="Calzado" className="btn btn-secondary">ChatGPT</button>
            <button type="submit" name="categoria" value="Indumentaria" className="btn btn-secondary">Innovacion</button>
          </form>
        </div>

        <div className="container ">
          <div className="row">
            
            <div className="columna col-12 col-md-3 col-sm-6" >
              <a href="curso.html" className="card" style={{textDecoration: "none", color: "inherit"}}>
                <img src="/imagenes/principal1.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                </div>
              </a>
            </div>
            
            <div className="columna col-12 col-md-3 col-sm-6" >
              <a href="curso.html" className="card" style={{textDecoration: "none", color: "inherit"}}>
                <img src="/imagenes/principal1.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                </div>
              </a>
            </div>
            
            <div className="columna col-12 col-md-3 col-sm-6" >
              <a href="curso.html" className="card" style={{textDecoration: "none", color: "inherit"}}>
                <img src="/imagenes/principal1.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                </div>
              </a>
            </div>
            
            <div className="columna col-12 col-md-3 col-sm-6" >
              <a href="curso.html" className="card" style={{textDecoration: "none", color: "inherit"}}>
                <img src="/imagenes/principal1.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
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