import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import { Curso } from "../models/Curso.js";
import { Leccion } from "../models/Leccion.js";

const validateGetCursoCompleto = [
  check('idCurso').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del curso debe ser un número entero positivo')
    .custom(async (idCurso) => {
      const cursoEnc = await Curso.findByPk(idCurso);
      if (!cursoEnc) {
        throw new Error("Curso no encontrado");
      }
      return true;
    }),
  validateResult
];

const validateCompletarLeccion = [
  check('numeroLec').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID de la clase debe ser un número entero positivo')
    .custom(async (numeroLec) => {
      const claseEnc = await Leccion.findByPk(numeroLec);
      if (!claseEnc) {
        throw new Error("Clase no encontrada");
      }
      return true;
    }),
  check('completado').exists().notEmpty()
    .isBoolean().withMessage('El campo completado debe ser un valor booleano'),
  validateResult
];

const validateModuloExists = [
  check('idModulo').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del módulo debe ser un número entero positivo')
    .custom(async (idModulo) => {
      const { Modulo } = await import("../models/Modulo.js");
      const moduloEnc = await Modulo.findByPk(idModulo);
      if (!moduloEnc) {
        throw new Error("Módulo no encontrado");
      }
      return true;
    }),
  validateResult
];

const validateLeccionExists = [
  check('numeroLec').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID de la clase debe ser un número entero positivo')
    .custom(async (numeroLec) => {
      const claseEnc = await Leccion.findByPk(numeroLec);
      if (!claseEnc) {
        throw new Error("Clase no encontrada");
      }
      return true;
    }),
  validateResult
];

// Validación para obtener clases de un módulo específico
const validateGetLeccionesByModulo = [
  check('idModulo').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del módulo debe ser un número entero positivo')
    .custom(async (idModulo) => {
      const { Modulo } = await import("../models/Modulo.js");
      const moduloEnc = await Modulo.findByPk(idModulo);
      if (!moduloEnc) {
        throw new Error("Módulo no encontrado");
      }
      return true;
    }),
  validateResult
];

// // Validación para actualizar progreso de tiempo visto (si lo implementas más adelante)
// const validateActualizarTiempoVisto = [
//   check('idClase').exists().notEmpty()
//     .isInt({ min: 1 }).withMessage('El ID de la clase debe ser un número entero positivo')
//     .custom(async (idClase) => {
//       const claseEnc = await Clase.findByPk(idClase);
//       if (!claseEnc) {
//         throw new Error("Clase no encontrada");
//       }
//       return true;
//     }),
//   check('tiempoVisto').exists().notEmpty()
//     .isInt({ min: 0 }).withMessage('El tiempo visto debe ser un número entero no negativo'),
//   validateResult
// ];

export default { 
  validateGetCursoCompleto, 
  validateCompletarLeccion, 
  validateModuloExists, 
  validateLeccionExists,
  validateGetLeccionesByModulo,
//   validateActualizarTiempoVisto
};