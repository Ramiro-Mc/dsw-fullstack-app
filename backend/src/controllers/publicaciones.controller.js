import { Publicacion } from "../models/Publicacion.js";
import { Comunidad } from "../models/Comunidad.js";
import { Usuario } from "../models/Usuario.js";
import { Curso } from "../models/Curso.js";

export const publicacionController = {

  getAllPublicaciones: async (req, res) => {
    try {
      const allPublicaciones = await Publicacion.findAll({
        include: [
          {
            model: Usuario,
            as: "UsuarioDePublicacion",
            attributes: ["idUsuario", "nombreUsuario"]
          },
          {
            model: Comunidad,
            as: "ComunidadDePublicacion",
            attributes: ["idComunidad", "titulo"],
            include: [
              {
                model: Curso,
                as: "CursoDeComunidad",
                attributes: ["idCurso", "titulo"]
              }
            ]
          }
        ],
        order: [["fechaPublicacion", "DESC"]] 
      });

      if (allPublicaciones.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay publicaciones",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Se encontraron las publicaciones",
        contenido: allPublicaciones,
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

  //  publicaciones por comunidad
  getPublicacionesByComunidad: async (req, res) => {
    try {
      const { idComunidad } = req.params;

      const publicaciones = await Publicacion.findAll({
        where: { idComunidad },
        include: [
          {
            model: Usuario,
            as: "UsuarioDePublicacion",
            attributes: ["idUsuario", "nombreUsuario"]
          }
        ],
        order: [["fechaPublicacion", "DESC"]]
      });

      res.status(200).json({
        success: true,
        msg: "Publicaciones de la comunidad obtenidas",
        contenido: publicaciones,
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

 
  createPublicacion: async (req, res) => {
    try {
      const { titulo, contenido, idComunidad, idUsuario } = req.body;

      //  Validar que la comunidad existe
      const comunidadExiste = await Comunidad.findByPk(idComunidad);
      if (!comunidadExiste) {
        return res.status(404).json({
          success: false,
          msg: "La comunidad especificada no existe"
        });
      }

      // Validar que el usuario existe
      const usuarioExiste = await Usuario.findByPk(idUsuario);
      if (!usuarioExiste) {
        return res.status(404).json({
          success: false,
          msg: "El usuario especificado no existe"
        });
      }

      const newPublicacion = await Publicacion.create({
        titulo, 
        contenido, 
        idComunidad, 
        idUsuario
      });

      const publicacionCompleta = await Publicacion.findByPk(newPublicacion.idPublicacion, {
        include: [
          {
            model: Usuario,
            as: "UsuarioDePublicacion",
            attributes: ["idUsuario", "nombreUsuario"]
          },
          {
            model: Comunidad,
            as: "ComunidadDePublicacion",
            attributes: ["idComunidad", "titulo"]
          }
        ]
      });

      res.status(201).json({
        success: true,
        msg: "Nueva publicacion creada",
        contenido: publicacionCompleta,
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

  updatePublicacion: async (req, res) => {
    try {
      const { idPublicacion } = req.params;
      const { titulo, contenido } = req.body; 

      //  Verificar que existe
      const publicacion = await Publicacion.findByPk(idPublicacion);
      if (!publicacion) {
        return res.status(404).json({
          success: false,
          msg: "Publicación no encontrada"
        });
      }

      const camposAActualizar = {};
      if (titulo) { camposAActualizar.titulo = titulo; }
      if (contenido) { camposAActualizar.contenido = contenido; }

      await Publicacion.update(camposAActualizar, { where: { idPublicacion } });

      const publicacionActualizada = await Publicacion.findByPk(idPublicacion, {
        include: [
          {
            model: Usuario,
            as: "UsuarioDePublicacion",
            attributes: ["idUsuario", "nombreUsuario"]
          }
        ]
      });

      res.status(200).json({
        success: true,
        msg: "Publicacion actualizada correctamente",
        contenido: publicacionActualizada, 
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

  getPublicacionById: async (req, res) => {
    try {
      const { idPublicacion } = req.params;
      
      const publicacion = await Publicacion.findByPk(idPublicacion, {
        include: [
          {
            model: Usuario,
            as: "UsuarioDePublicacion",
            attributes: ["idUsuario", "nombreUsuario"]
          },
          {
            model: Comunidad,
            as: "ComunidadDePublicacion",
            attributes: ["idComunidad", "titulo"]
          }
        ]
      });

      if (!publicacion) {
        return res.status(404).json({
          success: false,
          msg: "Publicación no encontrada"
        });
      }

      res.status(200).json({
        success: true,
        msg: "Publicacion encontrada",
        contenido: publicacion, 
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

  deletePublicacion: async (req, res) => {
    try {
      const { idPublicacion } = req.params;

      const publicacion = await Publicacion.findByPk(idPublicacion);
      if (!publicacion) {
        return res.status(404).json({
          success: false,
          msg: "Publicación no encontrada"
        });
      }

      await Publicacion.destroy({ where: { idPublicacion } });

      res.status(200).json({
        success: true,
        msg: "Publicacion eliminada correctamente",
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

export default publicacionController;