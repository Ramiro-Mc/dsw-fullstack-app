import { TipoCurso } from "../models/TipoCurso.js";
import { Op } from "sequelize";

export const tipoCursoController = {

  getAllTipos: async (req, res) => {
    try {
      const allTipos = await TipoCurso.findAll();

      if (allTipos.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay tipos de curso",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Se encontraron los tipos de curso",
        contenido: allTipos,
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

  createTipoCurso: async (req, res) => {
    try {
      const { nombreTipo, descripcion, icono } = req.body;

      const newTipo = await TipoCurso.create({ nombreTipo, descripcion, icono});

      res.status(201).json({
        success: true,
        msg: "Nuevo Tipo de Curso Creado",
        contenido: newTipo,
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

  updateTipoCurso: async (req, res) => {
    try {
      const { idTipo } = req.params;
      const { nombreTipo, descripcion, icono } = req.body;

      const camposAActualizar = {};

      if (nombreTipo) {camposAActualizar.nombreTipo = nombreTipo;}
      if (descripcion) {camposAActualizar.descripcion = descripcion;}
      if (icono) {camposAActualizar.icono = icono;}

      await TipoCurso.update(camposAActualizar, { where: { idTipo } });

      const tipoCursoActualizado = await TipoCurso.findByPk(idTipo);


      res.status(200).json({
        success: true,
        msg: "Tipo curso actualizado correctamente",
        atributo: tipoCursoActualizado,
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

  getTipoCursoById: async (req, res) => {
    try {
      const { idTipo } = req.params;

      const tipoCurso = await TipoCurso.findByPk(idTipo);

      res.status(200).json({
        success: true,
        msg: "Tipo curso encontrado",
        informacion: tipoCurso,
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

  deleteTipoCurso: async (req, res) => {
    try {
      const { idTipo } = req.params;

      await TipoCurso.destroy({where: { idTipo: idTipo }});

      res.status(200).json({
        success: true,
        msg: "TipoCurso eliminado correctamente",
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
