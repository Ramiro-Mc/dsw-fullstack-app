import { Curso } from '../models/Curso.js';
import { Usuario } from '../models/Usuario.js';
import { sequelize } from '../database/sequelize.js';

export const adminController = {
  // Obtener estadísticas del dashboard
  getStats: async (req, res) => {
    try {
      const totalCursos = await Curso.count();
      const totalUsuarios = await Usuario.count();
      
      const result = await sequelize.query(`
        SELECT COUNT(DISTINCT idProfesor) as totalCreadores 
        FROM Cursos 
        WHERE idProfesor IS NOT NULL
      `, {
        type: sequelize.QueryTypes.SELECT
      });

      const totalCreadores = result[0].totalCreadores;
      const ventasTotales = "Proximamente";

      res.json({
        success: true,
        stats: {
          totalCursos,
          totalUsuarios,
          totalCreadores,
          ventasTotales
        }
      });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas'
      });
    }
  },

  // AGREGAR ESTA FUNCIÓN:
  getUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['idUsuario', 'nombreUsuario', 'email', 'tipoUsuario', 'createdAt'],
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        usuarios
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener usuarios'
      });
    }
  },

  // AGREGAR ESTA FUNCIÓN:
  eliminarUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      
      const usuario = await Usuario.findByPk(idUsuario);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      if (usuario.tipoUsuario === 'administrador') {
        return res.status(400).json({
          success: false,
          message: 'No se puede eliminar un administrador'
        });
      }

      await usuario.destroy();

      res.json({
        success: true,
        message: 'Usuario eliminado correctamente'
      });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar usuario'
      });
    }
  }
};