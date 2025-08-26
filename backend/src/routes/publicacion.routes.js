import { Router } from "express";
import { publicacionController } from "../controllers/publicaciones.controller.js";
import publicacionValidator from "../validators/publicacion.js";

const routerPublicacion = Router();

routerPublicacion.get("/publicaciones", publicacionController.getAllPublicaciones);
routerPublicacion.post("/publicaciones", publicacionValidator.validateCreate, publicacionController.createPublicacion);
routerPublicacion.put("/publicaciones/:idPublicacion", publicacionValidator.validateUpdate, publicacionController.updatePublicacion);
routerPublicacion.delete("/publicaciones/:idPublicacion", publicacionValidator.validateGetByIdAndDelete, publicacionController.deletePublicacion);
routerPublicacion.get("/publicaciones/:idPublicacion", publicacionValidator.validateGetByIdAndDelete, publicacionController.getPublicacionById);

export default routerPublicacion;