import { Router } from 'express';
import { cursoDetalleController } from '../controllers/cursoDetalle.controller.js';
import { completarLeccion } from '../controllers/alumnoLeccion.controller.js';
import cursoDetalleValidators from '../validators/cursoDetalle.js';

const routercursoDetalle = Router();

// Obtener curso completo con módulos y clases
routercursoDetalle.get('/cursoDetalle/:idCurso', 
  cursoDetalleValidators.validateGetCursoCompleto,
  cursoDetalleController.getCursoCompleto
);

// Completar/descompletar una lección
routercursoDetalle.put('/lecciones/:numeroLec/completar', 
  completarLeccion 
);

// Obtener lecciones de un módulo específico
routercursoDetalle.get('/modulos/:idModulo/lecciones',
  cursoDetalleValidators.validateGetLeccionesByModulo,
  cursoDetalleController.getLeccionesByModulo
);

export default routercursoDetalle;