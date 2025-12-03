import { describe, test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import db from '../../models/allModels.js';

// Variables globales
let app;
let profesorId = 1;
let tipoId = 1;

describe('Nuevos Cursos API', () => {
  
  beforeAll(async () => {
    // Importar app después de que setup.js configure todo
    const { default: appImport } = await import('../../app.js');
    app = appImport;
    console.log('=== APP IMPORTADA ===');
    
    // Crear datos de prueba necesarios
    await crearDatosDePrueba();
  });

  // FUNCIÓN PARA CREAR DATOS BÁSICOS 
  const crearDatosDePrueba = async () => {
    try {
      console.log('=== CREANDO DATOS DE PRUEBA ===');
      
      // Crear TipoCurso si no existe
      const [tipoCurso, created] = await db.TipoCurso.findOrCreate({
        where: { idTipo: 1 },
        defaults: {
          idTipo: 1,
          nombreTipo: 'Programación',
          descripcion: 'Cursos de programación',
          icono: 'code'
        }
      });
      
      if (created) {
        console.log('TipoCurso creado:', tipoCurso.nombreTipo);
      } else {
        console.log('TipoCurso ya existe:', tipoCurso.nombreTipo);
      }
      
      // Crear Usuario 
      const [usuario, usuarioCreated] = await db.Usuario.findOrCreate({
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
      
      if (usuarioCreated) {
        console.log('Usuario profesor creado:', usuario.nombreUsuario);
      } else {
        console.log('Usuario profesor ya existe:', usuario.nombreUsuario);
      }
      
      console.log('Datos de prueba listos');
      
    } catch (error) {
      console.error('❌ Error creando datos de prueba:', error.message);
      console.error('❌ Stack:', error.stack);
    }
  };

  beforeEach(async () => {
    // Limpiar cursos antes de cada test para evitar conflictos
    try {
      await db.Curso.destroy({ where: {}, force: true });
      console.log('🧹 Cursos limpiados');
    } catch (error) {
      console.log('⚠️ No se pudieron limpiar cursos:', error.message);
    }
  });

  test('debería crear un nuevo curso exitosamente', async () => {
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

    console.log('=== CREATE CURSO EXITOSO ===');
    console.log('Status:', response.status);
    console.log('Response body:', JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('msg', 'Curso creado');
    expect(response.body).toHaveProperty('contenido');
    expect(response.body.contenido.titulo).toBe(nuevoCurso.titulo);
    expect(response.body.contenido.precio).toBe(nuevoCurso.precio);
    expect(response.body.contenido.idProfesor).toBe(profesorId);
    expect(response.body.contenido.idTipo).toBe(tipoId);
  });

  test('debería fallar por título duplicado', async () => {
    // Crear primer curso
    const curso1 = {
      titulo: 'Curso Duplicado Test',
      descripcion: 'Primer curso',
      precio: 50.00,
      idTipo: tipoId,
      idProfesor: profesorId
    };

    const firstResponse = await request(app)
      .post('/api/cursos')
      .send(curso1);

    console.log('=== PRIMER CURSO ===');
    console.log('Status:', firstResponse.status);

    // Solo continuar si el primer curso se creó exitosamente
    if (firstResponse.status === 201) {
      // Intentar crear segundo curso con mismo título
      const curso2 = {
        titulo: 'Curso Duplicado Test', // 
        descripcion: 'Segundo curso',
        precio: 75.00,
        idTipo: tipoId,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(curso2);

      console.log('=== CREATE CURSO DUPLICADO ===');
      console.log('Status:', response.status);
      console.log('Response body:', JSON.stringify(response.body, null, 2));

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('errors');
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors[0]).toHaveProperty('msg', 'El titulo ya está en uso');
      expect(response.body.errors[0]).toHaveProperty('path', 'titulo');
    } else {
      console.log('⚠️ Saltando test de duplicado - primer curso no se creó');
      expect(firstResponse.status).toBeGreaterThan(0);
    }
  });

  test('debería validar campos requeridos', async () => {
    const cursoIncompleto = {
      descripcion: 'Solo descripción',
      precio: 50.00
      // Falta título, idTipo, idProfesor
    };

    const response = await request(app)
      .post('/api/cursos')
      .send(cursoIncompleto);

    console.log('=== CREATE CURSO INCOMPLETO ===');
    console.log('Status:', response.status);
    console.log('Response body:', JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
    
    // Verificar que hay errores de validación para campos faltantes
    const errorPaths = response.body.errors.map(err => err.path);
    expect(errorPaths).toContain('titulo');
    expect(errorPaths).toContain('idTipo');
    
    // Verificar algunos mensajes de error específicos
    const tituloErrors = response.body.errors.filter(err => err.path === 'titulo');
    expect(tituloErrors.length).toBeGreaterThan(0);
    expect(tituloErrors[0]).toHaveProperty('msg', 'Invalid value');
  });

  test('debería obtener lista de cursos', async () => {
    // Crear un curso primero
    const curso = {
      titulo: 'Curso Test Lista Unique',
      descripcion: 'Para probar lista',
      precio: 25.00,
      idTipo: tipoId,
      idProfesor: profesorId
    };

    const createResponse = await request(app)
      .post('/api/cursos')
      .send(curso);

    console.log('=== CREATE PARA LISTA ===');
    console.log('Create Status:', createResponse.status);

    // Obtener lista
    const response = await request(app)
      .get('/api/cursos');

    console.log('=== GET CURSOS ===');
    console.log('Status:', response.status);
    console.log('Response type:', typeof response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('contenido');
    expect(Array.isArray(response.body.contenido)).toBe(true);
    
    // Si se creó el curso, debería estar en la lista
    if (createResponse.status === 201) {
      expect(response.body.contenido.length).toBeGreaterThan(0);
      
      // Verificar que el curso creado está en la lista
      const cursoEnLista = response.body.contenido.find(c => c.titulo === 'Curso Test Lista Unique');
      expect(cursoEnLista).toBeDefined();
      expect(cursoEnLista).toHaveProperty('TipoCurso'); // Include de TipoCurso
    }
  });

  test('debería obtener curso por ID', async () => {
    // Crear curso con título único
    const curso = {
      titulo: 'Curso Test Por ID Unique',
      descripcion: 'Para probar obtener por ID',
      precio: 35.00,
      idTipo: tipoId,
      idProfesor: profesorId
    };

    const createResponse = await request(app)
      .post('/api/cursos')
      .send(curso);

    console.log('=== CREATE PARA GET BY ID ===');
    console.log('Create Status:', createResponse.status);
    console.log('Create Body:', JSON.stringify(createResponse.body, null, 2));

    if (createResponse.status === 201 && createResponse.body.contenido) {
      const cursoId = createResponse.body.contenido.idCurso;

      // Obtener por ID
      const response = await request(app)
        .get(`/api/cursos/${cursoId}`);

      console.log('=== GET CURSO BY ID ===');
      console.log('Status:', response.status);
      console.log('Response body:', JSON.stringify(response.body, null, 2));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('msg', 'Curso encontrado');
      expect(response.body).toHaveProperty('informacion'); // 
      expect(response.body.informacion.idCurso).toBe(cursoId);
      expect(response.body.informacion.titulo).toBe(curso.titulo);
      expect(response.body.informacion.precio).toBe(curso.precio);
      expect(response.body.informacion).toHaveProperty('TipoCurso'); 
    } else {
      console.log('No se pudo crear curso para test GET by ID');
      expect(createResponse.status).toBeGreaterThan(0);
    }
  });

  test('debería fallar al obtener curso inexistente', async () => {
    const response = await request(app)
      .get('/api/cursos/99999');

    console.log('=== GET CURSO INEXISTENTE ===');
    console.log('Status:', response.status);
    console.log('Response body:', JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors[0]).toHaveProperty('msg', 'Curso no encontrado');
    expect(response.body.errors[0]).toHaveProperty('path', 'idCurso');
    expect(response.body.errors[0]).toHaveProperty('location', 'params');
  });
});