import { Comunidad } from "../models/Comunidad.js";
import { Curso } from "../models/Curso.js";

export const comunidadesController = {


  getAllComunidades: async (req, res) => {
    try {
      const allComunidades = await Comunidad.findAll();

      if (allComunidades.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay ninguna comunidad",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Comunidades enviadas",
        contenido: allComunidades,
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

  getComunidadById: async (req, res) => {
    try {
      const { idCurso } = req.params;
      
      const comunidad = await Comunidad.findOne(idCurso);

      res.status(200).json({
        success: true,
        msg: "Comunidad encontrada",
        contenido: comunidad,
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


  createComunidad: async (req, res) => {
    try {

      const { titulo, idCurso } = req.body;

      const newComunidad = await Comunidad.create({ titulo, idCurso: idCurso,});

      res.status(201).json({
        success: true,
        msg: "Comunidad creada con éxito",
        contenido: newComunidad,
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

  updateComunidad: async (req, res) => {
    try {

      const { idCurso } = req.params;
      const { titulo } = req.body;

      const comunidad = await Comunidad.findByPk(idCurso);

      await comunidad.update({ titulo });

      res.status(200).json({
        success: true,
        msg: "Comunidad actualizada correctamente",
        contenido: comunidad,
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

  deleteComunidad: async (req, res) => {
    try {

      const { idCurso } = req.params;

      await Comunidad.destroy({where: {idCurso:idCurso}});

      res.status(200).json({
        success: true,
        msg: "Comunidad eliminada correctamente",
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

export default comunidadesController;
