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
      console.log(error.message);
    }
  },

  createTipoCurso: async (req, res) => {
    try {
      const { idTipo, nombreTipo, descripcion } = req.body;

      if (!nombreTipo || !descripcion) {
        return res.status(400).json({
          success: false,
          msg: "Faltan datos para crear el tipo de curso",
        });
      }

      const tipoExistente = await TipoCurso.findOne({
        where: {
          [Op.and]: [{ nombreTipo: nombreTipo }, { descripcion: descripcion }],
        },
      });


      if (tipoExistente !== null) {
        if (tipoExistente.idTipo === idTipo) {
          return res.status(400).json({
            success: false,
            msg: "Ya hay un tipo de curso con ese nombre y descripcion",
          });
        }
      }

      const newTipo = await TipoCurso.create({
        idTipo: idTipo,
        nombreTipo: nombreTipo,
        descripcion: descripcion,
      });

      res.status(201).json({
        success: true,
        msg: "Nuevo Tipo de Curso Creado",
        contenido: newTipo,
      });

      console.log(newTipo);

    } catch (error) {
      console.log(error.message);
    }
  },

  updateTipoCurso: async (req, res) => {
    try {
      const { idTipo } = req.params;
      const { nombreTipo, descripcion } = req.body;


      const tipoCurso = await TipoCurso.findByPk(idTipo);

      if (!tipoCurso) {
        return res.status(404).json({
          success: false,
          msg: "TipoCurso no encontrado",
        });
      }

      if (!nombreTipo && !descripcion) {
        return res.status(404).json({
          success: false,
          msg: "No hay información para actualizar",
        });
      }

      // await TipoCurso.update(
      //   { nombreTipo, descripcion },
      //   { where: { idTipo } }
      // );

      const camposAActualizar = {};

      if (nombreTipo) {
        camposAActualizar.nombreTipo = nombreTipo;
      }

      if (descripcion) {
        camposAActualizar.descripcion = descripcion;
      }

      await TipoCurso.update(camposAActualizar, { where: { idTipo } });


      res.status(200).json({
        success: true,
        msg: "TipoCurso actualizado correctamente",
        atributo: camposAActualizar,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getTipoCursoById: async (req, res) => {
    try {
      const { idTipo } = req.params;
      const tipoCurso = await TipoCurso.findByPk(idTipo);

      if (!tipoCurso) {
        return res.status(404).json({
          success: false,
          msg: "TipoCurso no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "TipoCurso encontrado",
        informacion: tipoCurso,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteTipoCurso: async (req, res) => {
    try {
      const { idTipo } = req.params;

      const deleted = await TipoCurso.destroy({
        where: { idTipo: idTipo },
      });

      if (deleted === 0) {
        return res.status(404).json({
          success: false,
          msg: "TipoCurso no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "TipoCurso eliminado correctamente",
      });
      
    } catch (error) {
      console.log(error.message);
    }
  },
};
