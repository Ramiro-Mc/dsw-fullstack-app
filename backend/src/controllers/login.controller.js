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

        // Verificar contraseña (INSTALE BCRYPT QUE ENCRIPTA LA CONTRASEÑA)
       const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          msg: "Contraseña incorrecta"
        });
      }



      res.status(200).json({
        success: true,
        msg: "Login exitoso",
        usuario: {
          id: usuario.idUsuario,
          nombreUsuario: usuario.nombreUsuario,
          email: usuario.email,
          tipoUsuario: usuario.tipoUsuario
        }
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