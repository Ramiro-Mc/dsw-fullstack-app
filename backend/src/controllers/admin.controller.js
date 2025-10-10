import { Curso } from '../models/Curso.js';
import { Usuario } from '../models/Usuario.js';

export const adminController = {
  // Obtener estadísticas del dashboard
  getStats: async (req, res) => {
    try {
      // Contar cursos totales
      const totalCursos = await Curso.count();
      
      // Contar usuarios totales
      const totalUsuarios = await Usuario.count();
      
      // Contar Creadores totales
      // const totalCreadores = await Usuario.count({
      //   where: { rol: 'creador' }
      // });

      const totalCreadores = 42; 
      
      
      const ventasTotales = 6969;

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
  }
};