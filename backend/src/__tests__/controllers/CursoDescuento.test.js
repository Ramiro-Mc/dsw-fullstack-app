import request from "supertest";
import app from "../../app.js";
import { sequelize } from "../../database/sequelize.js";
import { Curso } from "../../models/Curso.js";
import { Descuento } from "../../models/Descuento.js";
import { Usuario } from "../../models/Usuario.js";
import { TipoCurso } from "../../models/TipoCurso.js";

describe("Curso con Descuentos", () => {
  let cursoId, descuentoId, profesorId, tipoId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Crear tipo de curso y profesor
    const tipo = await TipoCurso.create({ nombreTipo: "Test", descripcion: "Test", icono: "test" });
    tipoId = tipo.idTipo;

    const profesor = await Usuario.create({
      nombreUsuario: "Profesor Test",
      email: "profesor@test.com",
      contrasena: "123456",
      tipoUsuario: "profesor"
    });
    profesorId = profesor.idUsuario;

    // Crear curso
    const curso = await Curso.create({
      titulo: "Curso con descuento",
      descripcion: "Curso test",
      precio: 1000,
      idTipo: tipoId,
      idProfesor: profesorId
    });
    cursoId = curso.idCurso;

    // Crear descuento
    const descuento = await Descuento.create({
      nombre: "Descuento Test",
      porcentaje: 20,
      activo: true,
      fechaDesde: new Date(), // fecha de inicio
      fechahasta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // fecha de fin (una semana después)
    });
    descuentoId = descuento.idDescuento;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Asocia un descuento a un curso", async () => {
    const res = await request(app)
      .post(`/api/cursos/${cursoId}/descuentos`)
      .send({ idDescuento: descuentoId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Usá el alias correcto
    const cursoActualizado = await Curso.findByPk(cursoId, {
      include: { model: Descuento, as: "DescuentosDelCurso" }
    });
    expect(cursoActualizado.DescuentosDelCurso.length).toBeGreaterThan(0);
    expect(cursoActualizado.DescuentosDelCurso[0].idDescuento).toBe(descuentoId);
  });

  it("Quita el descuento del curso", async () => {
    const res = await request(app)
      .delete(`/api/cursos/${cursoId}/descuentos`)
      .send({ idDescuento: descuentoId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const cursoActualizado = await Curso.findByPk(cursoId, {
      include: { model: Descuento, as: "DescuentosDelCurso" }
    });
    expect(cursoActualizado.DescuentosDelCurso.length).toBe(0);
  });

  it("Asocia un descuento a un curso mediante el id del descuento", async () => {
    const res = await request(app)
      .post(`/api/cursos/${cursoId}/descuentos`)
      .send({ idDescuento: descuentoId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const cursoActualizado = await Curso.findByPk(cursoId, {
      include: { model: Descuento, as: "DescuentosDelCurso" }
    });
    expect(cursoActualizado.DescuentosDelCurso.length).toBeGreaterThan(0);
    expect(cursoActualizado.DescuentosDelCurso[0].idDescuento).toBe(descuentoId);
  });

  it("Quita el descuento del curso mediante el id del descuento", async () => {
    const res = await request(app)
      .delete(`/api/cursos/${cursoId}/descuentos`)
      .send({ idDescuento: descuentoId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const cursoActualizado = await Curso.findByPk(cursoId, {
      include: { model: Descuento, as: "DescuentosDelCurso" }
    });
    expect(cursoActualizado.DescuentosDelCurso.length).toBe(0);
  });
});