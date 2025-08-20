import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";

export const usuarioController = {
  getAllUsuarios: async (req, res) => {
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
      console.log(error.message);
      res.status(500).json({
        success: false,
        msg: "Error al obtener los usuarios",
      });
    }
  },

  createUsuario: async (req, res) => {
    try {
      const { nombreUsuario, email, contrasena, tipoUsuario } = req.body;
      if (!nombreUsuario || !email || !contrasena || !tipoUsuario) {
        return res.status(400).json({
          success: false,
          msg: "Faltan datos para crear el usuario",
        });
      }

      const usuarioExistente = await Usuario.findOne({
        where: {
          [Op.or]: [{ email: email }, { nombreUsuario: nombreUsuario }],
        },
      });

      if (usuarioExistente) {
        if (usuarioExistente.email === email) {
          return res.status(400).json({
            success: false,
            msg: "El email ya está en uso",
          });
        } else {
          return res.status(400).json({
            success: false,
            msg: "El nombre de usuario ya está en uso",
          });
        }
      }
      const newUsuario = await Usuario.create({
        nombreUsuario: nombreUsuario,
        email: email,
        contrasena: contrasena,
        tipoUsuario: req.body.tipoUsuario, 
      });

      res.status(201).json({
        success: true,
        msg: "Usuario creado",
        contenido: newUsuario,
      });
      console.log(newUsuario); // Para ver el usuario creado en la consola
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        msg: "Error al crear el usuario",
      });
    }
  },

  updateUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const { nombreUsuario, email, contrasena } = req.body;

      const usuario = await Usuario.findByPk(idUsuario);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          msg: "usuario no encontrado",
        });
      }

      if (!nombreUsuario && !email && !contrasena) {
        return res.status(404).json({
          success: false,
          msg: "No hay informacion para actualizar",
        });
      }

      const usuarioExistente = await Usuario.findOne({
        where: {
          [Op.or]: [{ email: email }, { nombreUsuario: nombreUsuario }],
          idUsuario: { [Op.ne]: idUsuario }, // Para no encontrarse a sí mismo
        },
      });

      if (usuarioExistente) {
        if (usuarioExistente.email === email) {
          return res.status(400).json({
            success: false,
            msg: "El email ya está en uso",
          });
        } else {
          return res.status(400).json({
            success: false,
            msg: "El nombre de usuario ya está en uso",
          });
        }
      }

      const camposAActualizar = {};

      if (nombreUsuario) {
        camposAActualizar.nombreUsuario = nombreUsuario;
      }

      if (email) {
        camposAActualizar.email = email;
      }

      if (contrasena) {
        camposAActualizar.contrasena = contrasena;
      }

      await Usuario.update(camposAActualizar, { where: { idUsuario } });

      res.status(200).json({
        success: true,
        msg: "Usuario actualizado correctamente",
        atributo: camposAActualizar,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getUsuarioById: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const usuario = await Usuario.findByPk(idUsuario);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          msg: "usuario no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "usuario encontrado",
        informacion: usuario,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;

      const deleted = await Usuario.destroy({
        where: { idUsuario: idUsuario },
      });

      if (deleted === 0) {
        return res.status(404).json({
          success: false,
          msg: "usuario no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "usuario eliminado correctamente",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        msg: "Error al eliminar el curso",
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
      res.status(500).json({
        success: false,
        msg: "Error en el login",
      });
  }

}
};
