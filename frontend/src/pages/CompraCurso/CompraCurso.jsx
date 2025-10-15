import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CompraCurso.css';

const CompraCurso = () => {
  const { idCurso } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ajuste: la URL apunta a tu backend local en el puerto 3000
    fetch(`http://localhost:3000/api/cursos/${idCurso}`)
      .then(res => res.json())
      .then(data => {
        setCurso(data.informacion);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [idCurso]);

  if (loading) return <div className="compra-curso-container">Cargando...</div>;
  if (!curso) return <div className="compra-curso-container">No se encontró el curso.</div>;

  return (
    <div className="compra-curso-container">
      <div className="curso-preview">
        <img
          src={curso.imagen || 'https://img-c.udemycdn.com/course/480x270/123456.jpg'}
          alt="Vista previa del curso"
          className="curso-imagen-preview"
        />
        <div className="curso-header">
          <h1>{curso.titulo}</h1>
          <p className="curso-descripcion">{curso.descripcion}</p>
          <div className="curso-metadata">
            <span>Creado por {curso.Profesor?.nombre || 'Profesor'}</span>
            <span>Última actualización: {new Date(curso.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="curso-detalles">
        <div className="curso-precio-card curso-precio-card-fisica">
          <div className="precio-container">
            <h2 className="precio">US$ {curso.precio}</h2>
          </div>
          <div className="botones-compra">
            <button className="btn-comprar-ahora">Comprar ahora</button>
          </div>
          <div className="curso-incluye">
            <h3>Este curso incluye:</h3>
            <ul>
              <li>Videos bajo demanda</li>
              <li>Tareas</li>
              <li>Acceso móvil</li>
              <li>Certificado de finalización</li>
            </ul>
          </div>
        </div>

        <div className="curso-aprendizaje">
          <h3>Lo que aprenderás</h3>
          <ul className="objetivos-aprendizaje">
            <li>Objetivo de aprendizaje 1</li>
            <li>Objetivo de aprendizaje 2</li>
            <li>Objetivo de aprendizaje 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompraCurso;
