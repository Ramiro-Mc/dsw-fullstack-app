import { Leccion } from "../models/Leccion.js";
import { Modulo } from "../models/Modulo.js";

export const leccionController = {

  getAllLecciones: async (req, res) => {
    try {
      const allLecciones = await Leccion.findAll({
        include: [
          {
            model: Modulo,
            as: 'ModuloDeLeccion',
            attributes: ['idModulo', 'titulo']
          }
        ]
      });

      if (allLecciones.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay lecciones",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Lecciones enviadas",
        contenido: allLecciones,
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

  getLeccionById: async (req, res) => {
    try {
      const { numeroLec } = req.params; 

      const leccion = await Leccion.findByPk(numeroLec, {
        include: [
          {
            model: Modulo,
            as: 'ModuloDeLeccion',
            attributes: ['idModulo', 'titulo']
          }
        ]
      });

      if (!leccion) {
        return res.status(404).json({
          success: false,
          msg: "Lección no encontrada",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Lección encontrada",
        contenido: leccion,
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

  createLeccion: async (req, res) => {
    try {
      
      const { 
        idModulo, 
        tituloLec, 
        descripcionLec,  
        horasLec, 
        videoUrl, 
        contenidoTexto, 
        imagenUrl, 
        archivoUrl 
      } = req.body;

      const newLeccion = await Leccion.create({ 
        idModulo, 
        tituloLec, 
        descripcionLec,    
        horasLec, 
        videoUrl, 
        contenidoTexto, 
        imagenUrl, 
        archivoUrl 
      });

      res.status(201).json({
        success: true,
        msg: "Lección creada",
        contenido: newLeccion,
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

  updateLeccion: async (req, res) => {
    try {
      const { numeroLec } = req.params; 
      const updateData = req.body;

      const [updatedRowsCount] = await Leccion.update(updateData, {
        where: { numeroLec } 
      });

      if (updatedRowsCount === 0) {
        return res.status(404).json({
          success: false,
          msg: "Lección no encontrada",
        });
      }

      const leccionActualizada = await Leccion.findByPk(numeroLec, {
        include: [
          {
            model: Modulo,
            as: 'ModuloDeLeccion',
            attributes: ['idModulo', 'titulo']
          }
        ]
      });

      res.status(200).json({
        success: true,
        msg: "Lección actualizada correctamente",
        contenido: leccionActualizada, 
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

  deleteLeccion: async (req, res) => {
    try {
      const { numeroLec } = req.params; 

      const deletedRowsCount = await Leccion.destroy({
        where: { numeroLec } 
      });

      if (deletedRowsCount === 0) {
        return res.status(404).json({
          success: false,
          msg: "Lección no encontrada",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Lección eliminada correctamente",
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

  getLeccionesByModulo: async (req, res) => {
    try {
      const { idModulo } = req.params;

      const lecciones = await Leccion.findAll({
        where: { idModulo },
        include: [
          {
            model: Modulo,
            as: 'ModuloDeLeccion',
            attributes: ['idModulo', 'titulo']
          }
        ],
        order: [['numeroLec', 'ASC']]
      });

      if (lecciones.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No se encontraron lecciones para este módulo",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Lecciones del módulo enviadas",
        contenido: lecciones,
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