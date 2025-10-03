import { check } from "express-validator";
import { Op } from "sequelize";
import validateResult from "../helpers/validateHelper.js";
import { Leccion } from "../models/Leccion.js";
import { Modulo } from "../models/Modulo.js";

const validateCreate = [
  // NO validar numeroLec porque es autoincremental
  check('tituloLec').exists().notEmpty()
    .withMessage('El título de la lección es requerido')
    .custom(async (tituloLec, { req }) => {
      const { idModulo } = req.body;
      const leccionEnc = await Leccion.findOne({ 
        where: { 
          tituloLec,
          idModulo 
        } 
      });
      if (leccionEnc) {
        throw new Error("Ya existe una lección con ese título en este módulo");
      }
      return true;
    }),
  check('descripcionLec').optional(),
  check('estadoLec').optional(),
  check('horasLec').optional()
    .isInt({ min: 0 }).withMessage('Las horas deben ser un número entero positivo'),
  check('videoUrl').optional()
    .isURL().withMessage('Debe ser una URL válida'),
  check('contenidoTexto').optional(),
  check('imagenUrl').optional()
    .isURL().withMessage('Debe ser una URL válida'),
  check('archivoUrl').optional()
    .isURL().withMessage('Debe ser una URL válida'),
  check('idModulo').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del módulo debe ser un número entero positivo')
    .custom(async (idModulo) => {
      const moduloEnc = await Modulo.findByPk(idModulo);
      if (!moduloEnc) {
        throw new Error("Módulo no encontrado");
      }
      return true;
    }),
  validateResult
];

const validateUpdate = [
  check('numeroLec').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID de la lección debe ser un número entero positivo')
    .custom(async (numeroLec) => {
      const leccionEnc = await Leccion.findByPk(numeroLec);
      if (!leccionEnc) {
        throw new Error("Lección no encontrada");
      }
      return true;
    }),
  check('tituloLec').optional().notEmpty()
    .withMessage('El título no puede estar vacío')
    .custom(async (tituloLec, { req }) => {
      const { numeroLec } = req.params;
      
      // Obtener la lección actual para conocer su módulo
      const leccionActual = await Leccion.findByPk(numeroLec);
      if (!leccionActual) {
        throw new Error("La lección no existe");
      }

      const leccionEnc = await Leccion.findOne({
        where: {
          tituloLec,
          idModulo: leccionActual.idModulo,
          numeroLec: { [Op.ne]: numeroLec }
        }
      });
      if (leccionEnc) {
        throw new Error("Ya existe otra lección con ese título en este módulo");
      }
      return true;
    }),
  check('descripcionLec').optional(),
  check('estadoLec').optional(),
  check('horasLec').optional()
    .isInt({ min: 0 }).withMessage('Las horas deben ser un número entero positivo'),
  check('videoUrl').optional()
    .isURL().withMessage('Debe ser una URL válida'),
  check('contenidoTexto').optional(),
  check('imagenUrl').optional()
    .isURL().withMessage('Debe ser una URL válida'),
  check('archivoUrl').optional()
    .isURL().withMessage('Debe ser una URL válida'),
  check('idModulo').optional().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del módulo debe ser un número entero positivo')
    .custom(async (idModulo) => {
      const moduloEnc = await Modulo.findByPk(idModulo);
      if (!moduloEnc) {
        throw new Error("El módulo especificado no existe");
      }
      return true;
    }),
  validateResult
];

const validateGetByIdAndDelete = [
  check('numeroLec').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID de la lección debe ser un número entero positivo')
    .custom(async (numeroLec) => {
      const leccionEnc = await Leccion.findByPk(numeroLec);
      if (!leccionEnc) {
        throw new Error("Lección no encontrada");
      }
      return true;
    }),
  validateResult
];

const validateGetByModulo = [
  check('idModulo').exists().notEmpty()
    .isInt({ min: 1 }).withMessage('El ID del módulo debe ser un número entero positivo')
    .custom(async (idModulo) => {
      const moduloEnc = await Modulo.findByPk(idModulo);
      if (!moduloEnc) {
        throw new Error("Módulo no encontrado");
      }
      return true;
    }),
  validateResult
];

export default { 
  validateCreate, 
  validateUpdate, 
  validateGetByIdAndDelete, 
  validateGetByModulo 
};