import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import { Publicacion } from "../models/Publicacion.js";
import { Comunidad } from "../models/Comunidad.js";
import { Usuario } from "../models/Usuario.js";

const validateCreate = [
  check('titulo').exists().notEmpty()
    .withMessage('El título es obligatorio'),
  
  check('contenido').exists().notEmpty()
    .withMessage('El contenido es obligatorio'),
  
  //  Validar idComunidad
  check('idComunidad').exists().notEmpty().isNumeric()
    .withMessage('ID de comunidad es obligatorio y debe ser numérico')
    .custom(async (idComunidad) => {
      const comunidadExiste = await Comunidad.findByPk(idComunidad);
      if (!comunidadExiste) {
        throw new Error("La comunidad especificada no existe");
      }
      return true;
    }),
  
  //  Validar idUsuario
  check('idUsuario').exists().notEmpty().isNumeric()
    .withMessage('ID de usuario es obligatorio y debe ser numérico')
    .custom(async (idUsuario) => {
      const usuarioExiste = await Usuario.findByPk(idUsuario);
      if (!usuarioExiste) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
  
  validateResult
];

const validateUpdate = [
  // Validar que la publicación existe
  check('idPublicacion').exists().notEmpty().isNumeric()
    .withMessage('ID de publicación es obligatorio y debe ser numérico')
    .custom(async (idPublicacion) => {
      const publicacionEnc = await Publicacion.findByPk(idPublicacion);
      if (!publicacionEnc) {
        throw new Error("Publicación no encontrada");
      }
      return true;
    }),
  
  // Campos opcionales para actualización
  check('titulo').optional().notEmpty()
    .withMessage('El título no puede estar vacío si se proporciona'),
  
  check('contenido').optional().notEmpty()
    .withMessage('El contenido no puede estar vacío si se proporciona'),
  
  validateResult
];

const validateGetByIdAndDelete = [
  check('idPublicacion').exists().notEmpty().isNumeric()
    .withMessage('ID de publicación es obligatorio y debe ser numérico')
    .custom(async (idPublicacion) => {
      const publicacionEnc = await Publicacion.findByPk(idPublicacion);
      if (!publicacionEnc) {
        throw new Error("Publicación no encontrada");
      }
      return true;
    }),
  validateResult
];

// Validador para obtener publicaciones por comunidad
const validateGetByComunidad = [
  check('idComunidad').exists().notEmpty().isNumeric()
    .withMessage('ID de comunidad es obligatorio y debe ser numérico')
    .custom(async (idComunidad) => {
      const comunidadExiste = await Comunidad.findByPk(idComunidad);
      if (!comunidadExiste) {
        throw new Error("La comunidad especificada no existe");
      }
      return true;
    }),
  validateResult
];

export default { 
  validateCreate, 
  validateUpdate, 
  validateGetByIdAndDelete,
  validateGetByComunidad 
};