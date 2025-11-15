import { Curso } from "../models/Curso.js";
import { Usuario } from "../models/Usuario.js";
import { TipoCurso } from "../models/TipoCurso.js";
import { AlumnoCurso } from "../models/AlumnoCurso.js";
import { Modulo } from "../models/Modulo.js"; // ← AGREGAR
import { Leccion } from "../models/Leccion.js"; // ← AGREGAR
import { sequelize } from "../database/sequelize.js";
import bcrypt from "bcrypt";
import "../models/allModels.js";

const createCursosData = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    // Verificar que existan tipos de curso
    const tiposCount = await TipoCurso.count();
    if (tiposCount === 0) {
      console.log("❌ Error: Primero ejecuta seedTipoCurso.js para crear los tipos de curso");
      return;
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
        fotoDePerfil: "/Default",
      },
    });

    if (profesorCreated) {
      console.log("Profesor creado:", profesor.email);
    }

    // Crear alumno si no existe
    const hashedPasswordAlumno = await bcrypt.hash("alumno123", 10);

    const [alumno, alumnoCreated] = await Usuario.findOrCreate({
      where: { email: "alumno@utndemy.com" },
      defaults: {
        nombreUsuario: "Estudiante Test",
        email: "alumno@utndemy.com",
        contrasena: hashedPasswordAlumno,
        tipoUsuario: "consumidor",
        fotoDePerfil: "/Default",
      },
    });

    if (alumnoCreated) {
      console.log("Alumno creado:", alumno.email);
    }

    // Obtener tipos de curso existentes usando los nombres del seedTipoCurso.js
    const tipoJavaScript = await TipoCurso.findOne({ where: { nombreTipo: "JavaScript" } });
    const tipoReact = await TipoCurso.findOne({ where: { nombreTipo: "React" } });
    const tipoNodeJS = await TipoCurso.findOne({ where: { nombreTipo: "Node.js" } });
    const tipoCoaching = await TipoCurso.findOne({ where: { nombreTipo: "Coaching" } });
    const tipoFotografia = await TipoCurso.findOne({ where: { nombreTipo: "Fotografía" } });
    const tipoGastronomia = await TipoCurso.findOne({ where: { nombreTipo: "Gastronomía" } });
    const tipoIA = await TipoCurso.findOne({ where: { nombreTipo: "IA" } });
    const tipoInnovacion = await TipoCurso.findOne({ where: { nombreTipo: "Innovación" } });
    const tipoDiseno = await TipoCurso.findOne({ where: { nombreTipo: "Diseño" } });
    const tipoMarketing = await TipoCurso.findOne({ where: { nombreTipo: "Marketing" } });

    // Crear cursos de prueba adaptados a los tipos existentes
    const cursosData = [
      // JavaScript
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoJavaScript.idTipo,
        titulo: "JavaScript desde Cero",
        descripcion: "Aprende JavaScript desde los fundamentos hasta conceptos avanzados. Variables, funciones, DOM y más.",
        precio: 15999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoJavaScript.idTipo,
        titulo: "JavaScript Avanzado",
        descripcion: "Conceptos avanzados: closures, prototipos, async/await, ES6+ y patrones de diseño.",
        precio: 19999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // React
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoReact.idTipo,
        titulo: "React JS desde Cero",
        descripcion: "Aprende React desde los fundamentos hasta proyectos avanzados. Incluye hooks, context, y mejores prácticas.",
        precio: 22999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoReact.idTipo,
        titulo: "React Avanzado + Redux",
        descripcion: "Gestión de estado avanzada, optimización de rendimiento y patrones profesionales en React.",
        precio: 25999,
        estado: "pendiente",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // Node.js
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoNodeJS.idTipo,
        titulo: "Node.js y Express",
        descripcion: "Desarrollo backend completo con Node.js, Express y MongoDB. APIs RESTful desde cero.",
        precio: 24999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // Coaching
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoCoaching.idTipo,
        titulo: "Coaching Personal y Profesional",
        descripcion: "Desarrolla habilidades de liderazgo, comunicación efectiva y crecimiento personal.",
        precio: 18999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // Fotografía
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoFotografia.idTipo,
        titulo: "Fotografía Digital Avanzada",
        descripcion: "Técnicas profesionales de fotografía, composición y edición con Lightroom y Photoshop.",
        precio: 16999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // Gastronomía
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoGastronomia.idTipo,
        titulo: "Gastronomía Internacional",
        descripcion: "Cocina platos exquisitos de diferentes culturas. Técnicas culinarias y presentación profesional.",
        precio: 14999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // IA
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoIA.idTipo,
        titulo: "Inteligencia Artificial con Python",
        descripcion: "Introducción al Machine Learning, Deep Learning y procesamiento de datos con Python.",
        precio: 29999,
        estado: "pendiente",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // Innovación
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoInnovacion.idTipo,
        titulo: "Innovación y Emprendimiento",
        descripcion: "Desarrolla tu idea de negocio desde cero. Design thinking, lean startup y pitch deck.",
        precio: 21999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // Diseño
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoDiseno.idTipo,
        titulo: "Diseño UI/UX Completo",
        descripcion: "Principios de diseño de interfaces y experiencia de usuario. De wireframes a prototipos en Figma.",
        precio: 20999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoDiseno.idTipo,
        titulo: "Figma Masterclass",
        descripcion: "Domina Figma para crear diseños profesionales y sistemas de diseño escalables.",
        precio: 12999,
        estado: "rechazado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },

      // Marketing
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoMarketing.idTipo,
        titulo: "Marketing Digital 2024",
        descripcion: "Estrategias de marketing digital: SEO, SEM, redes sociales, email marketing y analytics.",
        precio: 17999,
        estado: "aprobado",
        imagen: "https://github.com/Ramiro-Mc/dsw-fullstack-app/blob/main/frontend/public/placeholder.jpg?raw=true",
        descuento: 0,
      },
    ];

    // Insertar cursos
    const cursosCreados = [];
    for (const cursoData of cursosData) {
      const [curso, created] = await Curso.findOrCreate({
        where: { titulo: cursoData.titulo },
        defaults: cursoData,
      });

      if (created) {
        console.log(`✅ Curso creado: ${curso.titulo} - $${curso.precio}`);
        cursosCreados.push(curso);
      } else {
        console.log(`ℹ️ Curso ya existe: ${curso.titulo}`);
        cursosCreados.push(curso); // Agregar también los existentes para crear módulos
      }
    }

    // *** CREAR MÓDULOS Y LECCIONES PARA LOS PRIMEROS 3 CURSOS ***
    console.log("\n📚 Creando módulos y lecciones...");

    const cursosParaModulos = cursosCreados.slice(0, 3); // Primeros 3 cursos

    for (let i = 0; i < cursosParaModulos.length; i++) {
      const curso = cursosParaModulos[i];
      console.log(`\n📖 Creando contenido para: ${curso.titulo}`);

      // Crear 3 módulos por curso
      for (let moduloNum = 1; moduloNum <= 3; moduloNum++) {
        const [modulo, moduloCreated] = await Modulo.findOrCreate({
          where: { 
            idCurso: curso.idCurso,
            titulo: `Módulo ${moduloNum}: ${getModuloTitulo(curso.titulo, moduloNum)}`
          },
          defaults: {
            idCurso: curso.idCurso,
            titulo: `Módulo ${moduloNum}: ${getModuloTitulo(curso.titulo, moduloNum)}`
          }
        });

        if (moduloCreated) {
          console.log(`  ✅ Módulo creado: ${modulo.titulo}`);
        }

        // Crear 2 lecciones por módulo
        for (let leccionNum = 1; leccionNum <= 2; leccionNum++) {
          const [leccion, leccionCreated] = await Leccion.findOrCreate({
            where: {
              idModulo: modulo.idModulo,
              tituloLec: `${getLeccionTitulo(curso.titulo, moduloNum, leccionNum)}`
            },
            defaults: {
              idModulo: modulo.idModulo,
              tituloLec: `${getLeccionTitulo(curso.titulo, moduloNum, leccionNum)}`,
              descripcionLec: `${getLeccionDescripcion(curso.titulo, moduloNum, leccionNum)}`,
              horasLec: Math.floor(Math.random() * 3) + 1, // 1-3 horas aleatorias
              videoUrl: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, // Video placeholder
              contenidoTexto: `${getLeccionContenido(curso.titulo, moduloNum, leccionNum)}`,
              imagenUrl: null,
              completado: false
            }
          });

          if (leccionCreated) {
            console.log(`    ✅ Lección creada: ${leccion.tituloLec} (${leccion.horasLec}h)`);
          }
        }
      }
    }

    // Inscribir/Comprar cursos para el alumno
    const cursosParaComprar = [
      cursosCreados[0], // JavaScript desde Cero - $15999
      cursosCreados[2], // React JS desde Cero - $22999
      cursosCreados[4], // Node.js y Express - $24999
    ].filter((curso) => curso && curso.estado === "aprobado");

    console.log("\n💳 Creando compras de cursos para el alumno...");

    for (const curso of cursosParaComprar) {
      const [compra, compraCreated] = await AlumnoCurso.findOrCreate({
        where: {
          idUsuario: alumno.idUsuario,
          idCurso: curso.idCurso,
        },
        defaults: {
          idUsuario: alumno.idUsuario,
          idCurso: curso.idCurso,
          fechaCompra: new Date(),
          precioCompra: curso.precio,
          metodoPago: "mercadopago",
          estadoPago: "aprobado",
          transactionId: `MP_${Date.now()}_${curso.idCurso}`,
        },
      });

      if (compraCreated) {
        console.log(`✅ Compra creada: ${alumno.nombreUsuario} -> ${curso.titulo} ($${curso.precio})`);
      } else {
        console.log(`ℹ️ Compra ya existe: ${alumno.nombreUsuario} -> ${curso.titulo}`);
      }
    }

    console.log("\n🎉 === DATOS CREADOS EXITOSAMENTE ===");
    console.log("📧 Credenciales del profesor:");
    console.log("   Email: profesor@utndemy.com");
    console.log("   Contraseña: profesor123");
    console.log("\n👨‍🎓 Credenciales del alumno:");
    console.log("   Email: alumno@utndemy.com");
    console.log("   Contraseña: alumno123");
    console.log(`📚 Total de cursos: ${cursosData.length}`);
    console.log(`📖 Cursos con módulos y lecciones: ${cursosParaModulos.length}`);
    console.log(`🛒 Total de compras: ${cursosParaComprar.length}`);
    console.log(`💰 Total gastado: $${cursosParaComprar.reduce((total, curso) => total + curso.precio, 0)}`);
  } catch (error) {
    console.error("❌ Error al crear datos:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

// *** FUNCIONES AUXILIARES PARA GENERAR CONTENIDO ***

function getModuloTitulo(cursoTitulo, moduloNum) {
  const modulos = {
    "JavaScript desde Cero": [
      "Fundamentos y Variables",
      "Funciones y Control de Flujo", 
      "DOM y Eventos"
    ],
    "JavaScript Avanzado": [
      "Closures y Scope",
      "Async/Await y Promises",
      "ES6+ y Módulos"
    ],
    "React JS desde Cero": [
      "Componentes y JSX",
      "State y Props",
      "Hooks y Context"
    ]
  };

  return modulos[cursoTitulo]?.[moduloNum - 1] || `Contenido ${moduloNum}`;
}

function getLeccionTitulo(cursoTitulo, moduloNum, leccionNum) {
  const lecciones = {
    "JavaScript desde Cero": {
      1: ["Introducción a JavaScript", "Variables y Tipos de Datos"],
      2: ["Funciones básicas", "Estructuras de Control"],
      3: ["Seleccionar Elementos DOM", "Eventos del Mouse"]
    },
    "JavaScript Avanzado": {
      1: ["¿Qué son los Closures?", "Scope Chain en Profundidad"],
      2: ["Promises desde Cero", "Async/Await en la Práctica"],
      3: ["Import/Export Modules", "Destructuring Avanzado"]
    },
    "React JS desde Cero": {
      1: ["Tu Primer Componente", "JSX en Detalle"],
      2: ["useState Hook", "Pasando Props"],
      3: ["useEffect Hook", "Context API"]
    }
  };

  return lecciones[cursoTitulo]?.[moduloNum]?.[leccionNum - 1] || `Lección ${leccionNum}`;
}

function getLeccionDescripcion(cursoTitulo, moduloNum, leccionNum) {
  return `Aprende paso a paso los conceptos clave de ${cursoTitulo}. Esta lección cubre todo lo necesario para dominar el tema.`;
}

function getLeccionContenido(cursoTitulo, moduloNum, leccionNum) {
  return `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  `;
}

createCursosData();