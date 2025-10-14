import React from 'react';
import './CompraCurso.css';

const CompraCurso = ({ curso }) => {
  // Placeholder data - replace with actual course data from props or API
  const cursoEjemplo = curso || {
    titulo: 'Título del Curso',
    descripcion: 'Descripción detallada del curso...',
    precio: 29.99,
    duracion: '25 horas',
    recursos: ['Videos bajo demanda', 'Tareas', '1 artículo', 'Acceso móvil'],
    profesor: 'Nombre del Profesor',
    certificado: true
  };

  return (
    <div className="compra-curso-container">
      <div className="curso-preview">
        <div className="curso-header">
          <h1>{cursoEjemplo.titulo}</h1>
          <p className="curso-descripcion">{cursoEjemplo.descripcion}</p>
          <div className="curso-metadata">
            <span>Creado por {cursoEjemplo.profesor}</span>
            <span>Última actualización: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="curso-detalles">
        <div className="curso-precio-card">
          <div className="precio-container">
            <h2 className="precio">US$ {cursoEjemplo.precio}</h2>
            {/* Agregar lógica de descuento si es necesario */}
          </div>
          
          <div className="botones-compra">
            <button className="btn-comprar-ahora">Comprar ahora</button>
            <button className="btn-anadir-cesta">Añadir a la cesta</button>
          </div>

          <div className="curso-incluye">
            <h3>Este curso incluye:</h3>
            <ul>
              {cursoEjemplo.recursos.map((recurso, index) => (
                <li key={index}>{recurso}</li>
              ))}
              {cursoEjemplo.certificado && (
                <li>Certificado de finalización</li>
              )}
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
