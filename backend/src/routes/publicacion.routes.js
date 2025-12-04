import { Router } from "express";
import { publicacionController } from "../controllers/publicaciones.controller.js";
import publicacionValidator from "../validators/publicacion.js";

const routerPublicacion = Router();

// Obtener todas las publicaciones
routerPublicacion.get("/publicaciones", 
  publicacionController.getAllPublicaciones
);

// Obtener publicaciones por comunidad 
routerPublicacion.get("/publicaciones/comunidad/:idComunidad", 
  publicacionValidator.validateGetByComunidad,
  publicacionController.getPublicacionesByComunidad
);
// Obtener publicación por ID
routerPublicacion.get("/publicaciones/:idPublicacion", 
  publicacionValidator.validateGetByIdAndDelete, 
  publicacionController.getPublicacionById
);

// Crear nueva publicación
routerPublicacion.post("/publicaciones", 
  publicacionValidator.validateCreate, 
  publicacionController.createPublicacion
);

// Actualizar publicación
routerPublicacion.put("/publicaciones/:idPublicacion", 
  publicacionValidator.validateUpdate, 
  publicacionController.updatePublicacion
);

// Eliminar publicación
routerPublicacion.delete("/publicaciones/:idPublicacion", 
  publicacionValidator.validateGetByIdAndDelete, 
  publicacionController.deletePublicacion
);

export default routerPublicacion;