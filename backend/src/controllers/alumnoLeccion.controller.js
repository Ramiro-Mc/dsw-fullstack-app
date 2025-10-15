import { AlumnoLeccion } from "../models/AlumnoLeccion.js";

export const completarLeccion = async (req, res) => {
  try {
    const { numeroLec } = req.params;
    const { completado, idUsuario } = req.body; // Agregar idUsuario

    if (!idUsuario) {
      return res.status(400).json({ 
        success: false, 
        msg: 'ID de usuario requerido' 
      });
    }

    // Buscar o crear el registro de progreso
    const [alumnoLeccion, created] = await AlumnoLeccion.findOrCreate({
      where: { 
        idUsuario: idUsuario, 
        numeroLec: numeroLec 
      },
      defaults: { 
        completado: completado,
        fechaCompletado: completado ? new Date() : null
      }
    });

    // Si ya existía, actualizar
    if (!created) {
      alumnoLeccion.completado = completado;
      alumnoLeccion.fechaCompletado = completado ? new Date() : null;
      await alumnoLeccion.save();
    }

    res.json({
      success: true,
      msg: 'Progreso actualizado correctamente',
      data: alumnoLeccion
    });

  } catch (error) {
    console.error('Error al actualizar progreso:', error);
    res.status(500).json({
      success: false,
      msg: 'Error interno del servidor'
    });
  }
};

export const obtenerProgresoUsuario = async (req, res) => {
  try {
    const { idUsuario, idCurso } = req.params;

    // Obtener todas las lecciones del curso con el progreso del usuario
    const progreso = await AlumnoLeccion.findAll({
      where: { idUsuario },
      include: [{
        model: Leccion,
        as: 'Leccion',
        include: [{
          model: Modulo,
          as: 'Modulo',
          where: { idCurso }
        }]
      }]
    });

    res.json({
      success: true,
      progreso: progreso
    });

  } catch (error) {
    console.error('Error al obtener progreso:', error);
    res.status(500).json({
      success: false,
      msg: 'Error interno del servidor'
    });
  }
};