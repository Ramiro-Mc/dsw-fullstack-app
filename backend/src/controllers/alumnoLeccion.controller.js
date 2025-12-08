import { AlumnoLeccion } from "../models/AlumnoLeccion.js";
import { Leccion } from "../models/Leccion.js";
import { Modulo } from "../models/Modulo.js";

export const completarLeccion = async (req, res) => {
  try {
    const { numeroLec } = req.params;
    const { completado, idUsuario } = req.body;

    if (!idUsuario) {
      return res.status(400).json({
        success: false,
        msg: "ID de usuario es obligatorio"
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
      await alumnoLeccion.update({
        completado: completado,
        fechaCompletado: completado ? new Date() : null
      });
    }

    res.status(200).json({
      success: true,
      msg: completado ? "Lección marcada como completada" : "Lección marcada como no completada",
      contenido: alumnoLeccion
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message || "Error al actualizar la lección"
    });
  }
};

export const obtenerProgresoUsuario = async (req, res) => {
  try {
    const { idUsuario, idCurso } = req.params;

    if (!idUsuario || !idCurso) {
      return res.status(400).json({
        success: false,
        msg: "ID de usuario e ID de curso son obligatorios"
      });
    }

    // Obtener todas las lecciones del curso con el progreso del usuario
    const progreso = await AlumnoLeccion.findAll({
      where: { idUsuario: idUsuario },
      include: [
        {
          model: Leccion,
          as: "Leccion",
          attributes: ["numeroLec", "tituloLec", "idModulo"],
          include: [
            {
              model: Modulo,
              as: "ModuloDeLeccion",
              attributes: ["idModulo", "idCurso"],
              where: { idCurso: idCurso }
            }
          ]
        }
      ],
      attributes: ["idUsuario", "numeroLec", "completado", "fechaCompletado"]
    });

    res.status(200).json({
      success: true,
      msg: "Progreso del usuario obtenido",
      contenido: progreso
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message || "Error al obtener el progreso del usuario"
    });
  }
};