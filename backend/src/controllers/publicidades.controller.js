import { Publicidad } from "../models/Publicidad.js";

export const publicidadController = {
  getAllPublicidades: async (req, res) => {
    try {
      const allPublicidades = await Publicidad.findAll();

      if (allPublicidades.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay publicidades",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Publicidades enviados",
        contenido: allPublicidades,
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

  createPublicidad: async (req, res) => {
    try {
      const { fechaDesde, fechaHasta, precioDia, costoTotal } = req.body;

      const newPublicacidad = await Publicidad.create({ fechaDesde, fechaHasta, precioDia, costoTotal });

      res.status(201).json({
        success: true,
        msg: "Publicidad creada",
        contenido: newPublicacidad,
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

  updatePublicidad: async (req, res) => {
    try {
      const { idPublicidad } = req.params;
      const { fechaDesde, fechaHasta, precioDia, costoTotal } = req.body;

      const camposAActualizar = {};

      if (fechaDesde) {camposAActualizar.fechaDesde = fechaDesde;}
      if (fechaHasta) {camposAActualizar.fechaHasta = fechaHasta;}
      if (precioDia) {camposAActualizar.precioDia = precioDia;}
      if (costoTotal) {camposAActualizar.costoTotal = costoTotal;}

      await Publicidad.update(camposAActualizar, { where: { idPublicidad } });

      const publicidadActualizada = await Publicidad.findByPk(idPublicidad);

      res.status(200).json({
        success: true,
        msg: "Publicidad actualizada correctamente",
        atributo: publicidadActualizada,
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

  getPublicidadById: async (req, res) => {
    try {
      const { idPublicidad } = req.params;

      const publicidad = await Publicidad.findByPk(idPublicidad);

      res.status(200).json({
        success: true,
        msg: "Publicidad encontrada",
        informacion: publicidad,
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

  deletePublicidad: async (req, res) => {
    try {
      const { idPublicidad } = req.params;

      await Publicidad.destroy({where: { idPublicidad: idPublicidad }});

      res.status(200).json({
        success: true,
        msg: "Publicidad eliminada correctamente",
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
  }
};
