import { Router } from "express";

const routerPublicidad = Router();

routerPublicidad.get("/cursos", (req, res) => {});
routerPublicidad.post("/cursos", (req, res) => {});
routerPublicidad.put("/cursos/:idCurso", (req, res) => {});
routerPublicidad.delete("/cursos/:idCurso", (req, res) => {});
routerPublicidad.get("/cursos/:idCurso", (req, res) => {});

export default routerPublicidad;