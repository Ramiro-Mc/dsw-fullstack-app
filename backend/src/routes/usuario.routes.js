import { Router } from "express";
import { usuarioController } from "../controllers/usuarios.controller.js";
import validateCreate from "../validators/usuarios.js"

const routerUsuario = Router();

routerUsuario.get("/usuarios", usuarioController.getAllUsuarios);
routerUsuario.post("/usuarios", validateCreate,  usuarioController.createUsuario);
routerUsuario.put("/usuarios/:idUsuario", usuarioController.updateUsuario);
routerUsuario.delete("/usuarios/:idUsuario", usuarioController.deleteUsuario);
routerUsuario.get("/usuarios/:idUsuario", usuarioController.getUsuarioById);
routerUsuario.post("/login", usuarioController.loginUsuario);
export default routerUsuario;
