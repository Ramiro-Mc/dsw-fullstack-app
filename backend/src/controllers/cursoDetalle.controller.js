import { Curso, Modulo, Clase, TipoCurso } from '../models/index.js';

export const cursoDetalleController = {
  
  getCursoCompleto: async (req, res) => {
    try {
      const { idCurso } = req.params;

      const curso = await Curso.findByPk(idCurso, {
        include: [
          {
            model: TipoCurso,
            as: 'tipoCurso'
          },
          {
            model: Modulo,
            as: 'modulos',
            include: [
              {
                model: Clase,
                as: 'clases'
              }
            ]
          }
        ]
      });

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

  completarClase: async (req, res) => {
    try {
      const { idClase } = req.params;
      const { completado } = req.body;

      await Clase.update(
        { completado: completado },
        { where: { idClase } }
      );

      res.status(200).json({
        success: true,
        msg: "Progreso actualizado correctamente"
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

  // Método adicional para obtener clases de un módulo
  getClasesByModulo: async (req, res) => {
    try {
      const { idModulo } = req.params;

      const clases = await Clase.findAll({
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