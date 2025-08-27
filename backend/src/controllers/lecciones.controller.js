import { Leccion } from "../models/Leccion.js";

export const leccionController = {

  getAllLecciones: async (req, res) => {
    try {
      const allLecciones = await Leccion.findAll();

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
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  getLeccionById: async (req, res) => {
    try {
      const { idLeccion } = req.params;

      const leccion = await Leccion.findByPk(idLeccion);

      res.status(200).json({
        success: true,
        msg: "leccion encontrada",
        contenido: leccion,
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

  createLeccion: async (req, res) => {
    try {
      const { numeroLec, tituloLec, descripcionLec, estadoLec, horasLec, idModulo } = req.body;

      const newLeccion = await Leccion.create({ numeroLec, tituloLec, descripcionLec, estadoLec, horasLec, idModulo });

      res.status(201).json({
        success: true,
        msg: "Leccion creada",
        contenido: newLeccion,
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

  updateLeccion: async (req, res) => {
    try {
      const { idLeccion } = req.params;
      const { numeroLec, tituloLec, descripcionLec, estadoLec, horasLec, idModulo } = req.body;

      const camposAActualizar = {};

      if (numeroLec) {camposAActualizar.numeroLec = numeroLec;}
      if (tituloLec) {camposAActualizar.tituloLec = tituloLec;}
      if (descripcionLec) {camposAActualizar.descripcionLec = descripcionLec;}
      if (estadoLec) {camposAActualizar.estadoLec = estadoLec;}
      if (horasLec) {camposAActualizar.horasLec = horasLec;}
      if (idModulo) {camposAActualizar.idModulo = idModulo;}

      await Leccion.update(camposAActualizar, { where: { idLeccion } });

      const leccionActualizada = await Leccion.findByPk(idLeccion);

      res.status(200).json({
        success: true,
        msg: "Leccion actualizado correctamente",
        atributo: leccionActualizada,
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

  deleteLeccion: async (req, res) => {
    try {
      const { idLeccion } = req.params;

      await Leccion.destroy({where: { idLeccion: idLeccion }});

      res.status(200).json({
        success: true,
        msg: "Leccion eliminada correctamente",
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
