import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import { Usuario } from '../../models/Usuario.js';
import { Curso } from '../../models/Curso.js';
import { TipoCurso } from '../../models/TipoCurso.js';
import { sequelize } from '../../database/sequelize.js';

describe('Profesor - Tests', () => {
  let tipoId, profesorId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Crear tipo de curso
    const tipo = await TipoCurso.create({
      nombreTipo: 'Programación',
      descripcion: 'Cursos de programación',
      icono: 'code'
    });
    tipoId = tipo.idTipo;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('Crea un profesor', async () => {
    const nuevoProfesor = {
      nombreUsuario: 'Juan Pérez',
      email: 'juan@profesor.com',
      contrasena: 'password123',
      tipoUsuario: 'creador',
      descripcion: 'Profesor de JavaScript'
    };

    const res = await request(app)
      .post('/usuarios')
      .send(nuevoProfesor);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.contenido.tipoUsuario).toBe('creador');
    profesorId = res.body.contenido.idUsuario;
  });

  it('Crea un curso para el profesor', async () => {
    const curso = await Curso.create({
      titulo: 'Curso de Node.js',
      descripcion: 'Backend con Node',
      precio: 800,
      idTipo: tipoId,
      idProfesor: profesorId,
      estado: 'aprobado'
    });

    expect(curso.idProfesor).toBe(profesorId);
    expect(curso.titulo).toBe('Curso de Node.js');
  });

  it('Obtiene el profesor con sus cursos', async () => {
    const profesor = await Usuario.findByPk(profesorId, {
      include: [{ model: Curso, as: 'CursosCreados' }]
    });

    expect(profesor.CursosCreados.length).toBeGreaterThan(0);
    expect(profesor.CursosCreados[0].titulo).toBe('Curso de Node.js');
  });

  it('Actualiza los datos del profesor', async () => {
    const res = await request(app)
      .put(`/usuarios/${profesorId}`)
      .send({
        descripcion: 'Profesor experto en Node.js y React',
        fraseDescriptiva: 'Aprendé desarrollo web moderno'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.atributo.descripcion).toContain('Node.js');
  });
});
