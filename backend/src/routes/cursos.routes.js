import { Router } from "express";
import { cursoController } from "../controllers/cursos.controller.js";
import cursoValidator from "../validators/cursos.js";

const routerCursos = Router();

routerCursos.get("/cursos", cursoController.getAllCursos);
routerCursos.post("/cursos", cursoValidator.validateCreate,  cursoController.createCurso);
routerCursos.put("/cursos/:idCurso", cursoValidator.validateUpdate, cursoController.updateCurso);
routerCursos.delete("/cursos/:idCurso", cursoValidator.validateGetByIdAndDelete, cursoController.deleteCurso);
routerCursos.get("/cursos/:idCurso", cursoValidator.validateGetByIdAndDelete, cursoController.getCursoById);


routerCursos.post("/cursos/:idCurso/descuentos", cursoValidator.validateAgregarQuitarDescuento, cursoController.agregarDescuento);
routerCursos.delete("/cursos/:idCurso/descuentos", cursoValidator.validateAgregarQuitarDescuento, cursoController.quitarDescuento);
routerCursos.get("/cursos/:idCurso/descuentos", cursoValidator.validateGetByIdAndDelete, cursoController.getAllDescuentosCurso);

// Rutas para admin
routerCursos.get("/admin/cursos/pendientes", cursoController.getCursosPendientes);
routerCursos.put("/admin/cursos/:idCurso/aprobar", cursoValidator.validateGetByIdAndDelete, cursoController.aprobarCurso);
routerCursos.put("/admin/cursos/:idCurso/rechazar", cursoValidator.validateGetByIdAndDelete, cursoController.rechazarCurso);
routerCursos.get("/cursos/aprobados", cursoController.getAllCursosAprobados);

export default routerCursos;
