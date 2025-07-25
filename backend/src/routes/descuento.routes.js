import { Router } from "express";
import { descuentoController } from "../controllers/descuentos.controller.js";

const routerDescuentos = Router();

routerDescuentos.get("/descuentos", descuentoController.getAllDescuentos);
routerDescuentos.post("/descuentos", descuentoController.createDescuento);
routerDescuentos.put("/descuentos/:idDescuento", descuentoController.updateDescuento);
routerDescuentos.delete("/descuentos/:idDescuento", descuentoController.deleteDescuento);
routerDescuentos.get("/descuentos/:idDescuento", descuentoController.getDescuentoById);

export default routerDescuentos;