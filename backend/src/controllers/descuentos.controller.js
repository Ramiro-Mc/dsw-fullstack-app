import { Descuento } from "../models/Descuento.js";

export const descuentoController = {

  getAllDescuentos: async (req, res) => {
    try {

      const allDescuentos = await Descuento.findAll();

      if (allDescuentos.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay descuentos",
        });
      }

      res.status(200).json({
        success: true,
        msg: "descuentos enviados",
        contenido: allDescuentos,
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

  createDescuento: async (req, res) => {
    try {

      const { fechaDesde, fechahasta, porcentaje } = req.body;

      const newDescuento = await Descuento.create({ fechaDesde, fechahasta, porcentaje }); 

      res.status(201).json({
        success: true,
        msg: "Descuento creado",
        contenido: newDescuento,
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

  updateDescuento: async (req, res) => {
    try {

      const { idDescuento } = req.params;
      const { fechaDesde, fechahasta, porcentaje } = req.body;

      const camposAActualizar = {};

      if (fechaDesde) {camposAActualizar.fechaDesde = fechaDesde;}
      if (fechahasta) {camposAActualizar.fechahasta = fechahasta;}
      if (porcentaje) {camposAActualizar.porcentaje = porcentaje;}

      await Descuento.update(camposAActualizar, { where: { idDescuento } });

      const descuentoActualizado = await Descuento.findByPk(idDescuento);

      res.status(200).json({
        success: true,
        msg: "Descuento actualizado correctamente",
        contenido: descuentoActualizado,
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

  getDescuentoById: async (req, res) => {
    try {

      const { idDescuento } = req.params;

      const descuento = await Descuento.findByPk(idDescuento);

      res.status(200).json({
        success: true,
        msg: "Descuento encontrado",     
        contenido: descuento
      })

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

  deleteDescuento: async (req, res) => {
    try {
      const { idDescuento } = req.params;

      await Descuento.destroy({where: { idDescuento: idDescuento }});

      res.status(200).json({
        success: true,
        msg: "Descuento eliminado correctamente",
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
