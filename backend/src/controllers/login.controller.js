import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = {
  login: async (req, res) => {
    try {
      const { email, contrasena } = req.body;

      if (!email || !contrasena) {
        return res.status(400).json({
          success: false,
          msg: "Email y contraseña son requeridos"
        });
      }

      // Buscar usuario por email
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(401).json({
          success: false,
          msg: "Credenciales inválidas"
        });
      }

      // Verificar si el usuario está activo
      if (!usuario.activo) {
        return res.status(403).json({
          success: false,
          msg: "Tu cuenta ha sido desactivada. Contacta al administrador."
        });
      }

      // Verificar contraseña
      const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          msg: "Contraseña incorrecta"
        });
      }

      const token = jwt.sign(
        { 
          id: usuario.idUsuario,
          email: usuario.email,
          tipoUsuario: usuario.tipoUsuario
        },
        process.env.JWT_SECRET,      
        { expiresIn: "7d" }        
      );

      res.status(200).json({
        success: true,
        msg: "Login exitoso",
        usuario: {
          id: usuario.idUsuario,
          nombreUsuario: usuario.nombreUsuario,
          email: usuario.email,
          tipoUsuario: usuario.tipoUsuario
        },
        token: token  
      });

    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({
        success: false,
        msg: "Error interno del servidor"
      });
    }
  }
};