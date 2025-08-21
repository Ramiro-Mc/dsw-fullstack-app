import { Publicacion } from "../models/Publicacion.js";
import { Op } from "sequelize";

export const publicacionController = {

  getAllPublicaciones: async (req, res) => {
    try {
      const allPublicaciones = await Publicacion.findAll();

      if (allPublicaciones.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay publicaciones",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Se encontraron las publicaciones",
        contenido: allPublicaciones,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createPublicacion: async (req, res) => {
    try {
      const {titulo, contenido, comentarios, fechaPublicacion } = req.body;

      if (!titulo || !contenido || !comentarios || !fechaPublicacion) {
        return res.status(400).json({
          success: false,
          msg: "Faltan datos para crear la Publicacion",
        });
      }

      const newPublicacion = await Publicacion.create({
        titulo: titulo,
        contenido: contenido,
        comentarios: comentarios,
        fechaPublicacion: fechaPublicacion,
      });

      res.status(201).json({
        success: true,
        msg: "Nueva publicacion Creado",
        contenido: newPublicacion,
      });


    } catch (error) {
      console.log(error.message);
    }
  },

  updatePublicacion: async (req, res) => {
    try {
      const { idPublicacion } = req.params;
      const { titulo, contenido, comentarios, fechaPublicacion } = req.body;


      const publicacion = await Publicacion.findByPk(idTipo);

      if (!publicacion) {
        return res.status(404).json({
          success: false,
          msg: "Publicacion no encontrada",
        });
      }

      if (idPublicacion && !titulo && !contenido && !comentarios && !fechaPublicacion) {
        return res.status(404).json({
          success: false,
          msg: "No hay información para actualizar",
        });
      }
      
      await Publicacion.update(
        { titulo, contenido, comentarios, fechaPublicacion },
        { where: { idPublicacion } }
      );

      res.status(200).json({
        success: true,
        msg: "Publicacion actualizada correctamente",
        atributo: publicacion,
      });

    } catch (error) {
      console.log(error.message);
    }
  },

  getPublicacionById: async (req, res) => {
    try {
      const { idPublicacion } = req.params;
      const publicacion = await Publicacion.findByPk(idPublicacion);

      if (!publicacion) {
        return res.status(404).json({
          success: false,
          msg: "Publicacion no encontrada",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Publicacion encontrada",
        informacion: publicacion,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  deletePublicacion: async (req, res) => {
    try {
      const { idPublicacion } = req.params;

      const deleted = await Publicacion.destroy({
        where: { idPublicacion: idPublicacion },
      });

      if (deleted === 0) {
        return res.status(404).json({
          success: false,
          msg: "Publicacion no encontrada",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Publicacion eliminada correctamente",
      });
      
    } catch (error) {
      console.log(error.message);
    }
  },
};
