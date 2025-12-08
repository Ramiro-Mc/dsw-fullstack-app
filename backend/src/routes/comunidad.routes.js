import { Router } from "express";
import { comunidadesController } from "../controllers/comunidades.controller.js";
import comunidadValidator from "../validators/comunidad.js";

const routerComunidades = Router();

// Obtener todas las comunidades
routerComunidades.get("/comunidades", 
  comunidadesController.getAllComunidades
);

// Obtener comunidad por ID de curso 
routerComunidades.get("/comunidades/curso/:idCurso", 
  comunidadValidator.validateGetByCurso, 
  comunidadesController.getComunidadByCurso
);
// Obtener comunidad por ID de comunidad
routerComunidades.get("/comunidades/:idComunidad", 
  comunidadValidator.validateGetByIdAndDelete,
  comunidadesController.getComunidadById
);

// Crear nueva comunidad (manual)
routerComunidades.post("/comunidades", 
  comunidadValidator.validateCreate, 
  comunidadesController.createComunidad
);

// Actualizar por idComunidad
routerComunidades.put("/comunidades/:idComunidad", 
  comunidadValidator.validateUpdate, 
  comunidadesController.updateComunidad
);

// Eliminar por idComunidad
routerComunidades.delete("/comunidades/:idComunidad", 
  comunidadValidator.validateGetByIdAndDelete, 
  comunidadesController.deleteComunidad
);

export default routerComunidades;