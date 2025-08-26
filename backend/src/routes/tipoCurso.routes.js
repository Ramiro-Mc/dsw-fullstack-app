import { Router } from "express";
import { tipoCursoController } from "../controllers/tipoCurso.controller.js";
import tipoCursoValidator from "../validators/tipoCurso.js";

const routerTipoCurso = Router();

routerTipoCurso.get("/tipoCursos", tipoCursoController.getAllTipos);
routerTipoCurso.post("/tipoCursos", tipoCursoValidator.validateCreate, tipoCursoController.createTipoCurso);
routerTipoCurso.put("/tipoCursos/:idTipo", tipoCursoValidator.validateUpdate, tipoCursoController.updateTipoCurso);
routerTipoCurso.delete("/tipoCursos/:idTipo", tipoCursoValidator.validateGetByIdAndDelete, tipoCursoController.deleteTipoCurso);
routerTipoCurso.get("/tipoCursos/:idTipo", tipoCursoValidator.validateGetByIdAndDelete, tipoCursoController.getTipoCursoById);

export default routerTipoCurso;