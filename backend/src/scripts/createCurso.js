import { sequelize } from "../database/sequelize.js";
import { Usuario } from "../models/Usuario.js";
import { Curso } from "../models/Curso.js";
import { TipoCurso } from "../models/TipoCurso.js";
import { AlumnoCurso } from "../models/AlumnoCurso.js";
import { Modulo } from "../models/Modulo.js";
import { Leccion } from "../models/Leccion.js";
import bcrypt from "bcrypt";
import { encrypt } from "../helpers/encrypt.js";
import "../models/allModels.js";

const createCursosData = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas");

    const tiposCount = await TipoCurso.count();
    if (tiposCount === 0) {
      console.log("❌ Error: Primero ejecuta seedTipoCurso.js para crear los tipos de curso");
      return;
    }

    // Crear 5 profesores
    const profesoresData = [
      {
        nombreUsuario: "Carlos Mendez",
        email: "carlos@utndemy.com",
        contrasena: "profesor123",
        fotoDePerfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        descripcion: "Experto en desarrollo web frontend y JavaScript moderno con más de 10 años de experiencia.",
        fraseDescriptiva: "Transformando ideas en código limpio y funcional",
        educacion: "Licenciado en Informática • Universidad Nacional de Tecnología",
        nombreReferido: "Carlos",
        banco: "Banco Galicia",
        cvu: "0070123456789012345678",
        alias: "carlos.dev",
      },
      {
        nombreUsuario: "María García",
        email: "maria@utndemy.com",
        contrasena: "profesor123",
        fotoDePerfil: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        descripcion: "Diseñadora UX/UI y especialista en experiencia de usuario. Fanática del diseño responsivo.",
        fraseDescriptiva: "El diseño es resolver problemas, no decorar",
        educacion: "Diseño Gráfico • Instituto de Artes Digitales",
        nombreReferido: "María",
        banco: "BBVA",
        cvu: "0170456789012345678901",
        alias: "maria.design",
      },
      {
        nombreUsuario: "Juan Perez",
        email: "juan@utndemy.com",
        contrasena: "profesor123",
        fotoDePerfil: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        descripcion: "Backend developer especializado en Node.js y bases de datos. Apasionado por la arquitectura de software.",
        fraseDescriptiva: "El código limpio es arte",
        educacion: "Ingeniería en Sistemas • Universidad de Buenos Aires",
        nombreReferido: "Juan",
        banco: "Santander",
        cvu: "0720789012345678901234",
        alias: "juan.backend",
      },
      {
        nombreUsuario: "Sofia Rodriguez",
        email: "sofia@utndemy.com",
        contrasena: "profesor123",
        fotoDePerfil: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        descripcion: "Coach profesional y especialista en desarrollo personal. Ayudo a emprendedores a alcanzar sus objetivos.",
        fraseDescriptiva: "Tu éxito es mi éxito",
        educacion: "Coaching Ejecutivo • Escuela de Liderazgo Internacional",
        nombreReferido: "Sofía",
        banco: "Banco Francés",
        cvu: "0010234567890123456789",
        alias: "sofia.coach",
      },
      {
        nombreUsuario: "Roberto Silva",
        email: "roberto@utndemy.com",
        contrasena: "profesor123",
        fotoDePerfil: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        descripcion: "Fotógrafo profesional y educador. Especialista en fotografía digital y procesamiento de imágenes.",
        fraseDescriptiva: "La fotografía es capturar emociones",
        educacion: "Fotografía Profesional • Instituto Superior de Artes",
        nombreReferido: "Roberto",
        banco: "ICBC",
        cvu: "0150345678901234567890",
        alias: "roberto.photo",
      },
    ];

    const profesores = [];
    for (const profData of profesoresData) {
      const hashedPassword = await bcrypt.hash(profData.contrasena, 10);
      const [profesor, created] = await Usuario.findOrCreate({
        where: { email: profData.email },
        defaults: {
          nombreUsuario: profData.nombreUsuario,
          email: profData.email,
          contrasena: hashedPassword,
          tipoUsuario: "usuario",
          fotoDePerfil: profData.fotoDePerfil,
          descripcion: profData.descripcion,
          fraseDescriptiva: profData.fraseDescriptiva,
          educacion: profData.educacion,
          nombreReferido: encrypt(profData.nombreReferido),
          banco: encrypt(profData.banco),
          cvu: encrypt(profData.cvu),
          alias: encrypt(profData.alias),
        },
      });

      if (created) {
        console.log(`✅ Profesor creado: ${profesor.nombreUsuario} (${profesor.email})`);
      }
      profesores.push(profesor);
    }

    // Crear alumno
    const hashedPasswordAlumno = await bcrypt.hash("alumno123", 10);
    const [alumno, alumnoCreated] = await Usuario.findOrCreate({
      where: { email: "alumno@utndemy.com" },
      defaults: {
        nombreUsuario: "Estudiante Test",
        email: "alumno@utndemy.com",
        contrasena: hashedPasswordAlumno,
        tipoUsuario: "usuario",
        fotoDePerfil: "https://images.unsplash.com/photo-1534528741775-253ff2f8499a?w=400&h=400&fit=crop",
      },
    });

    if (alumnoCreated) {
      console.log("✅ Alumno creado: " + alumno.email);
    }

    // Obtener tipos de curso
    const tipos = await Promise.all([TipoCurso.findOne({ where: { nombreTipo: "JavaScript" } }), TipoCurso.findOne({ where: { nombreTipo: "React" } }), TipoCurso.findOne({ where: { nombreTipo: "Node.js" } }), TipoCurso.findOne({ where: { nombreTipo: "Coaching" } }), TipoCurso.findOne({ where: { nombreTipo: "Fotografía" } }), TipoCurso.findOne({ where: { nombreTipo: "Gastronomía" } }), TipoCurso.findOne({ where: { nombreTipo: "IA" } }), TipoCurso.findOne({ where: { nombreTipo: "Innovación" } }), TipoCurso.findOne({ where: { nombreTipo: "Diseño" } }), TipoCurso.findOne({ where: { nombreTipo: "Marketing" } })]);

    const [tipoJavaScript, tipoReact, tipoNodeJS, tipoCoaching, tipoFotografia, tipoGastronomia, tipoIA, tipoInnovacion, tipoDiseno, tipoMarketing] = tipos;

    // Datos de cursos distribuidos entre 5 profesores
    const cursosData = [
      // CARLOS (0) - JavaScript
      {
        idProfesor: profesores[0].idUsuario,
        idTipo: tipoJavaScript.idTipo,
        titulo: "JavaScript desde Cero",
        descripcion: "Aprende JavaScript desde los fundamentos hasta conceptos avanzados. Variables, funciones, DOM y más.",
        precio: 15999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        descuento: 0,
      },
      {
        idProfesor: profesores[0].idUsuario,
        idTipo: tipoJavaScript.idTipo,
        titulo: "JavaScript Avanzado",
        descripcion: "Conceptos avanzados: closures, prototipos, async/await, ES6+ y patrones de diseño.",
        precio: 19999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        descuento: 0,
      },

      // MARÍA (1) - Diseño
      {
        idProfesor: profesores[1].idUsuario,
        idTipo: tipoDiseno.idTipo,
        titulo: "Diseño UI/UX Completo",
        descripcion: "Principios de diseño de interfaces y experiencia de usuario. De wireframes a prototipos en Figma.",
        precio: 20999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
        descuento: 0,
      },
      {
        idProfesor: profesores[1].idUsuario,
        idTipo: tipoDiseno.idTipo,
        titulo: "Figma Masterclass",
        descripcion: "Domina Figma para crear diseños profesionales y sistemas de diseño escalables.",
        precio: 12999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
        descuento: 0,
      },

      // JUAN (2) - React y Node.js
      {
        idProfesor: profesores[2].idUsuario,
        idTipo: tipoReact.idTipo,
        titulo: "React JS desde Cero",
        descripcion: "Aprende React desde los fundamentos hasta proyectos avanzados. Incluye hooks, context, y mejores prácticas.",
        precio: 22999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        descuento: 0,
      },
      {
        idProfesor: profesores[2].idUsuario,
        idTipo: tipoNodeJS.idTipo,
        titulo: "Node.js y Express",
        descripcion: "Desarrollo backend completo con Node.js, Express y MongoDB. APIs RESTful desde cero.",
        precio: 24999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        descuento: 0,
      },
      {
        idProfesor: profesores[2].idUsuario,
        idTipo: tipoReact.idTipo,
        titulo: "React Avanzado + Redux",
        descripcion: "Gestión de estado avanzada, optimización de rendimiento y patrones profesionales en React.",
        precio: 25999,
        estado: "pendiente",
        imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        descuento: 0,
      },

      // SOFIA (3) - Coaching e Innovación
      {
        idProfesor: profesores[3].idUsuario,
        idTipo: tipoCoaching.idTipo,
        titulo: "Coaching Personal y Profesional",
        descripcion: "Desarrolla habilidades de liderazgo, comunicación efectiva y crecimiento personal.",
        precio: 18999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        descuento: 0,
      },
      {
        idProfesor: profesores[3].idUsuario,
        idTipo: tipoInnovacion.idTipo,
        titulo: "Innovación y Emprendimiento",
        descripcion: "Desarrolla tu idea de negocio desde cero. Design thinking, lean startup y pitch deck.",
        precio: 21999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        descuento: 0,
      },

      // ROBERTO (4) - Fotografía, IA y Marketing
      {
        idProfesor: profesores[4].idUsuario,
        idTipo: tipoFotografia.idTipo,
        titulo: "Fotografía Digital Avanzada",
        descripcion: "Técnicas profesionales de fotografía, composición y edición con Lightroom y Photoshop.",
        precio: 16999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop",
        descuento: 0,
      },
      {
        idProfesor: profesores[4].idUsuario,
        idTipo: tipoIA.idTipo,
        titulo: "Inteligencia Artificial con Python",
        descripcion: "Introducción al Machine Learning, Deep Learning y procesamiento de datos con Python.",
        precio: 29999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
        descuento: 0,
      },
      {
        idProfesor: profesores[4].idUsuario,
        idTipo: tipoMarketing.idTipo,
        titulo: "Marketing Digital 2024",
        descripcion: "Estrategias de marketing digital: SEO, SEM, redes sociales, email marketing y analytics.",
        precio: 17999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        descuento: 0,
      },
      {
        idProfesor: profesores[4].idUsuario,
        idTipo: tipoGastronomia.idTipo,
        titulo: "Gastronomía Internacional",
        descripcion: "Cocina platos exquisitos de diferentes culturas. Técnicas culinarias y presentación profesional.",
        precio: 14999,
        estado: "aprobado",
        imagen: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
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
        cursosCreados.push(curso);
      }
    }

    // Crear módulos y lecciones
    console.log("\n📚 Creando módulos y lecciones...");

    const cursosParaModulos = cursosCreados.slice(0, 5);

    for (let i = 0; i < cursosParaModulos.length; i++) {
      const curso = cursosParaModulos[i];
      console.log(`\n📖 Creando contenido para: ${curso.titulo}`);

      for (let moduloNum = 1; moduloNum <= 3; moduloNum++) {
        const [modulo] = await Modulo.findOrCreate({
          where: {
            idCurso: curso.idCurso,
            titulo: `Módulo ${moduloNum}: ${getModuloTitulo(curso.titulo, moduloNum)}`,
          },
          defaults: {
            idCurso: curso.idCurso,
            titulo: `Módulo ${moduloNum}: ${getModuloTitulo(curso.titulo, moduloNum)}`,
          },
        });

        for (let leccionNum = 1; leccionNum <= 2; leccionNum++) {
          await Leccion.findOrCreate({
            where: {
              idModulo: modulo.idModulo,
              tituloLec: `${getLeccionTitulo(curso.titulo, moduloNum, leccionNum)}`,
            },
            defaults: {
              idModulo: modulo.idModulo,
              tituloLec: `${getLeccionTitulo(curso.titulo, moduloNum, leccionNum)}`,
              descripcionLec: `${getLeccionDescripcion(curso.titulo, moduloNum, leccionNum)}`,
              horasLec: Math.floor(Math.random() * 3) + 1,
              videoUrl: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
              contenidoTexto: `${getLeccionContenido(curso.titulo, moduloNum, leccionNum)}`,
              imagenUrl: null,
              completado: false,
            },
          });
        }
      }
    }

    // Inscripciones
    const cursosParaComprar = cursosCreados.filter((curso) => curso.estado === "aprobado").slice(0, 5);

    console.log("\n💳 Creando compras de cursos para el alumno...");

    for (const curso of cursosParaComprar) {
      const [, compraCreated] = await AlumnoCurso.findOrCreate({
        where: {
          idUsuario: alumno.idUsuario,
          idCurso: curso.idCurso,
        },
        defaults: {
          idUsuario: alumno.idUsuario,
          idCurso: curso.idCurso,
          fechaCompra: new Date(),
          precioCompra: curso.precio,
          metodoPago: "stripe",
          estadoPago: "aprobado",
          transactionId: `MP_${Date.now()}_${curso.idCurso}`,
        },
      });

      if (compraCreated) {
        console.log(`✅ Compra creada: ${alumno.nombreUsuario} -> ${curso.titulo}`);
      }
    }

    console.log("\n🎉 === DATOS CREADOS EXITOSAMENTE ===");
    console.log("\n👨‍🏫 Profesores:");
    profesores.forEach((prof, idx) => {
      console.log(`   ${idx + 1}. ${prof.nombreUsuario} (${prof.email})`);
    });
    console.log("\n👨‍🎓 Alumno: alumno@utndemy.com / alumno123");
    console.log(`📚 Total de cursos: ${cursosData.length}`);
    console.log(`💰 Total gastado: $${cursosParaComprar.reduce((total, curso) => total + curso.precio, 0)}`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await sequelize.close();
  }
};

