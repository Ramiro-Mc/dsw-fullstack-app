import { Router } from "express";
import { tipoCursoController } from "../controllers/tipoCurso.controller.js";

const routerTipoCurso = Router();

routerTipoCurso.get("/tipoCursos", tipoCursoController.getAll);
routerTipoCurso.post("/tipoCursos", tipoCursoController.create);
routerTipoCurso.put("/tipoCursos/:idTipo", tipoCursoController.update);
routerTipoCurso.delete("/tipoCursos/:idTipo", tipoCursoController.delete);
routerTipoCurso.get("/tipoCursos/:idTipo", tipoCursoController.getById);

export default routerTipoCurso;