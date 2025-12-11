import { Comunidad } from "../models/Comunidad.js";
import { Curso } from "../models/Curso.js";
import { Publicacion } from "../models/Publicacion.js";
import { Usuario } from "../models/Usuario.js";

export const comunidadesController = {

  //  todas las comunidades con sus cursos
  getAllComunidades: async (req, res) => {
    try {
      const allComunidades = await Comunidad.findAll({
        include: [
          {
            model: Curso,
            as: "CursoDeComunidad",
            attributes: ["idCurso", "titulo", "descripcion"] 
          }
        ]
      });

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
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  
  getComunidadById: async (req, res) => {
    try {
      const { idComunidad } = req.params;

      const comunidad = await Comunidad.findByPk(idComunidad, {
        include: [
          {
            model: Curso,
            as: "CursoDeComunidad",
            attributes: ["idCurso", "titulo", "descripcion"]
          },
          {
            model: Publicacion,
            as: "PublicacionesDeComunidad", 
            include: [
              {
                model: Usuario, //  importar Usuario
                as: "UsuarioDePublicacion",
                attributes: ["idUsuario", "nombreUsuario"]
              }
            ]
          }
        ]
      });

      if (!comunidad) {
        return res.status(404).json({
          success: false,
          msg: "Comunidad no encontrada"
        });
      }

      res.status(200).json({
        success: true,
        msg: "Comunidad encontrada",
        contenido: comunidad, 
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

  // buscar comunidad por idCurso
  getComunidadByCurso: async (req, res) => {
    try {
      const { idCurso } = req.params;

      const comunidad = await Comunidad.findOne({
        where: { idCurso }, 
        include: [
          {
            model: Curso,
            as: "CursoDeComunidad",
            attributes: ["idCurso", "titulo", "descripcion"]
          },
          {
            model: Publicacion,
            as: "PublicacionesDeComunidad"
          }
        ]
      });

      if (!comunidad) {
        return res.status(404).json({
          success: false,
          msg: "No existe comunidad para este curso"
        });
      }

      res.status(200).json({
        success: true,
        msg: "Comunidad encontrada",
        contenido: comunidad,
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

  createComunidad: async (req, res) => {
    try {
      const { titulo, idCurso } = req.body;

      //  Verificar que el curso existe
      const cursoExiste = await Curso.findByPk(idCurso);
      if (!cursoExiste) {
        return res.status(404).json({
          success: false,
          msg: "El curso especificado no existe"
        });
      }

      // Verificar que el curso no tenga ya una comunidad
      const comunidadExistente = await Comunidad.findOne({ where: { idCurso } });
      if (comunidadExistente) {
        return res.status(409).json({
          success: false,
          msg: "Este curso ya tiene una comunidad"
        });
      }

      const newComunidad = await Comunidad.create({ titulo, idCurso });

      res.status(201).json({
        success: true,
        msg: "Comunidad creada con éxito",
        contenido: newComunidad,
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

  updateComunidad: async (req, res) => {
    try {
      const { idComunidad } = req.params; 
      const { titulo } = req.body;

      const comunidad = await Comunidad.findByPk(idComunidad);

      if (!comunidad) {
        return res.status(404).json({
          success: false,
          msg: "Comunidad no encontrada"
        });
      }

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
        msg: process.env.NODE_ENV === "development"
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

 
  deleteComunidad: async (req, res) => {
    try {
      const { idComunidad } = req.params; 

      const comunidad = await Comunidad.findByPk(idComunidad);

      if (!comunidad) {
        return res.status(404).json({
          success: false,
          msg: "Comunidad no encontrada"
        });
      }

      await Comunidad.destroy({ where: { idComunidad } });

      res.status(200).json({
        success: true,
        msg: "Comunidad eliminada correctamente",
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

export default comunidadesController;