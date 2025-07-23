import { Router } from "express";
import { cursoController } from "../controllers/cursos.controller.js";

const routerCursos = Router();

routerCursos.get("/cursos", cursoController.getAllCursos);
routerCursos.post("/cursos", cursoController.createCurso);
routerCursos.put("/cursos/:idCurso", cursoController.updateCurso);
routerCursos.delete("/cursos/:idCurso", cursoController.deleteCurso);
routerCursos.get("/cursos/:idCurso", cursoController.getCursoById);

export default routerCursos;

