import { Router } from "express";
import { tipoCursoController } from "../controllers/tipoCurso.controller.js";

const routerTipoCurso = Router();

routerTipoCurso.get("/tipoCursos", tipoCursoController.getAllTipos);
routerTipoCurso.post("/tipoCursos", tipoCursoController.createTipoCurso);
routerTipoCurso.put("/tipoCursos/:idTipo", tipoCursoController.updateTipoCurso);
routerTipoCurso.delete("/tipoCursos/:idTipo", tipoCursoController.deleteTipoCurso);
routerTipoCurso.get("/tipoCursos/:idTipo", tipoCursoController.getTipoCursoById);

export default routerTipoCurso;