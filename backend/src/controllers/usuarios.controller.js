import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Curso } from "../models/Curso.js";

export const usuarioController = {

  getAllUsuarios: async (req , res) => {
  try {
    const where = {};

    if (req.query.tipoUsuario) {
      where.tipoUsuario = req.query.tipoUsuario;
    }

    // Si el frontend pide includeCursos, incluye los cursos creados por el usuario
    const include = [];
    if (req.query.includeCursos === "true") {
      include.push({
        model: Curso,
        as: "cursos", // Usa el alias que pusiste en la asociación en allModels.js
      });
    }

    const allUsuarios = await Usuario.findAll({ where, include });

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
      const newUsuario = await Usuario.create({ nombreUsuario, email, contrasena: hashedPassword, tipoUsuario, fotoDePerfil });

      res.status(201).json({
        success: true,
        msg: "Usuario creado",
        contenido: newUsuario,
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

  updateUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const { nombreUsuario, email, contrasena, nombreReferido, fotoDePerfil, banco, cvu, alias } = req.body;

      const camposAActualizar = {};

      if (nombreUsuario) {camposAActualizar.nombreUsuario = nombreUsuario;}
      if (email) {camposAActualizar.email = email;}
      if (contrasena) {camposAActualizar.contrasena = contrasena;}
      if (fotoDePerfil) {camposAActualizar.fotoDePerfil = fotoDePerfil;}
      if (nombreReferido) camposAActualizar.nombreReferido = nombreReferido;
      if (banco) camposAActualizar.banco = banco;
      if (cvu) camposAActualizar.cvu = cvu;
      if (alias) camposAActualizar.alias = alias;

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

      res.status(200).json({
        success: true,
        msg: "usuario encontrado",
        informacion: usuario,
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

    // Eliminar físicamente el usuario
    await Usuario.destroy({ where: { idUsuario: idUsuario } });

    res.status(200).json({
      success: true,
      msg: "Usuario eliminado correctamente",
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


  //Para conectar el frontend con el backend
  loginUsuario: async (req, res) => {
    try {
      const { email, contrasena } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario || usuario.contrasena !== contrasena) {
        return res.status(401).json({
          success: false,
          msg: "Credenciales inválidas",
        });
      }

      // Generar un token JWT al iniciar sesión
      const token = jwt.sign({ id: usuario.idUsuario }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).json({
        success: true,
        msg: "Login exitoso",
        usuario: usuario,
        token: token,
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
