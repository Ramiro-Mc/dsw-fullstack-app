import { Router } from "express";
import { cursoController } from "../controllers/cursos.controller.js";
import cursoValidator from "../validators/cursos.js";

const routerCursos = Router();

// Rutas principales bajo /api/cursos
routerCursos.get("/cursos", cursoController.getAllCursos);                   
routerCursos.get("/cursos/aprobados", cursoController.getAllCursosAprobados);  
routerCursos.post("/cursos", cursoValidator.validateCreate, cursoController.createCurso);  
routerCursos.get("/cursos/aprobados", cursoController.getAllCursosAprobados); 
routerCursos.put("/cursos/:idCurso", cursoValidator.validateUpdate, cursoController.updateCurso);  
routerCursos.get("/cursos/:idCurso", cursoValidator.validateGetByIdAndDelete, cursoController.getCursoById);  
routerCursos.delete("/cursos/:idCurso", cursoValidator.validateGetByIdAndDelete, cursoController.deleteCurso);
routerCursos.get("/cursos/:idCurso/duracion", cursoController.getDuracionCurso);


// Rutas administrativas bajo /api/admin
routerCursos.get("/admin/cursos/pendientes", cursoController.getCursosPendientes);
routerCursos.put("/admin/cursos/:idCurso/aprobar", cursoValidator.validateGetByIdAndDelete, cursoController.aprobarCurso);
routerCursos.put("/admin/cursos/:idCurso/rechazar", cursoValidator.validateGetByIdAndDelete, cursoController.rechazarCurso);
routerCursos.get("/admin/cursos/aprobados", cursoController.getAllCursosAdmin);
routerCursos.put("/admin/cursos/:idCurso/restaurar", cursoValidator.validateGetByIdAndDelete, cursoController.restaurarCurso);
routerCursos.get("/admin/cursos/eliminados", cursoController.getCursosEliminados);

export default routerCursos;