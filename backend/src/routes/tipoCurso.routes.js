import { Router } from "express";

const routerTipoCurso = Router();

routerTipoCurso.get("/cursos", (req, res) => {});
routerTipoCurso.post("/cursos", (req, res) => {});
routerTipoCurso.put("/cursos/:idCurso", (req, res) => {});
routerTipoCurso.delete("/cursos/:idCurso", (req, res) => {});
routerTipoCurso.get("/cursos/:idCurso", (req, res) => {});

export default routerTipoCurso;