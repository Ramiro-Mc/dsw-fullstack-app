import "./Profesores.css";
import React, { useEffect, useState } from "react";

function Profesores() {
  const [profesores, setProfesores] = useState([]);
  const [tiposCurso, setTiposCurso] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("");

  // Obtener tipos de curso para los filtros
  useEffect(() => {
    fetch("http://localhost:3000/tipoCursos ")
      .then((res) => res.json())
      .then((data) => setTiposCurso(data.contenido || []));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/usuarios?tipoUsuario=usuario&includeCursos=true")
      .then((res) => res.json())
      .then((data) => {
        let profesores = data.contenido || [];
        console.log("Profesores recibidos:", profesores);
        if (filtroTipo) {
          profesores = profesores.filter((profesor) => profesor.CursosCreados && profesor.CursosCreados.some((curso) => String(curso.idTipo) === String(filtroTipo)));
        } else {
          // Mostrar todos los usuarios con al menos un curso creado
          profesores = profesores.filter((profesor) => profesor.CursosCreados && profesor.CursosCreados.length > 0);
        }
        setProfesores(profesores);
      });
  }, [filtroTipo]);

  return (
    <div className="container mt-5 contenedor-profesores">
      <h1 className="mb-4">Encuentra tu profesor ideal</h1>
      <div className="row">
        {/* Sidebar de filtros */}
        <div className="col-md-3">
          <div className="tarjetas card mb-4">
            <div className="tarjetas card-body">
              <h5 className="card-title">Filtrar por tipo de curso</h5>
              <select className="form-select" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                <option value="">Todos</option>
                {tiposCurso.map((tipo) => (
                  <option key={tipo.idTipo} value={tipo.idTipo}>
                    {tipo.nombreTipo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Listado de profesores */}
        <div className="col-md-9">
          <div className="row">
            {profesores.length === 0 && (
              <div className="notificacion text-center">
                <i className="bi bi-exclamation-circle" ></i>
                No se encontraron profesores que coincidan con tu búsqueda.
                <br />
                <span>Prueba cambiando el filtro o revisa más tarde.</span>
              </div>
            )}
            {profesores.map((profesor) => (
              <div className="col-md-9 mb-4" key={profesor.idUsuario}>
                <div className="tarjetas card h-100">
                  <div className="tarjetas prof card-body">
                    <div>
                      <img src={profesor.fotoDePerfil || "/Default.jpg"} alt="Foto de perfil" className="img-fluid rounded-circle profile-image-clickable"/>
                    </div>
                    <div className="datos">
                      <h5 className="card-title">{profesor.nombreUsuario}</h5>
                      <p className="card-text">{profesor.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profesores;
