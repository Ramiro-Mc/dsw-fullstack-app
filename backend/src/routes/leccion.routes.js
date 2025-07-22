import { Router } from "express";

const routerLeccion = Router();

routerLeccion.get("/cursos", (req, res) => {});
routerLeccion.post("/cursos", (req, res) => {});
routerLeccion.put("/cursos/:idCurso", (req, res) => {});
routerLeccion.delete("/cursos/:idCurso", (req, res) => {});
routerLeccion.get("/cursos/:idCurso", (req, res) => {});

export default routerLeccion;