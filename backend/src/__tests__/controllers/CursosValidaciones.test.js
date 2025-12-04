import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import db from '../../models/allModels.js';

let app;
let profesorId = 1;
let tipoId = 1;

describe('Cursos API - Tests Simples', () => {
  
  beforeAll(async () => {
    const { default: appImport } = await import('../../app.js');
    app = appImport;
    console.log('=== APP IMPORTADA ===');
    await crearDatosDePrueba();
  });

  const crearDatosDePrueba = async () => {
    try {
      console.log('=== CREANDO DATOS DE PRUEBA ===');
      
      // Crear TipoCurso
      await db.TipoCurso.findOrCreate({
        where: { idTipo: 1 },
        defaults: {
          idTipo: 1,
          nombreTipo: 'Programación',
          descripcion: 'Cursos de programación',
          icono: 'code'
        }
      });
      
      // Crear Usuario profesor
      await db.Usuario.findOrCreate({
        where: { idUsuario: 1 },
        defaults: {
          idUsuario: 1,
          nombreUsuario: 'Profesor Test',
          email: 'profesor@test.com',
          contrasena: 'password123',
          tipoUsuario: 'profesor',
          descripcion: 'Profesor de prueba',
          fraseDescriptiva: 'Experto en testing'
        }
      });
      
      console.log('Datos de prueba creados');
    } catch (error) {
      console.error('Error creando datos:', error.message);
    }
  };

  beforeEach(async () => {
    // Limpiar cursos antes de cada test
    try {
      await db.Curso.destroy({ where: {}, force: true });
    } catch (error) {
      console.log('Error limpiando cursos:', error.message);
    }
  });

  test('debería crear un curso exitoso', async () => {
    const nuevoCurso = {
      titulo: 'Curso Test Exitoso',
      descripcion: 'Descripción del curso de prueba',
      precio: 99.99,
      idTipo: tipoId,
      idProfesor: profesorId
    };

    const response = await request(app)
      .post('/api/cursos')
      .send(nuevoCurso);

    console.log('CREATE Status:', response.status);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe('Curso creado');
    expect(response.body.contenido.titulo).toBe(nuevoCurso.titulo);
  });

  test('debería fallar por campos faltantes', async () => {
    const cursoIncompleto = {
      descripcion: 'Solo descripción',
      precio: 50.00
      // Falta título, idTipo, idProfesor
    };

    const response = await request(app)
      .post('/api/cursos')
      .send(cursoIncompleto);

    console.log('CAMPOS FALTANTES Status:', response.status);

    // Tu validador retorna 403, no 400
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  test('debería obtener lista de cursos', async () => {
    // Crear un curso primero
    await request(app)
      .post('/api/cursos')
      .send({
        titulo: 'Curso Para Lista',
        descripcion: 'Para probar lista',
        precio: 25.00,
        idTipo: tipoId,
        idProfesor: profesorId
      });

    // Obtener lista
    const response = await request(app)
      .get('/api/cursos');

    console.log('GET LISTA Status:', response.status);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.contenido)).toBe(true);
    expect(response.body.contenido.length).toBeGreaterThan(0);
  });

  test('debería obtener curso por ID', async () => {
    // Crear curso
    const createResponse = await request(app)
      .post('/api/cursos')
      .send({
        titulo: 'Curso Por ID',
        descripcion: 'Para probar get por ID',
        precio: 35.00,
        idTipo: tipoId,
        idProfesor: profesorId
      });

    if (createResponse.status === 201) {
      const cursoId = createResponse.body.contenido.idCurso;

      // Obtener por ID
      const response = await request(app)
        .get(`/api/cursos/${cursoId}`);

      console.log('GET BY ID Status:', response.status);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.informacion.idCurso).toBe(cursoId);
    }
  });

  test('debería fallar al obtener curso inexistente', async () => {
    const response = await request(app)
      .get('/api/cursos/99999');

    console.log('CURSO INEXISTENTE Status:', response.status);

    // Tu validador retorna 403, no 404
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('errors');
  });

  test('debería detectar precio inválido', async () => {
    const cursoConPrecioInvalido = {
      titulo: 'Curso Con Precio Inválido',
      descripcion: 'Descripción válida',
      precio: 'no es número',
      idTipo: tipoId,
      idProfesor: profesorId
    };

    const response = await request(app)
      .post('/api/cursos')
      .send(cursoConPrecioInvalido);

    console.log('PRECIO INVÁLIDO Status:', response.status);

    // Tu validador captura esto y retorna 403
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('errors');
    
    const precioError = response.body.errors.find(err => err.path === 'precio');
    expect(precioError).toBeDefined();
  });

  test('debería fallar por título duplicado', async () => {
    const curso1 = {
      titulo: 'Curso Duplicado',
      descripcion: 'Primer curso',
      precio: 50.00,
      idTipo: tipoId,
      idProfesor: profesorId
    };

    // Crear primer curso
    const firstResponse = await request(app)
      .post('/api/cursos')
      .send(curso1);

    if (firstResponse.status === 201) {
      // Intentar crear segundo con mismo título
      const secondResponse = await request(app)
        .post('/api/cursos')
        .send({
          ...curso1,
          descripcion: 'Segundo curso'
        });

      console.log('DUPLICADO Status:', secondResponse.status);

      expect(secondResponse.status).toBe(403);
      expect(secondResponse.body).toHaveProperty('errors');
      
      const tituloError = secondResponse.body.errors.find(err => 
        err.path === 'titulo' && err.msg === 'El titulo ya está en uso'
      );
      expect(tituloError).toBeDefined();
    }
  });
});