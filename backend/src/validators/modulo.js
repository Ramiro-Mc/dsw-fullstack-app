import { check } from "express-validator";
import { Op } from "sequelize";
import validateResult from "../helpers/validateHelper.js";
import { Modulo } from "../models/Modulo.js";
import { Curso } from "../models/Curso.js";

const validateCreate = [
  check('titulo').exists().notEmpty()
    .withMessage('El título es requerido')
    .custom(async (titulo, { req }) => {
      const { idCurso } = req.body;
      const moduloEnc = await Modulo.findOne({ 
        where: { 
          titulo,
          idCurso 
        } 
      });
      if (moduloEnc) {
        throw new Error("Ya existe un módulo con ese título en este curso");
      }
      return true;
    }),
  check('idCurso').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del curso debe ser un número entero positivo')
    .custom(async (idCurso) => {
      const cursoEnc = await Curso.findByPk(idCurso);
      if (!cursoEnc) {
        throw new Error("El curso especificado no existe");
      }
      return true;
    }),
  validateResult
];

const validateUpdate = [
  check('idModulo').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del módulo debe ser un número entero positivo')
    .custom(async (idModulo) => {
      const moduloEnc = await Modulo.findByPk(idModulo);
      if (!moduloEnc) {
        throw new Error("El módulo no existe");
      }
      return true;
    }),
  check('titulo').optional().notEmpty()
    .withMessage('El título no puede estar vacío')
    .custom(async (titulo, { req }) => {
      const { idModulo } = req.params;
      
    
      const moduloActual = await Modulo.findByPk(idModulo);
      if (!moduloActual) {
        throw new Error("El módulo no existe");
      }

      const moduloEnc = await Modulo.findOne({
        where: {
          titulo,
          idCurso: moduloActual.idCurso,
          idModulo: { [Op.ne]: idModulo }
        }
      });
      if (moduloEnc) {
        throw new Error("Ya existe otro módulo con ese título en este curso");
      }
      return true;
    }),
  check('idCurso').optional().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del curso debe ser un número entero positivo')
    .custom(async (idCurso) => {
      const cursoEnc = await Curso.findByPk(idCurso);
      if (!cursoEnc) {
        throw new Error("El curso especificado no existe");
      }
      return true;
    }),
  validateResult
];

const validateGetByIdAndDelete = [
  check('idModulo').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del módulo debe ser un número entero positivo')
    .custom(async (idModulo) => {
      const moduloEnc = await Modulo.findByPk(idModulo);
      if (!moduloEnc) {
        throw new Error("El módulo no existe");
      }
      return true;
    }),
  validateResult
];

const validateGetByCurso = [
  check('idCurso').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del curso debe ser un número entero positivo')
    .custom(async (idCurso) => {
      const cursoEnc = await Curso.findByPk(idCurso);
      if (!cursoEnc) {
        throw new Error("El curso no existe");
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