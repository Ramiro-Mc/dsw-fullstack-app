import { Modulo } from "../models/Modulo.js";
import { Curso } from "../models/Curso.js";

export const modulosController = {
  getAllModulos: async (req, res) => {
    try {
      const allModulos = await Modulo.findAll({
        include: [
          {
            model: Curso,
            as: 'curso',
            attributes: ['idCurso', 'titulo']
          }
        ]
      });

      if (allModulos.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No se encontraron módulos",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Módulos enviados",
        contenido: allModulos,
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

  createModulo: async (req, res) => {
    try {
      const { titulo, idCurso } = req.body;

      const newModulo = await Modulo.create({ 
        titulo, 
        idCurso 
      });

      res.status(201).json({
        success: true,
        msg: "Módulo creado",
        contenido: newModulo,
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

  updateModulo: async (req, res) => {
    try {
      const { idModulo } = req.params;
      const updateData = req.body;

      const [updatedRowsCount] = await Modulo.update(updateData, {
        where: { idModulo },
      });

      if (updatedRowsCount === 0) {
        return res.status(404).json({
          success: false,
          msg: "Módulo no encontrado",
        });
      }

      const updatedModulo = await Modulo.findByPk(idModulo, {
        include: [
          {
            model: Curso,
            as: 'curso',
            attributes: ['idCurso', 'titulo']
          }
        ]
      });

      res.status(200).json({
        success: true,
        msg: "Módulo actualizado",
        contenido: updatedModulo,
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

  getModuloById: async (req, res) => {
    try {
      const { idModulo } = req.params;

      const modulo = await Modulo.findByPk(idModulo, {
        include: [
          {
            model: Curso,
            as: 'curso',
            attributes: ['idCurso', 'titulo']
          }
        ]
      });

      if (!modulo) {
        return res.status(404).json({
          success: false,
          msg: "Módulo no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Módulo encontrado",
        contenido: modulo,
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

  deleteModulo: async (req, res) => {
    try {
      const { idModulo } = req.params;

      const deletedRowsCount = await Modulo.destroy({
        where: { idModulo },
      });

      if (deletedRowsCount === 0) {
        return res.status(404).json({
          success: false,
          msg: "Módulo no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Módulo eliminado",
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

  getModulosByCurso: async (req, res) => {
    try {
      const { idCurso } = req.params;

      const modulos = await Modulo.findAll({
        where: { idCurso },
        include: [
          {
            model: Curso,
            as: 'curso',
            attributes: ['idCurso', 'titulo']
          }
        ],
        order: [['idModulo', 'ASC']]
      });

      if (modulos.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No se encontraron módulos para este curso",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Módulos del curso enviados",
        contenido: modulos,
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