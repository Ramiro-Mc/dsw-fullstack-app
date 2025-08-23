import { Router } from "express";
import { cursoController } from "../controllers/cursos.controller.js";
import cursoValidator from "../validators/cursos.js";

const routerCursos = Router();

routerCursos.get("/cursos", cursoController.getAllCursos);
routerCursos.post("/cursos", cursoValidator.validateCreate,  cursoController.createCurso);
routerCursos.put("/cursos/:idCurso", cursoValidator.validateUpdate, cursoController.updateCurso);
routerCursos.delete("/cursos/:idCurso", cursoValidator.validateGetByIdAndDelete, cursoController.deleteCurso);
routerCursos.get("/cursos/:idCurso", cursoValidator.validateGetByIdAndDelete, cursoController.getCursoById);

export default routerCursos;
