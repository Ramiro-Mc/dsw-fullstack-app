import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import { Curso } from '../../models/Curso.js';
import { TipoCurso } from '../../models/TipoCurso.js';
import { Usuario } from '../../models/Usuario.js';

describe('Curso CRUD', () => {
  let tipoId;
  let profesorId;

  beforeEach(async () => {
    // Limpiar en orden por foreign keys
    await Curso.destroy({ where: {}, force: true });
    await TipoCurso.destroy({ where: {}, force: true });
    await Usuario.destroy({ where: {}, force: true });

    // Crear TipoCurso
    const tipo = await TipoCurso.create({
      nombreTipo: 'Programación Test',
      descripcion: 'Tipo para testing',
      icono: 'test-icon'
    });
    tipoId = tipo.idTipo;

    // Crear Usuario profesor - TODOS los campos obligatorios
    const profesor = await Usuario.create({
      nombreUsuario: 'Profesor Test',
      email: 'profesor@test.com',
      contrasena: 'password123',
      tipoUsuario: 'profesor',
      nombreReferido: 'Test Referido',
      fotoDePerfil: 'foto.jpg',
      banco: 'Banco Test',
      cvu: 1234567890123456, // ← CAMBIAR: número más largo para CVU
      alias: 'test.alias.mp'   // ← CAMBIAR: alias más realista
    });
    profesorId = profesor.idUsuario;
  });

  describe('POST /api/cursos', () => {
    it('debería crear un nuevo curso', async () => {
      const nuevoCurso = {
        titulo: 'JavaScript Básico Test',
        descripcion: 'Curso de JavaScript para testing',
        precio: 99.99,
        idTipo: tipoId,
        idProfesor: profesorId,
        imagen: 'curso-imagen.jpg'
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(nuevoCurso)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Curso creado");
      expect(response.body.contenido.titulo).toBe(nuevoCurso.titulo);
      expect(response.body.contenido.precio).toBe(nuevoCurso.precio);
      expect(response.body.contenido.idProfesor).toBe(profesorId);
    });

    it('debería fallar si falta titulo', async () => {
      const cursoIncompleto = {
        descripcion: 'Sin título',
        precio: 50,
        idTipo: tipoId,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(cursoIncompleto);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.path === 'titulo')).toBe(true);
    });

    it('debería fallar si falta descripcion', async () => {
      const cursoIncompleto = {
        titulo: 'Con título',
        precio: 50,
        idTipo: tipoId,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(cursoIncompleto);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.path === 'descripcion')).toBe(true);
    });

    it('debería fallar si falta precio', async () => {
      const cursoIncompleto = {
        titulo: 'Con título',
        descripcion: 'Con descripción',
        idTipo: tipoId,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(cursoIncompleto);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.path === 'precio')).toBe(true);
    });

    it('debería fallar si falta idTipo', async () => {
      const cursoIncompleto = {
        titulo: 'Con título',
        descripcion: 'Con descripción',
        precio: 50,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(cursoIncompleto);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.path === 'idTipo')).toBe(true);
    });

    it('debería fallar si el título ya existe', async () => {
      // Crear curso primero
      await Curso.create({
        titulo: 'Título Existente',
        descripcion: 'Ya existe',
        precio: 50,
        idTipo: tipoId,
        idProfesor: profesorId
      });

      const cursoDuplicado = {
        titulo: 'Título Existente',
        descripcion: 'Intento duplicado',
        precio: 75,
        idTipo: tipoId,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(cursoDuplicado);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.some(error => error.msg && error.msg.includes("ya está en uso"))).toBe(true);
    });
  });

  describe('GET /api/cursos', () => {
    it('debería obtener todos los cursos', async () => {
      await Curso.create({
        titulo: 'Test Curso Lista',
        descripcion: 'Test descripción',
        precio: 99.99,
        idTipo: tipoId,
        idProfesor: profesorId
      });

      const response = await request(app)
        .get('/api/cursos')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Cursos enviados");
      expect(response.body.contenido).toHaveLength(1);
      expect(response.body.contenido[0].titulo).toBe('Test Curso Lista');
    });

    it('debería filtrar cursos por tipo', async () => {
      await Curso.create({
        titulo: 'Curso del Tipo',
        descripcion: 'Descripción',
        precio: 50,
        idTipo: tipoId,
        idProfesor: profesorId
      });

      const response = await request(app)
        .get(`/api/cursos?idTipo=${tipoId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.contenido).toHaveLength(1);
      expect(response.body.contenido[0].idTipo).toBe(tipoId);
    });

    it('debería retornar 404 si no hay cursos', async () => {
      const response = await request(app)
        .get('/api/cursos')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.msg).toBe("No hay cursos");
    });
  });

  describe('GET /api/cursos/:idCurso', () => {
    it('debería obtener un curso por ID', async () => {
      const curso = await Curso.create({
        titulo: 'Test Curso Get',
        descripcion: 'Test descripción',
        precio: 99.99,
        idTipo: tipoId,
        idProfesor: profesorId
      });

      const response = await request(app)
        .get(`/api/cursos/${curso.idCurso}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Curso encontrado");
      expect(response.body.informacion.idCurso).toBe(curso.idCurso);
      expect(response.body.informacion.titulo).toBe('Test Curso Get');
    });

    it('debería fallar con ID inexistente', async () => {
      const response = await request(app)
        .get('/api/cursos/999')
        .expect(403);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.msg && error.msg.includes("no encontrado"))).toBe(true);
    });
  });

  describe('PUT /api/cursos/:idCurso', () => {
    it('debería actualizar un curso', async () => {
      const curso = await Curso.create({
        titulo: 'Título Original',
        descripcion: 'Descripción original',
        precio: 50,
        idTipo: tipoId,
        idProfesor: profesorId
      });

      const datosActualizados = {
        titulo: 'Título Actualizado',
        precio: 75
      };

      const response = await request(app)
        .put(`/api/cursos/${curso.idCurso}`)
        .send(datosActualizados)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Curso actualizado correctamente");
      expect(response.body.contenido.titulo).toBe(datosActualizados.titulo);
      expect(response.body.contenido.precio).toBe(datosActualizados.precio);
    });

    it('debería fallar con ID inexistente', async () => {
      const response = await request(app)
        .put('/api/cursos/999')
        .send({
          titulo: 'No existe',
          descripcion: 'No se puede actualizar'
        })
        .expect(403);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.msg && error.msg.includes("no encontrado"))).toBe(true);
    });
  });
});