import { Router } from "express";
import { usuarioController } from "../controllers/usuarios.controller.js";
import usuarioValidator from "../validators/usuarios.js"

const routerUsuario = Router();

routerUsuario.get("/usuarios", usuarioController.getAllUsuarios);
routerUsuario.post("/usuarios", usuarioValidator.validateCreate,  usuarioController.createUsuario);
routerUsuario.put("/usuarios/:idUsuario", usuarioValidator.validateUpdate, usuarioController.updateUsuario);
routerUsuario.delete("/usuarios/:idUsuario", usuarioValidator.validateGetByIdAndDelete, usuarioController.deleteUsuario);
routerUsuario.get("/usuarios/:idUsuario", usuarioValidator.validateGetByIdAndDelete, usuarioController.getUsuarioById);
routerUsuario.post("/login", usuarioController.loginUsuario); //para este todavia no hago porque me da miedo romperlo
export default routerUsuario;
