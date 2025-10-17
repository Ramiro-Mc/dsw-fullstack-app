import { Router } from "express";
import { alumnoCursoController } from "../controllers/alumnos_cursos.controller.js";

const routerAlumnoCurso = Router();

routerAlumnoCurso.get("/alumnos_cursos", alumnoCursoController.getAllAlumnosCursos);
routerAlumnoCurso.get("/alumnos_cursos/usuario/:idUsuario", alumnoCursoController.getCursosByUsuario); // ← NUEVO
routerAlumnoCurso.post("/alumnos_cursos", alumnoCursoController.createAlumnosCurso);
routerAlumnoCurso.delete("/alumnos_cursos/:idUsuario/:idCurso", alumnoCursoController.deleteAlumnosCurso);
routerAlumnoCurso.get("/alumnos_cursos/:idUsuario/:idCurso", alumnoCursoController.getAlumnosCursoById);

export default routerAlumnoCurso;
