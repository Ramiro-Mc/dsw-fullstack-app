import { sequelize } from "../database/sequelize.js";
import { Usuario } from "../models/Usuario.js";
import { Curso } from "../models/Curso.js";
import { TipoCurso } from "../models/TipoCurso.js";
import bcrypt from "bcrypt";
import "../models/allModels.js";

const createCursosData = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    // Crear tablas si no existen
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas");

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
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoJavaScript.idTipo,
        titulo: "JavaScript Avanzado",
        descripcion: "Conceptos avanzados: closures, prototipos, async/await, ES6+ y patrones de diseño.",
        precio: 19999,
        estado: "aprobado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },

      // React
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoReact.idTipo,
        titulo: "React JS desde Cero",
        descripcion: "Aprende React desde los fundamentos hasta proyectos avanzados. Incluye hooks, context, y mejores prácticas.",
        precio: 22999,
        estado: "aprobado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoReact.idTipo,
        titulo: "React Avanzado + Redux",
        descripcion: "Gestión de estado avanzada, optimización de rendimiento y patrones profesionales en React.",
        precio: 25999,
        estado: "pendiente",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },

      // Node.js
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoNodeJS.idTipo,
        titulo: "Node.js y Express",
        descripcion: "Desarrollo backend completo con Node.js, Express y MongoDB. APIs RESTful desde cero.",
        precio: 24999,
        estado: "aprobado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },

      // Coaching
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoCoaching.idTipo, // ← CORREGIDO: era tipoProgramacion
        titulo: "Coaching Personal y Profesional", // ← CORREGIDO: era "JavaScript Avanzado"
        descripcion: "Desarrolla habilidades de liderazgo, comunicación efectiva y crecimiento personal.",
        precio: 18999, // ← CORREGIDO: precio diferente
        estado: "aprobado", // ← CORREGIDO: era "pendiente"
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400", // ← CORREGIDO: sin espacio al final
      },

      // Fotografía
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoFotografia.idTipo,
        titulo: "Fotografía Digital Avanzada",
        descripcion: "Técnicas profesionales de fotografía, composición y edición con Lightroom y Photoshop.",
        precio: 16999,
        estado: "aprobado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },

      // Gastronomía
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoGastronomia.idTipo,
        titulo: "Gastronomía Internacional",
        descripcion: "Cocina platos exquisitos de diferentes culturas. Técnicas culinarias y presentación profesional.",
        precio: 14999,
        estado: "aprobado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },

      // IA
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoIA.idTipo,
        titulo: "Inteligencia Artificial con Python",
        descripcion: "Introducción al Machine Learning, Deep Learning y procesamiento de datos con Python.",
        precio: 29999,
        estado: "pendiente",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },

      // Innovación
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoInnovacion.idTipo,
        titulo: "Innovación y Emprendimiento",
        descripcion: "Desarrolla tu idea de negocio desde cero. Design thinking, lean startup y pitch deck.",
        precio: 21999,
        estado: "aprobado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },

      // Diseño
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoDiseno.idTipo,
        titulo: "Diseño UI/UX Completo",
        descripcion: "Principios de diseño de interfaces y experiencia de usuario. De wireframes a prototipos en Figma.",
        precio: 20999,
        estado: "aprobado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoDiseno.idTipo,
        titulo: "Figma Masterclass",
        descripcion: "Domina Figma para crear diseños profesionales y sistemas de diseño escalables.",
        precio: 12999,
        estado: "rechazado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
      },

      // Marketing
      {
        idProfesor: profesor.idUsuario,
        idTipo: tipoMarketing.idTipo,
        titulo: "Marketing Digital 2024",
        descripcion: "Estrategias de marketing digital: SEO, SEM, redes sociales, email marketing y analytics.",
        precio: 17999,
        estado: "aprobado",
        imagen: "https://drive.google.com/thumbnail?id=1ISBlJjaj9egb-T-qn3qXQoCXkb7vTKtv&sz=w400",
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
        cursosCreados.push(curso); // ← Guardar curso creado
      } else {
        console.log(`ℹ️ Curso ya existe: ${curso.titulo}`);
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
    console.log(`🛒 Total de compras: ${cursosParaComprar.length}`);
    console.log(`💰 Total gastado: $${cursosParaComprar.reduce((total, curso) => total + curso.precio, 0)}`);
  } catch (error) {
    console.error("❌ Error al crear datos:", error);
  } finally {
    await sequelize.close();
  }
};

createCursosData();
