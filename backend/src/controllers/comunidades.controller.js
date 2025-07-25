import { Comunidad } from "../models/Comunidad.js";

export const comunidadesController = {


  getAllComunidades: async (req, res) => {
    try {
      const allComunidades = await Comunidad.findAll();

      if (allComunidades.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "Comunidades no encontradas",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Todas las comunidades fueron envidas",
        contenido: allComunidades,
      });
    } catch (error) {
      console.log(error.message);
    }

  },

  getComunidadById: async (req, res) => {
    try {
      const { idCurso } = req.params;
      if (!idCurso) {
        return res.status(400).json({
          success: false,
          msg: "Falta el ID del curso",
        });
      }
      //Uso .findOne ya que el idCurso es clave foranea y primaria a la vez
      const comunidad = await Comunidad.findOne({ where: { idCurso } });

      if (!comunidad) {
        return res.status(404).json({
          success: false,
          msg: "Comunidad no encontrada",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Comunidad encontrada",
        contenido: comunidad,
      });
    } catch (error) {
      console.log(error.message);
    }
  },


  createComunidad: async (req, res) => {
    try {
      const { titulo, idCurso } = req.body;
      if (!titulo || !idCurso) {
        return res.status(400).json({
          success: false,
          msg: "Faltan campos obligatorios",
        });
      }
      const newComunidad = await Comunidad.create({ 
        titulo:titulo,
         idCurso:idCurso,
        }); //Deberia poner el idCurso aca?

      res.status(201).json({
        success: true,
        msg: "Comunidad creada con éxito",
        contenido: newComunidad,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  updateComunidad: async (req, res) => {
    try {
      const { idCurso } = req.params;
      const { titulo } = req.body;

      if (!idCurso) {
        return res.status(400).json({
          success: false,
          msg: "Falta el ID del Curso",
        });
      }

      if (!titulo) {
        return res.status(400).json({
          success: false,
          msg: "No hay información para actualizar",
        });
      }

      const comunidad = await Comunidad.findOne({ where: { idCurso } });
      if (!comunidad) {
        return res.status(404).json({
          success: false,
          msg: "Comunidad no encontrada",
        });
      }

      await comunidad.update({ titulo });

      res.status(200).json({
        success: true,
        msg: "Comunidad actualizada correctamente",
        contenido: comunidad,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
    deleteComunidad: async (req, res) => {
        try {
        const { idCurso } = req.params;
        if (!idCurso) {
            return res.status(400).json({
            success: false,
            msg: "Falta el ID del Curso",
            });
        }
    
        const comunidad = await Comunidad.findOne({ where: { idCurso } });
        if (!comunidad) {
            return res.status(404).json({
            success: false,
            msg: "Comunidad no encontrada",
            });
        }
    
        await comunidad.destroy();
    
        res.status(200).json({
            success: true,
            msg: "Comunidad eliminada correctamente",
        });
        } catch (error) {
        console.log(error.message);
        }
    },

 
};

export default comunidadesController;
