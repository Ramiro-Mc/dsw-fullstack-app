import { AlumnoCurso } from "../models/AlumnoCurso.js";

export const alumnoCursoController = {

  getAllAlumnosCursos: async (req, res) => {
    try {
      const all = await AlumnoCurso.findAll();
      if (all.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay relaciones alumno-curso",
        });
      }
      res.status(200).json({
        success: true,
        msg: "Relaciones alumno-curso enviadas",
        contenido: all,
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

  createAlumnosCurso: async (req, res) => {
    try {
      const { idUsuario, idCurso } = req.body;
      const nuevaRelacion = await AlumnoCurso.create({ idUsuario, idCurso });
      res.status(201).json({
        success: true,
        msg: "Relación alumno-curso creada",
        contenido: nuevaRelacion,
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

  deleteAlumnosCurso: async (req, res) => {
    try {
      const { idUsuario, idCurso } = req.params;
      await AlumnoCurso.destroy({ where: { idUsuario, idCurso } });
      res.status(200).json({
        success: true,
        msg: "Relación alumno-curso eliminada correctamente",
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

  getAlumnosCursoById: async (req, res) => {
    try {
      const { idUsuario, idCurso } = req.params;
      const relacion = await AlumnoCurso.findOne({ where: { idUsuario, idCurso } });
      res.status(200).json({
        success: true,
        msg: "Relación alumno-curso encontrada",
        contenido: relacion,
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
};