import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import { Comunidad } from "../models/Comunidad.js";
import { Curso } from "../models/Curso.js";
import { Op } from "sequelize";

const validateCreate = [
  check('titulo').exists().notEmpty()
    .withMessage('El título es obligatorio'),
  
  check('idCurso').exists().notEmpty().isNumeric()
    .withMessage('ID de curso es obligatorio y debe ser numérico')
    .custom(async (idCurso) => {
      const cursoEnc = await Curso.findByPk(idCurso);
      if (!cursoEnc) {
        throw new Error("Curso no encontrado");
      }
      
      const comunidadExistente = await Comunidad.findOne({ where: { idCurso } });
      if (comunidadExistente) {
        throw new Error("Este curso ya tiene una comunidad");
      }
      
      return true;
    }),
  validateResult
];

const validateUpdate = [
 
  check('idComunidad').exists().notEmpty().isNumeric()
    .withMessage('ID de comunidad es obligatorio y debe ser numérico')
    .custom(async (idComunidad) => {
      const comunidadEnc = await Comunidad.findByPk(idComunidad);
      if (!comunidadEnc) {
        throw new Error("Comunidad no encontrada");
      }
      return true;
    }),
  
  check('titulo').exists().notEmpty()
    .withMessage('El título es obligatorio'),
  
  validateResult
];

const validateGetByIdAndDelete = [
  check('idComunidad').exists().notEmpty().isNumeric()
    .withMessage('ID de comunidad es obligatorio y debe ser numérico')
    .custom(async (idComunidad) => {
      const comunidadEnc = await Comunidad.findByPk(idComunidad);
      if (!comunidadEnc) {
        throw new Error("Comunidad no encontrada");
      }
      return true;
    }),
  validateResult
];

// Validador para buscar comunidad por curso
const validateGetByCurso = [
  check('idCurso').exists().notEmpty().isNumeric()
    .withMessage('ID de curso es obligatorio y debe ser numérico')
    .custom(async (idCurso) => {
      const cursoEnc = await Curso.findByPk(idCurso);
      if (!cursoEnc) {
        throw new Error("Curso no encontrado");
      }
      return true;
    }),
  validateResult
];

export default { 
  validateCreate, 
  validateUpdate, 
  validateGetByIdAndDelete,
  validateGetByCurso 
};