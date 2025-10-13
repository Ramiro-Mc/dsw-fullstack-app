import { Router } from "express";
import { alumnoCursoController } from "../controllers/alumnos_cursos.controller.js";

const routerAlumnoCurso = Router();

routerAlumnoCurso.get("/alumnos_cursos", alumnoCursoController.getAllAlumnoCursos);
routerAlumnoCurso.post("/alumnos_cursos", alumnoCursoController.createAlumnoCurso);
routerAlumnoCurso.delete("/alumnos_cursos/:idUsuario/:idCurso", alumnoCursoController.deleteAlumnoCurso);
routerAlumnoCurso.get("/alumnos_cursos/:idUsuario/:idCurso", alumnoCursoController.getAlumnoCursoById);

export default routerAlumnoCurso;   