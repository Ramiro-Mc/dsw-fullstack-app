import { Router } from "express";
import { pagoController } from "../controllers/pagos.controller.js";
import express from "express";

const routerPagos = Router();

routerPagos.get("/checkout/curso/:idCurso", pagoController.getCursoCheckout);

// STRIPE: Crear sesión de pago
routerPagos.post("/pagos/crear-sesion-stripe", pagoController.crearSesionStripe);

// STRIPE: Webhook (debe usar raw body)
// routerPagos.post(
//   "/pagos/webhook",
//   express.raw({ type: 'application/json' }),
//   pagoController.webhook
// );

// STRIPE: Verificar pago
routerPagos.get("/pagos/verificar/:sessionId", pagoController.verificarPago);

// TRANSFERENCIA: Método alternativo
routerPagos.post("/pagos/confirmar-transferencia", pagoController.confirmarTransferencia);

export default routerPagos;