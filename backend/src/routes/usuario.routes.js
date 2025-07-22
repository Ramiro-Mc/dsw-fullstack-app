import { Router } from "express";

const routerUsuario = Router();

routerUsuario.get("/cursos", (req, res) => {});
routerUsuario.post("/cursos", (req, res) => {});
routerUsuario.put("/cursos/:idCurso", (req, res) => {});
routerUsuario.delete("/cursos/:idCurso", (req, res) => {});
routerUsuario.get("/cursos/:idCurso", (req, res) => {});

export default routerUsuario;