import { beforeAll, afterAll, beforeEach, jest } from '@jest/globals';
import dotenv from 'dotenv';
import { sequelize } from '../database/sequelize.js';

dotenv.config();

let originalConsoleLog;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
  
  console.log('=== CONFIGURACIÓN DE PRUEBAS ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('JWT_SECRET está definido:', !!process.env.JWT_SECRET);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_NAME:', process.env.DB_NAME);
  
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada para tests');
  } catch (error) {
    console.error('Error al sincronizar BD:', error);
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
    console.log('Conexión a BD cerrada');
  } catch (error) {
    console.error('Error al cerrar BD:', error);
  }
  
  if (originalConsoleLog && console.log !== originalConsoleLog) {
    console.log = originalConsoleLog;
  }
});

beforeEach(async () => {
});