function getModuloTitulo(cursoTitulo, moduloNum) {
  const modulos = {
    "JavaScript desde Cero": ["Fundamentos", "Funciones", "DOM"],
    "JavaScript Avanzado": ["Closures", "Async/Await", "ES6+"],
    "React JS desde Cero": ["Componentes", "State y Props", "Hooks"],
    "Diseño UI/UX Completo": ["Principios", "Wireframes", "Prototipos"],
    "Figma Masterclass": ["Básico", "Avanzado", "Componentes"],
  };
  return modulos[cursoTitulo]?.[moduloNum - 1] || `Contenido ${moduloNum}`;
}

function getLeccionTitulo(cursoTitulo, moduloNum, leccionNum) {
  const lecciones = {
    "JavaScript desde Cero": {
      1: ["Intro", "Variables"],
      2: ["Funciones", "Condicionales"],
      3: ["DOM", "Eventos"],
    },
    "React JS desde Cero": {
      1: ["Componentes", "JSX"],
      2: ["useState", "Props"],
      3: ["useEffect", "Context"],
    },
  };
  return lecciones[cursoTitulo]?.[moduloNum]?.[leccionNum - 1] || `Lección ${leccionNum}`;
}

function getLeccionDescripcion(cursoTitulo, moduloNum, leccionNum) {
  return `Aprende los conceptos clave de esta lección en ${cursoTitulo}.`;
}

function getLeccionContenido() {
  return `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`;
}

createCursosData();
