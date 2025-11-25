import { Router } from 'express';
import { completarLeccion, obtenerProgresoUsuario } from "../controllers/alumnoLeccion.controller.js";

const routerAlumnoLeccion = Router();

// Ruta para completar/descompletar una lección
routerAlumnoLeccion.put('/lecciones/:numeroLec/completar', completarLeccion);

// Ruta para obtener el progreso de un usuario en un curso
routerAlumnoLeccion.get('/progreso/:idUsuario/:idCurso', obtenerProgresoUsuario);

export default routerAlumnoLeccion;