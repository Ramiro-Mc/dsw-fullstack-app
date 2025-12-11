import { Router } from "express";
import { comunidadesController } from "../controllers/comunidades.controller.js";
import comunidadValidator from "../validators/comunidad.js";

const routerComunidades = Router();

routerComunidades.get("/comunidades", 
  comunidadesController.getAllComunidades
);

routerComunidades.get("/comunidades/curso/:idCurso", 
  comunidadValidator.validateGetByCurso, 
  comunidadesController.getComunidadByCurso
);
routerComunidades.get("/comunidades/:idComunidad", 
  comunidadValidator.validateGetByIdAndDelete,
  comunidadesController.getComunidadById
);

routerComunidades.post("/comunidades", 
  comunidadValidator.validateCreate, 
  comunidadesController.createComunidad
);

routerComunidades.put("/comunidades/:idComunidad", 
  comunidadValidator.validateUpdate, 
  comunidadesController.updateComunidad
);

routerComunidades.delete("/comunidades/:idComunidad", 
  comunidadValidator.validateGetByIdAndDelete, 
  comunidadesController.deleteComunidad
);

export default routerComunidades;