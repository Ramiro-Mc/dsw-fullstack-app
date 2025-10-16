import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import { TipoCurso } from '../../models/TipoCurso.js';

describe('TipoCurso CRUD', () => {
  let createdTipoId;

  beforeEach(async () => {
    await TipoCurso.destroy({ where: {}, force: true });
  });

  describe('POST /tipoCursos', () => {
    it('debería crear un nuevo tipo de curso', async () => {
      const nuevoTipo = {
        nombreTipo: 'Programación Test',
        descripcion: 'Cursos de programación para testing',
        icono: 'code-icon'
      };

      const response = await request(app)
        .post('/tipoCursos')
        .send(nuevoTipo)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Nuevo Tipo de Curso Creado");
      expect(response.body.contenido.nombreTipo).toBe(nuevoTipo.nombreTipo);
      expect(response.body.contenido.descripcion).toBe(nuevoTipo.descripcion);
      expect(response.body.contenido.icono).toBe(nuevoTipo.icono);
      createdTipoId = response.body.contenido.idTipo;
    });

    it('debería fallar si falta nombreTipo', async () => {
      const tipoIncompleto = {
        descripcion: 'Sin nombre',
        icono: 'icon'
      };

      const response = await request(app)
        .post('/tipoCursos')
        .send(tipoIncompleto);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      // Verificar que hay al menos un error de nombreTipo
      expect(response.body.errors.some(error => error.path === 'nombreTipo')).toBe(true);
    });

    it('debería fallar si falta descripcion', async () => {
      const tipoIncompleto = {
        nombreTipo: 'Con nombre',
        icono: 'icon'
      };

      const response = await request(app)
        .post('/tipoCursos')
        .send(tipoIncompleto);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      // Verificar que hay al menos un error de descripcion
      expect(response.body.errors.some(error => error.path === 'descripcion')).toBe(true);
    });

    it('debería fallar si falta icono', async () => {
      const tipoIncompleto = {
        nombreTipo: 'Con nombre',
        descripcion: 'Con descripción'
      };

      const response = await request(app)
        .post('/tipoCursos')
        .send(tipoIncompleto);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      // Verificar que hay al menos un error de icono
      expect(response.body.errors.some(error => error.path === 'icono')).toBe(true);
    });

    it('debería fallar si el nombreTipo ya existe', async () => {
      // Crear un tipo primero
      await TipoCurso.create({
        nombreTipo: 'Tipo Existente',
        descripcion: 'Ya existe',
        icono: 'existing-icon'
      });

      const tipoDuplicado = {
        nombreTipo: 'Tipo Existente', // Mismo nombre
        descripcion: 'Intento duplicado',
        icono: 'duplicate-icon'
      };

      const response = await request(app)
        .post('/tipoCursos')
        .send(tipoDuplicado);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.msg && error.msg.includes("ya está en uso"))).toBe(true);
    });
  });

  describe('GET /tipoCursos', () => {
    it('debería obtener todos los tipos de curso', async () => {
      await TipoCurso.create({
        nombreTipo: 'Test Tipo Lista',
        descripcion: 'Test descripción',
        icono: 'test-icon'
      });

      const response = await request(app)
        .get('/tipoCursos')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Se encontraron los tipos de curso");
      expect(response.body.contenido).toHaveLength(1);
      expect(response.body.contenido[0].nombreTipo).toBe('Test Tipo Lista');
    });

    it('debería retornar 404 si no hay tipos de curso', async () => {
      const response = await request(app)
        .get('/tipoCursos')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.msg).toBe("No hay tipos de curso");
    });
  });

  describe('GET /tipoCursos/:idTipo', () => {
    it('debería obtener un tipo por ID', async () => {
      const tipo = await TipoCurso.create({
        nombreTipo: 'Test Tipo Get',
        descripcion: 'Test descripción',
        icono: 'test-icon'
      });

      const response = await request(app)
        .get(`/tipoCursos/${tipo.idTipo}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Tipo curso encontrado");
      expect(response.body.informacion.idTipo).toBe(tipo.idTipo);
      expect(response.body.informacion.nombreTipo).toBe('Test Tipo Get');
    });

    it('debería fallar con ID inexistente', async () => {
      const response = await request(app)
        .get('/tipoCursos/999')
        .expect(403);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.msg && error.msg.includes("no encontrado"))).toBe(true);
    });
  });

  describe('PUT /tipoCursos/:idTipo', () => {
    it('debería actualizar un tipo de curso', async () => {
      const tipo = await TipoCurso.create({
        nombreTipo: 'Tipo Original',
        descripcion: 'Descripción original',
        icono: 'original-icon'
      });

      const datosActualizados = {
        nombreTipo: 'Tipo Actualizado',
        descripcion: 'Descripción actualizada'
      };

      const response = await request(app)
        .put(`/tipoCursos/${tipo.idTipo}`)
        .send(datosActualizados)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Tipo curso actualizado correctamente");
      expect(response.body.atributo.nombreTipo).toBe(datosActualizados.nombreTipo);
      expect(response.body.atributo.descripcion).toBe(datosActualizados.descripcion);
    });

    it('debería fallar con ID inexistente', async () => {
      const response = await request(app)
        .put('/tipoCursos/999')
        .send({
          nombreTipo: 'No existe',
          descripcion: 'No se puede actualizar'
        })
        .expect(403);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.msg && error.msg.includes("no encontrado"))).toBe(true);
    });

    it('debería actualizar solo campos enviados', async () => {
      const tipo = await TipoCurso.create({
        nombreTipo: 'Tipo Parcial',
        descripcion: 'Descripción original',
        icono: 'original-icon'
      });

      const response = await request(app)
        .put(`/tipoCursos/${tipo.idTipo}`)
        .send({ descripcion: 'Solo descripción actualizada' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.atributo.nombreTipo).toBe('Tipo Parcial'); // No cambió
      expect(response.body.atributo.descripcion).toBe('Solo descripción actualizada'); // Cambió
      expect(response.body.atributo.icono).toBe('original-icon'); // No cambió
    });
  });

  describe('DELETE /tipoCursos/:idTipo', () => {
    it('debería eliminar un tipo de curso', async () => {
      const tipo = await TipoCurso.create({
        nombreTipo: 'Tipo a eliminar',
        descripcion: 'Se eliminará',
        icono: 'delete-icon'
      });

      const response = await request(app)
        .delete(`/tipoCursos/${tipo.idTipo}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("TipoCurso eliminado correctamente");

      // Verificar que se eliminó de la BD
      const tipoEliminado = await TipoCurso.findByPk(tipo.idTipo);
      expect(tipoEliminado).toBeNull();
    });

    it('debería fallar con ID inexistente', async () => {
      const response = await request(app)
        .delete('/tipoCursos/999')
        .expect(403);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors.some(error => error.msg && error.msg.includes("no encontrado"))).toBe(true);
    });
  });
});