import { Router } from "express";
import { usuarioController } from "../controllers/usuarios.controller.js";

const routerUsuario = Router();

routerUsuario.get("/usuarios", usuarioController.getAllUsuarios);
routerUsuario.post("/usuarios", usuarioController.createUsuario);
routerUsuario.put("/usuarios/:idUsuario", usuarioController.updateUsuario);
routerUsuario.delete("/usuarios/:idUsuario", usuarioController.deleteUsuario);
routerUsuario.get("/usuarios/:idUsuario", usuarioController.getUsuarioById);

export default routerUsuario;
