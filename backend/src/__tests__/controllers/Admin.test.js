import { describe, it, expect, beforeEach, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import { Usuario } from '../../models/Usuario.js';
import { Curso } from '../../models/Curso.js';
import { TipoCurso } from '../../models/TipoCurso.js';
import { sequelize } from '../../database/sequelize.js';

describe('Admin Controller - Tests', () => {
  let tipoId;
  let profesorId;
  let estudianteId;

  beforeAll(async () => {
    // Limpiar tablas
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.query('DELETE FROM AlumnosCursos');
    await sequelize.query('DELETE FROM Cursos');
    await sequelize.query('DELETE FROM Usuarios');
    await sequelize.query('DELETE FROM TipoCursos');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Crear datos de prueba
    const tipo = await TipoCurso.create({
      nombreTipo: 'Test Admin',
      descripcion: 'Test',
      icono: 'test'
    });
    tipoId = tipo.idTipo;

    const profesor = await Usuario.create({
      nombreUsuario: 'Profesor Test',
      email: 'profesor@test.com',
      contrasena: 'pass123',
      tipoUsuario: 'creador'
    });
    profesorId = profesor.idUsuario;

    const estudiante = await Usuario.create({
      nombreUsuario: 'Estudiante Test',
      email: 'estudiante@test.com',
      contrasena: 'pass456',
      tipoUsuario: 'estudiante'
    });
    estudianteId = estudiante.idUsuario;

    await Curso.create({
      titulo: 'Curso Test',
      descripcion: 'Test',
      precio: 100,
      idTipo: tipoId,
      idProfesor: profesorId,
      estado: 'aprobado'
    });
  });

  afterAll(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.query('DELETE FROM AlumnosCursos');
    await sequelize.query('DELETE FROM Cursos');
    await sequelize.query('DELETE FROM Usuarios');
    await sequelize.query('DELETE FROM TipoCursos');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await sequelize.close();
  });

  describe('GET /api/admin/stats', () => {
    it('debería obtener estadísticas', async () => {
      const response = await request(app)
        .get('/api/admin/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.stats).toBeDefined();
    });
  });

  describe('GET /api/admin/usuarios', () => {
    it('debería listar usuarios', async () => {
      const response = await request(app)
        .get('/api/admin/usuarios')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.usuarios)).toBe(true);
    });
  });

  describe('DELETE /api/admin/usuarios/:id', () => {
    it('debería eliminar un estudiante', async () => {
      const response = await request(app)
        .delete(`/api/admin/usuarios/${estudianteId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('no debería eliminar un admin', async () => {
      const admin = await Usuario.create({
        nombreUsuario: 'Admin',
        email: 'admin@test.com',
        contrasena: 'admin',
        tipoUsuario: 'administrador'
      });

      const response = await request(app)
        .delete(`/api/admin/usuarios/${admin.idUsuario}`)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});