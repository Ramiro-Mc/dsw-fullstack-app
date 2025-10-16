import { Curso } from '../models/Curso.js';
import { Modulo } from '../models/Modulo.js';
import { Leccion } from '../models/Leccion.js';
import { TipoCurso } from '../models/TipoCurso.js';
import { sequelize } from '../database/sequelize.js';

// Obtener todos los tipos de curso
export const obtenerTiposCurso = async (req, res) => {
  try {
    const tipos = await TipoCurso.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Crear curso completo con módulos y lecciones
export const crearCursoCompleto = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { titulo, descripcion, precio, idTipo, idProfesor, modulos } = req.body;

    // Validar que idProfesor esté presente
    if (!idProfesor) {
      return res.status(400).json({ error: 'ID del profesor es requerido' });
    }

    // Verificar si ya existe un curso con el mismo título (globalmente)
    const cursoExistente = await Curso.findOne({
      where: { 
        titulo: titulo
      }
    });

    if (cursoExistente) {
      return res.status(400).json({ 
        error: 'Ya existe un curso con este título. Por favor elige un nombre diferente.' 
      });
    }

    // Crear el curso
    const nuevoCurso = await Curso.create({
      titulo,
      descripcion,
      precio,
      idTipo,
      idProfesor
    }, { transaction });

    // Crear los módulos y sus lecciones
    for (const moduloData of modulos) {
      const nuevoModulo = await Modulo.create({
        idCurso: nuevoCurso.idCurso,
        titulo: moduloData.titulo
      }, { transaction });

      // Crear las lecciones del módulo
      if (moduloData.lecciones && moduloData.lecciones.length > 0) {
        for (const leccionData of moduloData.lecciones) {
          await Leccion.create({
            idModulo: nuevoModulo.idModulo,
            tituloLec: leccionData.tituloLec,
            descripcionLec: leccionData.descripcionLec,
            horasLec: leccionData.horasLec,
            videoUrl: leccionData.videoUrl,
            contenidoTexto: leccionData.contenidoTexto,
            imagenUrl: leccionData.imagenUrl,
            archivoUrl: leccionData.archivoUrl,
            estadoLec: leccionData.estadoLec || 'activo',
            completado: leccionData.completado || false
          }, { transaction });
        }
      }
    }

    await transaction.commit();

    // Obtener el curso completo creado
    const cursoCompleto = await Curso.findByPk(nuevoCurso.idCurso, {
      include: [
        {
          model: Modulo, as: "Modulos",
          include: [ { model: Leccion, as: "Lecciones" } ]
        },
        {
          model: TipoCurso, as: "TipoCurso"
        }
      ]
    });

    res.status(201).json(cursoCompleto);

  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear curso:', error);
    res.status(500).json({ error: error.message });
  }
};