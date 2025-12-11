import { Curso } from '../models/Curso.js';
import { Modulo } from '../models/Modulo.js';
import { Leccion } from '../models/Leccion.js';
import { TipoCurso } from '../models/TipoCurso.js';

export const cursoDetalleController = {
  
  getCursoCompleto: async (req, res) => {
    try {
      const { idCurso } = req.params;

      const curso = await Curso.findByPk(idCurso, {
        include: [
          {
            model: TipoCurso,
            as: 'TipoCurso' 
          },
          {
            model: Modulo,
            as: 'Modulos',
            include: [
              {
                model: Leccion,
                as: 'Lecciones' 
              }
            ]
          }
        ]
      });
      
      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado"
        });
      }
      res.status(200).json({
        success: true,
        msg: "Curso cargado correctamente",
        contenido: curso
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development"
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },


  // obtener lecciones de un módulo
  getLeccionesByModulo: async (req, res) => {
    try {
      const { idModulo } = req.params;

      const lecciones = await Leccion.findAll({
        where: { idModulo },
        order: [['orden', 'ASC']]
      });

      res.status(200).json({
        success: true,
        msg: "Clases obtenidas correctamente",
        contenido: clases
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development"
          ? error.message 
          : "Error interno del servidor",
      });
    }
  }

};