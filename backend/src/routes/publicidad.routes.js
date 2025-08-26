import { Router } from "express";
import { publicidadController } from "../controllers/publicidades.controller";
import publicidadValidator from "../validators/publicidad";

const routerPublicidad = Router();

routerPublicidad.get("/cursos",publicidadController.getAllPublicidades);
routerPublicidad.post("/cursos", publicidadValidator.validateCreate, publicidadController.createPublicidad);
routerPublicidad.put("/cursos/:idCurso", publicidadValidator.validateUpdate, publicidadController.updatePublicidad);
routerPublicidad.delete("/cursos/:idCurso", publicidadValidator.validateGetByIdAndDelete, publicidadController.deletePublicidad);
routerPublicidad.get("/cursos/:idCurso", publicidadValidator.validateGetByIdAndDelete, publicidadController.getPublicidadById);

export default routerPublicidad;