import { Router } from "express";
import { leccionController } from "../controllers/lecciones.controller.js";
import leccionValidator from "../validators/leccion.js";

const routerLeccion = Router();

routerLeccion.get("/lecciones", leccionController.getAllLecciones);
routerLeccion.post("/lecciones", leccionValidator.validateCreate, leccionController.createLeccion);
routerLeccion.put("/lecciones/:numeroLec", leccionValidator.validateUpdate, leccionController.updateLeccion);
routerLeccion.delete("/lecciones/:numeroLec", leccionValidator.validateGetByIdAndDelete, leccionController.deleteLeccion);
routerLeccion.get("/lecciones/:numeroLec", leccionValidator.validateGetByIdAndDelete, leccionController.getLeccionById);

routerLeccion.get("/modulos/:idModulo/lecciones", leccionValidator.validateGetByModulo, leccionController.getLeccionesByModulo);

export default routerLeccion;