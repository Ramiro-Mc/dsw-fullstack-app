import { Publicacion } from "../models/Publicacion.js";

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
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  createPublicacion: async (req, res) => {
    try {

      const {titulo, contenido, comentarios, fechaPublicacion } = req.body;

      const newPublicacion = await Publicacion.create({titulo, contenido, comentarios, fechaPublicacion});

      res.status(201).json({
        success: true,
        msg: "Nueva publicacion Creada",
        contenido: newPublicacion,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  updatePublicacion: async (req, res) => {
    try {
      const { idPublicacion } = req.params;
      const { titulo, contenido, comentarios, fechaPublicacion } = req.body;


      const camposAActualizar = {};

      if (titulo) {camposAActualizar.titulo = titulo;}
      if (contenido) {camposAActualizar.contenido = contenido;}
      if (comentarios) {camposAActualizar.comentarios = comentarios;}
      if (fechaPublicacion) {camposAActualizar.fechaPublicacion = fechaPublicacion;}

      await Publicacion.update(camposAActualizar, { where: { idPublicacion } });

      const publicacionActualizada = await Publicacion.findByPk(idPublicacion);

      res.status(200).json({
        success: true,
        msg: "Publicacion actualizada correctamente",
        atributo: publicacionActualizada,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  getPublicacionById: async (req, res) => {
    try {
      const { idPublicacion } = req.params;
      const publicacion = await Publicacion.findByPk(idPublicacion);

      res.status(200).json({
        success: true,
        msg: "Publicacion encontrada",
        informacion: publicacion,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  deletePublicacion: async (req, res) => {
    try {
      const { idPublicacion } = req.params;

      await Publicacion.destroy({where: { idPublicacion: idPublicacion }});

      res.status(200).json({
        success: true,
        msg: "Publicacion eliminada correctamente",
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },
};
