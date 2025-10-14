import { Router } from "express";
import { pagoController } from "../controllers/pagos.controller.js";

const routerPagos = Router();

routerPagos.get("/checkout/curso/:idCurso", pagoController.getCursoCheckout);
routerPagos.post("/pagos/crear-preferencia", pagoController.crearPreferencia);
routerPagos.post("/pagos/webhook", pagoController.webhook);
routerPagos.get("/pagos/verificar/:idUsuario/:idCurso", pagoController.verificarPago);

export default routerPagos;