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
      console.log(error.message);
    }
  },

  createDescuento: async (req, res) => {
    try {

      const { idDescuento, fechaDesde, fechahasta, porcentaje } = req.body;

      if (!idDescuento || !fechaDesde || !fechahasta || !porcentaje) {
        return res.status(400).json({
          success: false,
          msg: "No se ingresaron todos los datos necesarios"
        });
      }

      const newDescuento = await Descuento.create({
        idDescuento: idDescuento,
        fechaDesde: fechaDesde,
        fechahasta: fechahasta,
        porcentaje: porcentaje
      });

      res.status(201).json({
        success: true,
        msg: "Descuento creado",
        contenido: newDescuento,
      });
      
      
    }  catch (error) {
      console.log(error.message);
    }

  },

  updateDescuento: async (req, res) => {
    try {

      const { idDescuento } = req.params;
      const { fechaDesde, fechahasta, porcentaje } = req.body;


      const descuento = await Descuento.findByPk(idDescuento);

      if(!descuento){
        return res.status(404).json({
            success: false,
            msg: "descuento no encontrado"
        })
      }

      if (!idDescuento && !fechaDesde && !fechahasta && !porcentaje) {
        return res.status(404).json({
          success: false,
          msg: "No hay informacion para actualizar",
        });
      }

      await Descuento.update(
        { fechaDesde, fechahasta, porcentaje },
        { where: { idDescuento } }
      );

      res.status(200).json({
        success: true,
        msg: "Descuento actualizado correctamente",
        contenido: descuento,
      });
      
    } catch (error) {
      console.log(error.message);
    }
  },

  getDescuentoById: async (req, res) => {
    try {

      const { idDescuento } = req.params;
      const descuento = await Descuento.findByPk(idDescuento);

      if (!descuento) {
        return res.status(404).json({
          success: false,
          msg: "Descuento no encontrado",
        });
      }
      
        res.status(200).json({
          success: true,
          msg: "Descuento encontrado",     
          contenido: descuento
        })
      

    } catch (error) {
      console.log(error.message);
    }
  },

  deleteDescuento: async (req, res) => {
    try {
      const { idDescuento } = req.params;

      const deleted = await Descuento.destroy({
        where: { idDescuento: idDescuento },
      });

      if (deleted === 0) {
        return res.status(404).json({
          success: false,
          msg: "Descuento no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Descuento eliminado correctamente",
      });

    } catch (error) {
      console.log(error.message);
    }
  },
};
