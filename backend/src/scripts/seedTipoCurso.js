import { TipoCurso } from "../models/TipoCurso.js";
import { sequelize } from "../database/sequelize.js";

const tiposCurso = [
  {
    nombreTipo: "JavaScript",
    descripcion: "Lenguaje de programación para web",
    icono: "bi bi-filetype-js",
  },
  {
    nombreTipo: "React",
    descripcion: "Biblioteca de JavaScript para interfaces",
    icono: "bi bi-lightning-charge",
  },
  {
    nombreTipo: "Node.js",
    descripcion: "Entorno de ejecución de JavaScript",
    icono: "bi bi-server",
  },
  {
    nombreTipo: "Coaching",
    descripcion: "Desarrollo personal y profesional",
    icono: "bi bi-people",
  },
  {
    nombreTipo: "Fotografía",
    descripcion: "Arte y técnica fotográfica",
    icono: "bi bi-camera",
  },
  {
    nombreTipo: "Gastronomía",
    descripcion: "Cocina y arte culinario",
    icono: "bi bi-cookie",
  },
  {
    nombreTipo: "IA",
    descripcion: "Inteligencia artificial y machine learning",
    icono: "bi bi-robot",
  },
  {
    nombreTipo: "Innovación",
    descripcion: "Creatividad y emprendimiento",
    icono: "bi bi-graph-up-arrow",
  },
  {
    nombreTipo: "Diseño",
    descripcion: "Diseño gráfico y experiencia de usuario",
    icono: "bi bi-palette",
  },
  {
    nombreTipo: "Marketing",
    descripcion: "Marketing digital y estrategias comerciales",
    icono: "bi bi-megaphone",
  },
];

const seedTipoCurso = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    await sequelize.sync(); // Asegurar que las tablas existan

    // Verificar si ya existen tipos de curso
    const existingTypes = await TipoCurso.count();

    if (existingTypes === 0) {
      await TipoCurso.bulkCreate(tiposCurso);
      console.log("Tipos de curso creados exitosamente");
    } else {
      console.log("ℹLos tipos de curso ya existen");
    }
  } catch (error) {
    console.error("Error al crear tipos de curso:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

// Auto-ejecutar (como createAdmin.js)
seedTipoCurso();
