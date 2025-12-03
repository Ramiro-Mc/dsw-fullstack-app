import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Curso } from "../models/Curso.js";

export const usuarioController = {

  getAllUsuarios: async (req , res) => {
  try {
    const where = {};

    // Filtrar por tipo de usuario si se proporciona
    if (req.query.tipoUsuario) {
      where.tipoUsuario = req.query.tipoUsuario;
    }

    // Por defecto solo mostrar usuarios activos, a menos que se pida mostrar todos
    if (req.query.includeInactivos !== "true") {
      where.activo = true;
    }

    const include = [];
    if (req.query.includeCursos === "true") {
      include.push({
        model: Curso,
        as: "CursosCreados",
      });
    }

    const allUsuarios = await Usuario.findAll({
      where,
      include: [{
        model: Curso,
        as: "CursosCreados" 
      }]
    });

    if (allUsuarios.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No hay usuarios",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Usuarios enviados",
      contenido: allUsuarios,
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

 createUsuario: async (req, res) => {
    try {
      const { nombreUsuario, email, contrasena, tipoUsuario, nombreReferido, fotoDePerfil, banco, cvu, alias } = req.body;
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      const newUsuario = await Usuario.create({ 
        nombreUsuario, 
        email, 
        contrasena: hashedPassword, 
        tipoUsuario, 
        fotoDePerfil,
        activo: true 
      });

      res.status(201).json({
        success: true,
        msg: "Usuario creado",
        contenido: newUsuario,
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

  updateUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const { nombreUsuario, email, contrasena, nombreReferido, fotoDePerfil, banco, cvu, alias, descripcion, fraseDescriptiva, educacion } = req.body;

      const camposAActualizar = {};

      if (nombreUsuario) {camposAActualizar.nombreUsuario = nombreUsuario;}
      if (email) {camposAActualizar.email = email;}
      if (contrasena) {camposAActualizar.contrasena = contrasena;}
      if (fotoDePerfil) {camposAActualizar.fotoDePerfil = fotoDePerfil;}
// Encriptar datos bancarios
      if (nombreReferido) camposAActualizar.nombreReferido = encrypt(nombreReferido);
      if (banco) camposAActualizar.banco = encrypt(banco);
      if (cvu) camposAActualizar.cvu = encrypt(cvu);
      if (alias) camposAActualizar.alias = encrypt(alias);
      if (descripcion) camposAActualizar.descripcion = descripcion;
      if (fraseDescriptiva) camposAActualizar.fraseDescriptiva = fraseDescriptiva;
      if (educacion) camposAActualizar.educacion = educacion;

      await Usuario.update(camposAActualizar, { where: { idUsuario } });

      const usuarioActualizado = await Usuario.findByPk(idUsuario);

      res.status(200).json({
        success: true,
        msg: "Usuario actualizado correctamente",
        atributo: usuarioActualizado,
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

 getUsuarioById: async (req, res) => {
    try {
      const { idUsuario } = req.params;

      const usuario = await Usuario.findByPk(idUsuario);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          msg: "Usuario no encontrado",
        });
      }

      // Desencriptar datos bancarios antes de enviar
      const usuarioDesencriptado = {
        ...usuario.toJSON(),
        nombreReferido: usuario.nombreReferido ? decrypt(usuario.nombreReferido) : null,
        banco: usuario.banco ? decrypt(usuario.banco) : null,
        cvu: usuario.cvu ? decrypt(usuario.cvu) : null,
        alias: usuario.alias ? decrypt(usuario.alias) : null,
      };

      res.status(200).json({
        success: true,
        msg: "usuario encontrado",
        informacion: usuarioDesencriptado,
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

   deleteUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;

      // Verificar que el usuario existe
      const usuario = await Usuario.findByPk(idUsuario);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          msg: "Usuario no encontrado",
        });
      }

      // Verificar que no sea un administrador
      if (usuario.tipoUsuario === 'administrador') {
        return res.status(403).json({
          success: false,
          msg: "No se puede eliminar un administrador",
        });
      }

      // Verificar si ya está inactivo
      if (!usuario.activo) {
        return res.status(400).json({
          success: false,
          msg: "El usuario ya está inactivo",
        });
      }

      // Baja lógica: cambiar activo a false
      await Usuario.update({ activo: false }, { where: { idUsuario } });

      res.status(200).json({
        success: true,
        msg: "Usuario desactivado correctamente",
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

 reactivateUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;

      const usuario = await Usuario.findByPk(idUsuario);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          msg: "Usuario no encontrado",
        });
      }

      if (usuario.activo) {
        return res.status(400).json({
          success: false,
          msg: "El usuario ya está activo",
        });
      }

      await Usuario.update({ activo: true }, { where: { idUsuario } });

      res.status(200).json({
        success: true,
        msg: "Usuario reactivado correctamente",
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


  //Foto de perfil con cloudinary

  updateFotoDePerfil: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const fotoDePerfil = req.file?.path; // URL pública de Cloudinary
      
      //esto habria que hacerlo en el validator
      if (!fotoDePerfil) {
        return res.status(400).json({ success: false, msg: "No se proporcionó una imagen válida." });
      }

      const usuario = await Usuario.findByPk(idUsuario);

      //esto habria que hacerlo en el validator
      if (!usuario) {
        return res.status(404).json({ success: false, msg: "Usuario no encontrado." });
      }

      // Actualizar la foto de perfil en la base de datos
      usuario.fotoDePerfil = fotoDePerfil;
      await usuario.save();

      res.json({ success: true, msg: "Foto de perfil actualizada.", fotoDePerfil });
    } catch (error) {
      console.error("Error al actualizar la foto de perfil:", error);
      res.status(500).json({ success: false, msg: "Error interno del servidor." });
    }
  },


  
};
