import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";

export const usuarioController = {
  getAllUsuarios: async (req , res) => {
    try {
      const allUsuarios = await Usuario.findAll();

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
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  createUsuario: async (req, res) => {
    try {
      const { nombreUsuario, email, contrasena, tipoUsuario } = req.body;

      const newUsuario = await Usuario.create({ nombreUsuario, email, contrasena, tipoUsuario });

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
      const { nombreUsuario, email, contrasena } = req.body;

      const camposAActualizar = {};

      if (nombreUsuario) {camposAActualizar.nombreUsuario = nombreUsuario;}
      if (email) {camposAActualizar.email = email;}
      if (contrasena) {camposAActualizar.contrasena = contrasena;}

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

      await Usuario.destroy({where: { idUsuario: idUsuario }});

      res.status(200).json({
        success: true,
        msg: "usuario eliminado correctamente",
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

      // Si usas JWT, aquí lo generas y lo envías
      res.status(200).json({
        success: true,
        msg: "Login exitoso",
        usuario: usuario,
        // token: "aquí va el token si usas JWT"
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
