import { Router } from "express";
import { publicacionController } from "../controllers/publicaciones.controller.js";
import publicacionValidator from "../validators/publicacion.js";

const routerPublicacion = Router();

routerPublicacion.get("/publicaciones", 
  publicacionController.getAllPublicaciones
);

routerPublicacion.get("/publicaciones/comunidad/:idComunidad", 
  publicacionValidator.validateGetByComunidad,
  publicacionController.getPublicacionesByComunidad
);
routerPublicacion.get("/publicaciones/:idPublicacion", 
  publicacionValidator.validateGetByIdAndDelete, 
  publicacionController.getPublicacionById
);

routerPublicacion.post("/publicaciones", 
  publicacionValidator.validateCreate, 
  publicacionController.createPublicacion
);

routerPublicacion.put("/publicaciones/:idPublicacion", 
  publicacionValidator.validateUpdate, 
  publicacionController.updatePublicacion
);

routerPublicacion.delete("/publicaciones/:idPublicacion", 
  publicacionValidator.validateGetByIdAndDelete, 
  publicacionController.deletePublicacion
);

export default routerPublicacion;