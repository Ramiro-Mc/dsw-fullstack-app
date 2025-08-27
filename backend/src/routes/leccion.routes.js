import { Router } from "express";
import { leccionController } from "../controllers/lecciones.controller";
import leccionValidator from "../validators/leccion.js";

const routerLeccion = Router();

routerLeccion.get("/lecciones", leccionController.getAllLecciones);
routerLeccion.post("/lecciones", leccionValidator.validateCreate, leccionController.createLeccion);
routerLeccion.put("/lecciones/:idLeccion", leccionValidator.validateUpdate, leccionController.updateLeccion);
routerLeccion.delete("/lecciones/:idLeccion", leccionValidator.validateGetByIdAndDelete, leccionController.deleteLeccion);
routerLeccion.get("/lecciones/:idLeccion", leccionValidator.validateGetByIdAndDelete, leccionController.getLeccionById);

export default routerLeccion;