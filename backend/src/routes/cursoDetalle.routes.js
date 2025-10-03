import { Router } from 'express';
import { cursoDetalleController } from '../controllers/cursoDetalle.controller.js';
import cursoDetalleValidators from '../validators/cursoDetalle.js';

const routercursoDetalle = Router();

// Obtener curso completo con módulos y clases
routercursoDetalle.get('/cursoDetalle/:idCurso', 
  cursoDetalleValidators.validateGetCursoCompleto,
  cursoDetalleController.getCursoCompleto
);

// Completar/descompletar una clase
routercursoDetalle  .put('/clases/:idClase/completar', 
  cursoDetalleValidators.validateCompletarClase,
  cursoDetalleController.completarClase
);

// Obtener clases de un módulo específico
routercursoDetalle.get('/modulos/:idModulo/clases',
  cursoDetalleValidators.validateGetClasesByModulo,
  cursoDetalleController.getClasesByModulo
);

export default routercursoDetalle;