import { Curso } from "../models/Curso.js";
import { Usuario } from "../models/Usuario.js";
import { TipoCurso } from "../models/TipoCurso.js";
import { sequelize } from "../database/sequelize.js";
import bcrypt from "bcrypt";

const createCursosData = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    // Crear tipos de curso si no existen
    const tiposPorDefecto = [
      'Programación',
      'Diseño',
      'Marketing',
      'Data Science',
      'Business'
    ];

    for (const tipo of tiposPorDefecto) {
      const [tipoCreado, created] = await TipoCurso.findOrCreate({
        where: { nombreTipo: tipo }, // Cambié 'nombre' por 'nombreTipo'
        defaults: { 
          nombreTipo: tipo, // Cambié 'nombre' por 'nombreTipo'
          descripcion: `Cursos relacionados con ${tipo}`,
          icono: "📚" // Agregué valores por defecto
        }
      });
      
      if (created) {
        console.log(`Tipo de curso creado: ${tipo}`);
      }
    }

    // Crear profesor si no existe
    const hashedPassword = await bcrypt.hash("profesor123", 10);
    
    const [profesor, profesorCreated] = await Usuario.findOrCreate({
      where: { email: "profesor@utndemy.com" },
      defaults: {
        nombreUsuario: "Profesor Tech",
        email: "profesor@utndemy.com",
        contrasena: hashedPassword,
        tipoUsuario: "creador",
        fotoDePerfil: "/Default"
      }
    });

    if (profesorCreated) {
      console.log("Profesor creado:", profesor.email);
    }

    // Obtener tipos de curso creados (usando nombreTipo)
    const tipoProgramacion = await TipoCurso.findOne({ where: { nombreTipo: 'Programación' } });
    const tipoDiseno = await TipoCurso.findOne({ where: { nombreTipo: 'Diseño' } });
    const tipoMarketing = await TipoCurso.findOne({ where: { nombreTipo: 'Marketing' } });
    const tipoDataScience = await TipoCurso.findOne({ where: { nombreTipo: 'Data Science' } });

    // Crear cursos de prueba
    const cursosData = [
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoProgramacion.idTipo,
        titulo: "React JS desde Cero",
        descripcion: "Aprende React desde los fundamentos hasta proyectos avanzados. Incluye hooks, context, y mejores prácticas.",
        precio: 15999,
        estado: "aprobado",
        imagen: "https://drive.google.com/uc?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv" // <--- Agregar imagen
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoProgramacion.idTipo,
        titulo: "Node.js y Express",
        descripcion: "Desarrollo backend completo con Node.js, Express y MongoDB. APIs RESTful desde cero.",
        precio: 18999,
        estado: "aprobado",
        imagen: "https://drive.google.com/uc?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv" // <--- Agregar imagen
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoProgramacion.idTipo,
        titulo: "JavaScript Avanzado",
        descripcion: "Conceptos avanzados de JavaScript: closures, prototipos, async/await y más.",
        precio: 12999,
        estado: "pendiente",
        imagen: "https://drive.google.com/uc?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv" // <--- Agregar imagen
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoDiseno.idTipo,
        titulo: "Diseño UI/UX Completo",
        descripcion: "Principios de diseño de interfaces y experiencia de usuario. De wireframes a prototipos.",
        precio: 14999,
        estado: "aprobado",
        imagen: "https://drive.google.com/uc?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv" // <--- Agregar imagen
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoDiseno.idTipo,
        titulo: "Figma Masterclass",
        descripcion: "Domina Figma para crear diseños profesionales y sistemas de diseño.",
        precio: 9999,
        estado: "rechazado",
        imagen: "https://drive.google.com/uc?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv" // <--- Agregar imagen
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoMarketing.idTipo,
        titulo: "Marketing Digital 2024",
        descripcion: "Estrategias de marketing digital para empresas: SEO, SEM, redes sociales y analytics.",
        precio: 16999,
        estado: "aprobado",
        imagen: "https://drive.google.com/uc?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv" // <--- Agregar imagen
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoDataScience.idTipo,
        titulo: "Python Full Stack",
        descripcion: "Desarrollo completo con Python: Django, APIs, bases de datos y deployment.",
        precio: 22999,
        estado: "pendiente",
        imagen: "https://drive.google.com/uc?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv" // <--- Agregar imagen
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoProgramacion.idTipo,
        titulo: "TypeScript Profesional",
        descripcion: "JavaScript tipado para proyectos enterprise. Tipos avanzados y mejores prácticas.",
        precio: 19999,
        estado: "aprobado",
        imagen: "https://drive.google.com/uc?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv" // <--- Agregar imagen
      }
    ];

    // Insertar cursos
    for (const cursoData of cursosData) {
      const [curso, created] = await Curso.findOrCreate({
        where: { titulo: cursoData.titulo },
        defaults: cursoData
      });

      if (created) {
        console.log(`Curso creado: ${curso.titulo} - $${curso.precio}`);
      } else {
        console.log(`Curso ya existe: ${curso.titulo}`);
      }
    }

    console.log("\n=== DATOS CREADOS EXITOSAMENTE ===");
    console.log("Credenciales del profesor:");
    console.log("Email: profesor@utndemy.com");
    console.log("Contraseña: profesor123");

  } catch (error) {
    console.error("Error al crear datos:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

createCursosData();