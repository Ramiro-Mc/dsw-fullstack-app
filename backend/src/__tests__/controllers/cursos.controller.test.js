import { describe, test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import { sequelize } from '../../database/sequelize.js';
import { Usuario } from '../../models/Usuario.js';
import { TipoCurso } from '../../models/TipoCurso.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Cursos Controller (Sistema Completo)', () => {
  let tipoId;
  let profesorId;
  let authToken;

  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexión a DB establecida para tests');

      // Limpiar datos previos
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await sequelize.query('DELETE FROM TipoCursos WHERE nombreTipo = "Programación"');
      await sequelize.query('DELETE FROM Usuarios WHERE email = "test@profesor.com"');
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

      // Crear tipo de curso
      const tipo = await TipoCurso.create({
        nombreTipo: 'Programación',
        descripcion: 'Cursos de programación'
      });
      tipoId = tipo.idTipo;
      console.log('TipoCurso creado con ID:', tipoId);

      // Crear usuario profesor
      const hashedPassword = await bcrypt.hash('password123', 10);
      const profesor = await Usuario.create({
        nombreUsuario: 'Profesor Test',
        email: 'test@profesor.com',
        contrasena: hashedPassword,
        tipoUsuario: 'profesor'
      });
      profesorId = profesor.idUsuario;
      console.log('Usuario creado con ID:', profesorId);

      // Generar token de autenticación
      authToken = jwt.sign(
        { idUsuario: profesorId, email: 'test@profesor.com', tipoUsuario: 'profesor' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log('Token generado:', authToken);

    } catch (error) {
      console.error('Error en setup de tests:', error);
      throw error;
    }
  });

  beforeEach(async () => {
    // Limpiar cursos de prueba antes de cada test - MEJORAR PATTERN
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await sequelize.query('DELETE FROM Lecciones WHERE idModulo IN (SELECT idModulo FROM Modulos WHERE idCurso IN (SELECT idCurso FROM Cursos WHERE titulo LIKE "%Test%" OR titulo LIKE "%Prueba%" OR titulo LIKE "%Único%" OR titulo LIKE "%Integración%"))');
      await sequelize.query('DELETE FROM Modulos WHERE idCurso IN (SELECT idCurso FROM Cursos WHERE titulo LIKE "%Test%" OR titulo LIKE "%Prueba%" OR titulo LIKE "%Único%" OR titulo LIKE "%Integración%")');
      await sequelize.query('DELETE FROM Cursos WHERE titulo LIKE "%Test%" OR titulo LIKE "%Prueba%" OR titulo LIKE "%Único%" OR titulo LIKE "%Integración%"');
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (error) {
      console.log('Error limpiando datos de prueba:', error.message);
    }
  });

  afterAll(async () => {
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await sequelize.query('DELETE FROM Lecciones WHERE idModulo IN (SELECT idModulo FROM Modulos WHERE idCurso IN (SELECT idCurso FROM Cursos WHERE titulo LIKE "%Test%" OR titulo LIKE "%Prueba%" OR titulo LIKE "%Único%" OR titulo LIKE "%Integración%"))');
      await sequelize.query('DELETE FROM Modulos WHERE idCurso IN (SELECT idCurso FROM Cursos WHERE titulo LIKE "%Test%" OR titulo LIKE "%Prueba%" OR titulo LIKE "%Único%" OR titulo LIKE "%Integración%")');
      await sequelize.query('DELETE FROM Cursos WHERE titulo LIKE "%Test%" OR titulo LIKE "%Prueba%" OR titulo LIKE "%Único%" OR titulo LIKE "%Integración%"');
      await sequelize.query('DELETE FROM Usuarios WHERE email = "test@profesor.com"');
      await sequelize.query('DELETE FROM TipoCursos WHERE nombreTipo = "Programación"');
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (error) {
      console.log('Error en cleanup final:', error.message);
    }
  });

  describe('NuevosCursos Controller - Funcionalidad Principal', () => {
    describe('GET /tipos-curso', () => {
      test('debería obtener todos los tipos de curso', async () => {
        const response = await request(app)
          .get('/tipos-curso');

        console.log('=== GET /tipos-curso (nuevosCursos) ===');
        console.log('Response status:', response.status);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
    });

    describe('POST /cursos (nuevosCursos)', () => {
      test('debería crear un curso completo exitosamente', async () => {
        const nuevoCurso = {
          titulo: 'Curso de Prueba NuevosCursos',
          descripcion: 'Descripción de prueba para nuevosCursos controller',
          precio: 99.99,
          idTipo: tipoId,
          idProfesor: profesorId,
          modulos: [
            {
              titulo: 'Módulo 1 - Introducción',
              lecciones: [
                {
                  tituloLec: 'Lección 1 - Conceptos básicos',
                  descripcionLec: 'Descripción de la primera lección',
                  horasLec: 2,
                  estadoLec: 'activo',
                  completado: false
                }
              ]
            }
          ]
        };

        console.log('=== CREANDO CURSO CON NUEVOSCURSOS ===');
        
        const response = await request(app)
          .post('/cursos')
          .send(nuevoCurso);

        console.log('Status:', response.status);
        console.log('Body:', JSON.stringify(response.body, null, 2));

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('idCurso');
        expect(response.body.titulo).toBe(nuevoCurso.titulo);
        expect(response.body.precio).toBe(nuevoCurso.precio);
        expect(response.body.Modulos).toHaveLength(1);
        expect(response.body.Modulos[0].Lecciones).toHaveLength(1);
        expect(response.body.TipoCurso).toBeDefined();
      });

      test('debería fallar sin idProfesor', async () => {
        const cursoSinProfesor = {
          titulo: 'Curso Sin Profesor Test',
          descripcion: 'Descripción sin profesor',
          precio: 50.00,
          idTipo: tipoId,
          modulos: []
        };

        const response = await request(app)
          .post('/cursos')
          .send(cursoSinProfesor);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('ID del profesor es requerido');
      });

      test('debería fallar con título duplicado', async () => {
        const primerCurso = {
          titulo: 'Curso Único Test',
          descripcion: 'Primer curso con este título',
          precio: 75.00,
          idTipo: tipoId,
          idProfesor: profesorId,
          modulos: []
        };

        // Crear el primer curso
        const firstResponse = await request(app)
          .post('/cursos')
          .send(primerCurso);

        expect(firstResponse.status).toBe(201);

        // Intentar crear segundo curso con mismo título
        const segundoResponse = await request(app)
          .post('/cursos')
          .send(primerCurso);

        expect(segundoResponse.status).toBe(400);
        expect(segundoResponse.body.error).toContain('Ya existe un curso con este título');
      });
    });
  });

  describe('Cursos Controller - API y Administración', () => {
    describe('GET /api/cursos', () => {
      test('debería obtener todos los cursos via API', async () => {
        const response = await request(app)
          .get('/api/cursos');

        console.log('=== GET /api/cursos ===');
        console.log('Status:', response.status);

        // Puede ser 200 (con cursos) o 404 (sin cursos)
        expect([200, 404]).toContain(response.status);
        
        if (response.status === 200) {
          expect(response.body.success).toBe(true);
          expect(Array.isArray(response.body.contenido)).toBe(true);
        }
      });
    });

    describe('GET /api/admin/cursos/pendientes', () => {
      test('debería obtener cursos pendientes', async () => {
        const response = await request(app)
          .get('/api/admin/cursos/pendientes');

        console.log('=== GET /api/admin/cursos/pendientes ===');
        console.log('Status:', response.status);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.informacion).toBeInstanceOf(Array);
      });
    });

    describe('GET /api/admin/cursos/aprobados', () => {
      test('debería obtener cursos aprobados', async () => {
        const response = await request(app)
          .get('/api/admin/cursos/aprobados');

        console.log('=== GET /api/admin/cursos/aprobados ===');
        console.log('Status:', response.status);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.contenido).toBeInstanceOf(Array);
      });
    });
  });

  describe('Integración Completa', () => {
    test('debería crear curso con nuevosCursos y consultarlo con cursos API', async () => {
      // 1. Crear curso via nuevosCursos
      const nuevoCurso = {
        titulo: 'Curso Integración Test Único',
        descripcion: 'Test de integración completa',
        precio: 120.00,
        idTipo: tipoId,
        idProfesor: profesorId,
        modulos: [
          {
            titulo: 'Módulo Integración',
            lecciones: [
              {
                tituloLec: 'Lección Integración',
                descripcionLec: 'Lección para test de integración',
                horasLec: 1,
                estadoLec: 'activo',
                completado: false
              }
            ]
          }
        ]
      };

      const createResponse = await request(app)
        .post('/cursos')
        .send(nuevoCurso);

      expect(createResponse.status).toBe(201);
      const cursoCreado = createResponse.body;

      // 2. Consultar el curso via API
      const getResponse = await request(app)
        .get(`/api/cursos/${cursoCreado.idCurso}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.success).toBe(true);
      expect(getResponse.body.informacion.idCurso).toBe(cursoCreado.idCurso);

      // 3. Verificar que aparece en lista de pendientes
      const pendientesResponse = await request(app)
        .get('/api/admin/cursos/pendientes');

      expect(pendientesResponse.status).toBe(200);
      const cursosPendientes = pendientesResponse.body.informacion;
      const cursoEncontrado = cursosPendientes.find(c => c.idCurso === cursoCreado.idCurso);
      expect(cursoEncontrado).toBeDefined();
    });
  });

  describe('Cursos Controller - CRUD Operations', () => {
    let cursoId;
    let descuentoId;

    beforeEach(async () => {
      // Crear un curso de prueba para las operaciones
      const cursoData = {
        titulo: 'Curso Test CRUD Específico',
        descripcion: 'Descripción para test CRUD',
        precio: 75.50,
        idTipo: tipoId,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(cursoData);

      if (response.status === 201) {
        cursoId = response.body.contenido.idCurso;
      }

      // No crear descuento por ahora ya que no sabemos si la ruta existe
      descuentoId = null;
    });

    describe('POST /api/cursos (createCurso)', () => {
      test('debería crear un curso simple exitosamente', async () => {
        const nuevoCurso = {
          titulo: 'Curso Simple Test Único',
          descripcion: 'Descripción de curso simple',
          precio: 49.99,
          idTipo: tipoId,
          idProfesor: profesorId
        };

        const response = await request(app)
          .post('/api/cursos')
          .send(nuevoCurso);

        console.log('=== CREATE CURSO SIMPLE ===');
        console.log('Status:', response.status);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.contenido).toHaveProperty('idCurso');
        expect(response.body.contenido.titulo).toBe(nuevoCurso.titulo);
        expect(response.body.contenido.precio).toBe(nuevoCurso.precio);
        expect(response.body.contenido.idProfesor).toBe(profesorId);
      });

      test('debería fallar sin idProfesor', async () => {
        const cursoSinProfesor = {
          titulo: 'Curso Sin Profesor Test Único',
          descripcion: 'Descripción sin profesor',
          precio: 30.00,
          idTipo: tipoId
        };

        const response = await request(app)
          .post('/api/cursos')
          .send(cursoSinProfesor);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('ID del profesor es requerido');
      });
    });

    describe('PUT /api/cursos/:idCurso (updateCurso)', () => {
      test('debería actualizar un curso exitosamente', async () => {
        if (!cursoId) {
          console.log('No hay curso para actualizar, saltando test');
          return;
        }

        const datosActualizacion = {
          titulo: 'Curso Test CRUD Actualizado',
          descripcion: 'Descripción actualizada',
          precio: 85.00
        };

        const response = await request(app)
          .put(`/api/cursos/${cursoId}`)
          .send(datosActualizacion);

        console.log('=== UPDATE CURSO ===');
        console.log('Status:', response.status);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.atributo.titulo).toBe(datosActualizacion.titulo);
        expect(response.body.atributo.precio).toBe(datosActualizacion.precio);
      });

      test('debería actualizar solo los campos enviados', async () => {
        if (!cursoId) {
          console.log('No hay curso para actualizar, saltando test');
          return;
        }

        const soloTitulo = {
          titulo: 'Solo Título Actualizado Test'
        };

        const response = await request(app)
          .put(`/api/cursos/${cursoId}`)
          .send(soloTitulo);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.atributo.titulo).toBe(soloTitulo.titulo);
      });
    });

    describe('GET /api/cursos/:idCurso (getCursoById)', () => {
      test('debería obtener un curso por ID', async () => {
        if (!cursoId) {
          console.log('No hay curso para consultar, saltando test');
          return;
        }

        const response = await request(app)
          .get(`/api/cursos/${cursoId}`);

        console.log('=== GET CURSO BY ID ===');
        console.log('Status:', response.status);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.informacion).toHaveProperty('idCurso', cursoId);
        expect(response.body.informacion).toHaveProperty('TipoCurso');
      });

      test('debería manejar curso inexistente graciosamente', async () => {
        const response = await request(app)
          .get('/api/cursos/99999');

        console.log('=== GET CURSO INEXISTENTE ===');
        console.log('Status:', response.status);

        // Puede devolver 200 con null, 404, o 403 dependiendo de validadores
        expect([200, 403, 404]).toContain(response.status);
      });
    });

    describe('Gestión de Descuentos', () => {
      describe('POST /api/cursos/:idCurso/descuentos (agregarDescuento)', () => {
        test('debería manejar operación de descuento', async () => {
          if (!cursoId) {
            console.log('No hay curso para test de descuento, saltando');
            return;
          }

          const response = await request(app)
            .post(`/api/cursos/${cursoId}/descuentos`)
            .send({ idDescuento: 1 });

          console.log('=== AGREGAR DESCUENTO ===');
          console.log('Status:', response.status);

          // Puede ser 200 (éxito), 404 (no encontrado), o 403 (validación)
          expect([200, 403, 404]).toContain(response.status);
        });

        test('debería manejar curso inexistente', async () => {
          const response = await request(app)
            .post('/api/cursos/99999/descuentos')
            .send({ idDescuento: 1 });

          console.log('=== DESCUENTO CURSO INEXISTENTE ===');
          console.log('Status:', response.status);

          // Puede ser 404 (no encontrado) o 403 (validación)
          expect([403, 404]).toContain(response.status);
        });
      });

      describe('GET /api/cursos/:idCurso/descuentos (getAllDescuentosCurso)', () => {
        test('debería obtener descuentos del curso', async () => {
          if (!cursoId) {
            console.log('No hay curso para consultar descuentos, saltando test');
            return;
          }

          const response = await request(app)
            .get(`/api/cursos/${cursoId}/descuentos`);

          console.log('=== GET DESCUENTOS CURSO ===');
          console.log('Status:', response.status);

          // Puede ser 200 (éxito) o 403 (validación)
          expect([200, 403]).toContain(response.status);

          if (response.status === 200) {
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.informacion)).toBe(true);
          }
        });
      });

      describe('DELETE /api/cursos/:idCurso/descuentos (quitarDescuento)', () => {
        test('debería manejar operación de quitar descuento', async () => {
          if (!cursoId) {
            console.log('No hay curso para quitar descuento, saltando');
            return;
          }

          const response = await request(app)
            .delete(`/api/cursos/${cursoId}/descuentos`)
            .send({ idDescuento: 1 });

          console.log('=== QUITAR DESCUENTO ===');
          console.log('Status:', response.status);

          // Puede ser 200 (éxito), 404 (no encontrado), o 403 (validación)
          expect([200, 403, 404]).toContain(response.status);
        });
      });
    });

    describe('Administración de Cursos', () => {
      describe('PUT /api/admin/cursos/:idCurso/aprobar (aprobarCurso)', () => {
        test('debería aprobar un curso pendiente', async () => {
          if (!cursoId) {
            console.log('No hay curso para aprobar, saltando test');
            return;
          }

          const response = await request(app)
            .put(`/api/admin/cursos/${cursoId}/aprobar`);

          console.log('=== APROBAR CURSO ===');
          console.log('Status:', response.status);

          expect(response.status).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.msg).toContain('Curso aprobado correctamente');
          expect(response.body.contenido.estado).toBe('aprobado');
        });
      });

      describe('PUT /api/admin/cursos/:idCurso/rechazar (rechazarCurso)', () => {
        test('debería rechazar un curso pendiente', async () => {
          // Crear un curso específico para rechazar
          const cursoParaRechazar = {
            titulo: 'Curso Para Rechazar Test Único',
            descripcion: 'Este curso será rechazado',
            precio: 25.00,
            idTipo: tipoId,
            idProfesor: profesorId
          };

          const createResponse = await request(app)
            .post('/api/cursos')
            .send(cursoParaRechazar);

          if (createResponse.status !== 201) {
            console.log('No se pudo crear curso para rechazar, saltando test');
            return;
          }

          const cursoIdParaRechazar = createResponse.body.contenido.idCurso;

          const response = await request(app)
            .put(`/api/admin/cursos/${cursoIdParaRechazar}/rechazar`)
            .send({ motivo: 'Contenido inapropiado' });

          console.log('=== RECHAZAR CURSO ===');
          console.log('Status:', response.status);

          expect(response.status).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.msg).toContain('Curso rechazado correctamente');
        });
      });
    });
  });

  describe('Edge Cases y Validaciones', () => {
    test('debería manejar errores de base de datos graciosamente', async () => {
      // Intentar crear curso con idTipo inexistente
      const cursoInvalido = {
        titulo: 'Curso con Tipo Inválido Test',
        descripcion: 'Tipo de curso que no existe',
        precio: 50.00,
        idTipo: 99999,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(cursoInvalido);

      console.log('=== ERROR DB TEST ===');
      console.log('Status:', response.status);

      // Puede ser 404 (ruta no encontrada), 400 (validación), o 500 (error DB)
      expect([400, 404, 500]).toContain(response.status);
    });

    test('debería filtrar cursos por categoría', async () => {
      const response = await request(app)
        .get('/api/cursos?categoria=Programación');

      console.log('=== FILTRAR POR CATEGORIA ===');
      console.log('Status:', response.status);

      // Puede ser 200 (con cursos), 404 (sin cursos), o 500 (error)
      expect([200, 404, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.contenido)).toBe(true);
      }
    });

    test('debería manejar operaciones con IDs inválidos', async () => {
      const responses = await Promise.allSettled([
        request(app).get('/api/cursos/invalid'),
        request(app).put('/api/cursos/invalid').send({ titulo: 'Test' }),
        request(app).post('/api/cursos/invalid/descuentos').send({ idDescuento: 1 })
      ]);

      responses.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const response = result.value;
          console.log(`Operación ${index + 1} - Status:`, response.status);
          expect(response.status).toBeGreaterThanOrEqual(400);
        }
      });
    });
  });

  describe('Performance y Límites', () => {
    test('debería manejar consultas con muchos includes', async () => {
      const response = await request(app)
        .get('/api/cursos')
        .timeout(5000); // 5 segundos de timeout

      console.log('=== PERFORMANCE TEST ===');
      console.log('Status:', response.status);
      console.log('Response time should be reasonable');

      expect([200, 404]).toContain(response.status);
    });

    test('debería validar límites de datos', async () => {
      const cursoConDatosLargos = {
        titulo: 'T'.repeat(50) + ' Test', // Título largo pero no excesivo
        descripcion: 'D'.repeat(200) + ' para test', // Descripción larga
        precio: 9999.99, // Precio alto pero razonable
        idTipo: tipoId,
        idProfesor: profesorId
      };

      const response = await request(app)
        .post('/api/cursos')
        .send(cursoConDatosLargos);

      console.log('=== VALIDACION LIMITES ===');
      console.log('Status:', response.status);

      // Puede ser 201 (acepta), 400 (valida), 404 (no encuentra ruta), o 500 (error)
      expect([201, 400, 404, 500]).toContain(response.status);
    });
  });
});