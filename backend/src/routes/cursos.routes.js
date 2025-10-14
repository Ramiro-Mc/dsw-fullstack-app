import { Router } from "express";
import { cursoController } from "../controllers/cursos.controller.js";
import cursoValidator from "../validators/cursos.js";

const routerCursos = Router();

// Rutas principales bajo /api/cursos
routerCursos.get("/cursos", cursoController.getAllCursos);                    // GET /api/cursos
routerCursos.post("/cursos", cursoValidator.validateCreate, cursoController.createCurso);  // POST /api/cursos - FALTABA ESTA RUTA
routerCursos.put("/cursos/:idCurso", cursoValidator.validateUpdate, cursoController.updateCurso);  // PUT /api/cursos/:id
routerCursos.get("/cursos/:idCurso", cursoValidator.validateGetByIdAndDelete, cursoController.getCursoById);  // GET /api/cursos/:id

// Rutas de descuentos bajo /api/cursos
routerCursos.post("/cursos/:idCurso/descuentos", cursoValidator.validateAgregarQuitarDescuento, cursoController.agregarDescuento);
routerCursos.delete("/cursos/:idCurso/descuentos", cursoValidator.validateAgregarQuitarDescuento, cursoController.quitarDescuento);
routerCursos.get("/cursos/:idCurso/descuentos", cursoValidator.validateGetByIdAndDelete, cursoController.getAllDescuentosCurso);

// Rutas administrativas bajo /api/admin
routerCursos.get("/admin/cursos/pendientes", cursoController.getCursosPendientes);
routerCursos.put("/admin/cursos/:idCurso/aprobar", cursoValidator.validateGetByIdAndDelete, cursoController.aprobarCurso);
routerCursos.put("/admin/cursos/:idCurso/rechazar", cursoValidator.validateGetByIdAndDelete, cursoController.rechazarCurso);
routerCursos.get("/admin/cursos/aprobados", cursoController.getAllCursosAprobados);

export default routerCursos;