import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";
import { Usuario } from "../../models/Usuario.js";

describe("Usuario CRUD", () => {
  let createdUsuarioId;

  beforeEach(async () => {
    // Limpiar la tabla de usuarios antes de cada test
    await Usuario.destroy({ where: {}, force: true });
  });

  describe("POST /usuarios", () => {
    it("debería crear un nuevo usuario", async () => {
      const nuevoUsuario = {
        nombreUsuario: "TestUsuario",
        email: "testusuario@example.com",
        contrasena: "password123",
        tipoUsuario: "usuario",
      };

      const response = await request(app).post("/usuarios").send(nuevoUsuario).expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Usuario creado");
      expect(response.body.contenido.nombreUsuario).toBe(nuevoUsuario.nombreUsuario);
      expect(response.body.contenido.email).toBe(nuevoUsuario.email);
      createdUsuarioId = response.body.contenido.idUsuario;
    });

    it("debería fallar si el email ya está en uso", async () => {
      await Usuario.create({
        nombreUsuario: "UsuarioExistente",
        email: "existente@example.com",
        contrasena: "password123",
        tipoUsuario: "usuario",
      });

      const usuarioDuplicado = {
        nombreUsuario: "NuevoUsuario",
        email: "existente@example.com",
        contrasena: "password123",
        tipoUsuario: "usuario",
      };

      const response = await request(app).post("/usuarios").send(usuarioDuplicado).expect(403);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.some((error) => error.msg.includes("ya está en uso"))).toBe(true);
    });
  });

  describe("GET /usuarios", () => {
    it("debería obtener todos los usuarios", async () => {
      await Usuario.create({
        nombreUsuario: "Usuario1",
        email: "usuario1@example.com",
        contrasena: "password123",
        tipoUsuario: "usuario",
      });

      const response = await request(app).get("/usuarios").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Usuarios enviados");
      expect(response.body.contenido).toHaveLength(1);
      expect(response.body.contenido[0].nombreUsuario).toBe("Usuario1");
    });

    it("debería retornar 404 si no hay usuarios", async () => {
      const response = await request(app).get("/usuarios").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.msg).toBe("No hay usuarios");
    });
  });

  describe("GET /usuarios/:idUsuario", () => {
    it("debería obtener un usuario por ID", async () => {
      const usuario = await Usuario.create({
        nombreUsuario: "UsuarioTest",
        email: "usuariotest@example.com",
        contrasena: "password123",
        tipoUsuario: "usuario",
      });

      const response = await request(app).get(`/usuarios/${usuario.idUsuario}`).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("usuario encontrado");
      expect(response.body.informacion.idUsuario).toBe(usuario.idUsuario);
      expect(response.body.informacion.nombreUsuario).toBe("UsuarioTest");
    });

    it("debería fallar con ID inexistente", async () => {
      const response = await request(app).get("/usuarios/999").expect(403);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].msg).toBe("Usuario no encontrado");
    });
  });

  describe("PUT /usuarios/:idUsuario", () => {
    it("debería actualizar un usuario", async () => {
      const usuario = await Usuario.create({
        nombreUsuario: "UsuarioOriginal",
        email: "usuariooriginal@example.com",
        contrasena: "password123",
        tipoUsuario: "usuario",
      });

      const datosActualizados = {
        nombreUsuario: "UsuarioActualizado",
        email: "usuarioactualizado@example.com",
      };

      const response = await request(app).put(`/usuarios/${usuario.idUsuario}`).send(datosActualizados).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Usuario actualizado correctamente");
      expect(response.body.atributo.nombreUsuario).toBe(datosActualizados.nombreUsuario);
      expect(response.body.atributo.email).toBe(datosActualizados.email);
    });

    it("debería fallar con ID inexistente", async () => {
      const response = await request(app)
        .put("/usuarios/999")
        .send({
          nombreUsuario: "NoExiste",
          email: "noexiste@example.com",
        })
        .expect(403);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].msg).toBe("Usuario no encontrado");
    });
  });

  describe("DELETE /usuarios/:idUsuario", () => {
    it("debería eliminar un usuario", async () => {
      const usuario = await Usuario.create({
        nombreUsuario: "UsuarioEliminar",
        email: "usuarioeliminar@example.com",
        contrasena: "password123",
        tipoUsuario: "usuario",
      });

      const response = await request(app).delete(`/usuarios/${usuario.idUsuario}`).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.msg).toBe("Usuario desactivado correctamente");

      const usuarioEliminado = await Usuario.findByPk(usuario.idUsuario);
      expect(usuarioEliminado.activo).toBe(false);
    });

    it("debería fallar si intenta eliminar un administrador", async () => {
      const admin = await Usuario.create({
        nombreUsuario: "Admin",
        email: "admin@example.com",
        contrasena: "password123",
        tipoUsuario: "administrador",
      });

      const response = await request(app).delete(`/usuarios/${admin.idUsuario}`).expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.msg).toBe("No se puede eliminar un administrador");
    });
  });
});
