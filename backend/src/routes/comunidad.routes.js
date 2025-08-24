import { Router } from "express";
import { comunidadesController } from "../controllers/comunidades.controller.js";
import comunidadValidator from "../validators/comunidad.js";

const routerComunidades = Router();

routerComunidades.get("/comunidades", comunidadesController.getAllComunidades);
routerComunidades.post("/comunidades", comunidadValidator.validateCreate, comunidadesController.createComunidad);
routerComunidades.put("/comunidades/:idCurso", comunidadValidator.validateUpdate, comunidadesController.updateComunidad);
routerComunidades.delete("/comunidades/:idCurso", comunidadValidator.validateGetByIdAndDelete, comunidadesController.deleteComunidad);
routerComunidades.get("/comunidades/:idCurso", comunidadValidator.validateGetByIdAndDelete, comunidadesController.getComunidadById);

export default routerComunidades;
