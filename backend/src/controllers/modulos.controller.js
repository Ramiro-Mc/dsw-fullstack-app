import { Modulo } from "../models/Modulo.js";


export const moduloController = {
    getAllModulos: async (req, res) => {
    try {
      const allModulos = await Modulo.findAll();

      if (allModulos.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay ningun Modulo",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Modulos enviados",
        contenido: allModulos,
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

  getModuloById: async (req, res) => {
    try {
      const { idModulo } = req.params;
      
      const modulo = await Modulo.findByPk(idModulo);

      res.status(200).json({
        success: true,
        msg: "Modulo encontrado",
        contenido: modulo,
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

  createModulo: async (req, res) => {
    try {

      const { idModulo, titulo, idCurso } = req.body;

      const newModulo = await Modulo.create({ idModulo, titulo, idCurso});

      res.status(201).json({
        success: true,
        msg: "Modulo creado",
        contenido: newModulo,
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

  updateModulo: async (req, res) => {
    try {

      const { idModulo } = req.params;
      const { titulo, idCurso } = req.body;

      const camposAActualizar = {};
      
      if (idModulo) camposAActualizar.idModulo = idModulo;
      if (titulo) camposAActualizar.titulo = titulo;
      if (idCurso) camposAActualizar.idCurso = idCurso;

      await Modulo.update(camposAActualizar, { where: { idModulo }});

      const moduloActualizado = await Modulo.findByPk(idModulo);

      res.status(200).json({
        success: true,
        msg: "Modulo actualizado correctamente",
        atributo: moduloActualizado,
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

  deleteModulo: async (req, res) => {
    try {

      const { idModulo } = req.params;

      await Modulo.destroy({where: {idModulo:idModulo}});

      res.status(200).json({
        success: true,
        msg: "Modulo eliminado correctamente",
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