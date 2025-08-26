import { Router } from "express";
import { descuentoController } from "../controllers/descuentos.controller.js";
import descuentoValidator from "../validators/descuento.js";

const routerDescuentos = Router();

routerDescuentos.get("/descuentos", descuentoController.getAllDescuentos);
routerDescuentos.post("/descuentos", descuentoValidator.validateCreate, descuentoController.createDescuento);
routerDescuentos.put("/descuentos/:idDescuento", descuentoValidator.validateUpdate, descuentoController.updateDescuento);
routerDescuentos.delete("/descuentos/:idDescuento", descuentoValidator.validateGetByIdAndDelete, descuentoController.deleteDescuento);
routerDescuentos.get("/descuentos/:idDescuento", descuentoValidator.validateGetByIdAndDelete, descuentoController.getDescuentoById);

export default routerDescuentos;
