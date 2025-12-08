import { Router } from "express";
import { pagoController } from "../controllers/pagos.controller.js";

const routerPagos = Router();

routerPagos.get("/checkout/curso/:idCurso", pagoController.getCursoCheckout);

// STRIPE: Crear sesión de pago
routerPagos.post("/pagos/crear-sesion-stripe", pagoController.crearSesionStripe);

// STRIPE: Verificar pago
routerPagos.get("/pagos/verificar/:sessionId", pagoController.verificarPago);

// TRANSFERENCIA: Método alternativo
routerPagos.post("/pagos/confirmar-transferencia", pagoController.confirmarTransferencia);

export default routerPagos;