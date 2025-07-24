import { Router } from "express";
import { comunidadesController } from "../controllers/comunidades.controller.js";

const routerComunidades = Router();

routerComunidades.get("/comunidades", comunidadesController.getAllComunidades);
routerComunidades.post("/comunidades",comunidadesController.createComunidad);
routerComunidades.put("/comunidades/:idCurso", comunidadesController.updateComunidad);
routerComunidades.delete("/comunidades/:idCurso",comunidadesController.deleteComunidad);
routerComunidades.get("/comunidades/:idCurso", comunidadesController.getComunidadById);

export default routerComunidades;
