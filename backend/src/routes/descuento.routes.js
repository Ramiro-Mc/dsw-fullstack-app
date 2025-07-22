import { Router } from "express";

const routerDescuento = Router();

routerDescuento.get("/cursos", (req, res) => {});
routerDescuento.post("/cursos", (req, res) => {});
routerDescuento.put("/cursos/:idCurso", (req, res) => {});
routerDescuento.delete("/cursos/:idCurso", (req, res) => {});
routerDescuento.get("/cursos/:idCurso", (req, res) => {});

export default routerDescuento;