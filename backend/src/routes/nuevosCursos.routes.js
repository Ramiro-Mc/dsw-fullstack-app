import { Router } from 'express';
import { crearCursoCompleto, obtenerTiposCurso } from '../controllers/nuevosCursos.controller.js';

const routerNuevosCursos = Router();

routerNuevosCursos.get('/tipos-curso', obtenerTiposCurso);
routerNuevosCursos.post('/cursos', crearCursoCompleto);

export default routerNuevosCursos;