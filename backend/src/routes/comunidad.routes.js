import { Router } from "express";

const routerComunidades = Router();

routerComunidades.get("/cursos", (req, res) => {});
routerComunidades.post("/cursos", (req, res) => {});
routerComunidades.put("/cursos/:idCurso", (req, res) => {});
routerComunidades.delete("/cursos/:idCurso", (req, res) => {});
routerComunidades.get("/cursos/:idCurso", (req, res) => {});

export default routerComunidades;
