import { Router } from "express";
import { modulosController } from "../controllers/modulos.controller.js";
import moduloValidator from "../validators/modulo.js";

const routerModulo = Router();

routerModulo.get("/modulos", modulosController.getAllModulos);
routerModulo.post("/modulos", moduloValidator.validateCreate, modulosController.createModulo);
routerModulo.put("/modulos/:idModulo", moduloValidator.validateUpdate, modulosController.updateModulo);
routerModulo.delete("/modulos/:idModulo", moduloValidator.validateGetByIdAndDelete, modulosController.deleteModulo);
routerModulo.get("/modulos/:idModulo", moduloValidator.validateGetByIdAndDelete, modulosController.getModuloById);

routerModulo.get("/cursos/:idCurso/modulos", moduloValidator.validateGetByCurso, modulosController.getModulosByCurso);

export default routerModulo;