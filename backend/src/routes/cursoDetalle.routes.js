import { Router } from 'express';
import { cursoDetalleController } from '../controllers/cursoDetalle.controller.js';
import { completarLeccion } from '../controllers/alumnoLeccion.controller.js';
import cursoDetalleValidators from '../validators/cursoDetalle.js';

const routercursoDetalle = Router();

routercursoDetalle.get('/cursoDetalle/:idCurso', 
  cursoDetalleValidators.validateGetCursoCompleto,
  cursoDetalleController.getCursoCompleto
);

routercursoDetalle.put('/lecciones/:numeroLec/completar', 
  completarLeccion 
);

routercursoDetalle.get('/modulos/:idModulo/lecciones',
  cursoDetalleValidators.validateGetLeccionesByModulo,
  cursoDetalleController.getLeccionesByModulo
);

export default routercursoDetalle;