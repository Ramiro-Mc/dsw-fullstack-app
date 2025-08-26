import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import { Publicacion } from "../models/Publicacion.js";

const validateCreate = [
  check('titulo').exists().notEmpty(),
  check('contenido').exists().notEmpty(),
  check('comentarios').exists().notEmpty(),
  check('fechaPublicacion').exists().isDate(),
  validateResult
];

const validateUpdate = [
  check('idPublicacion').exists().notEmpty()
  .custom( async (idPublicacion) => {
    const publicacionEnc = await Publicacion.findByPk(idPublicacion);
    if(!publicacionEnc){
      throw new Error("Publicacion no encontrada");
    }
    return true;
  } ),
  check('titulo').optional().notEmpty(),
  check('contenido').optional().notEmpty(),
  check('comentarios').optional().notEmpty(),
  check('fechaPublicacion').optional().isDate(),
  validateResult
]

const validateGetByIdAndDelete = [
  check('idPublicacion').exists().notEmpty()
  .custom( async (idPublicacion) => {
    const publicacionEnc = await Publicacion.findByPk(idPublicacion);
    if(!publicacionEnc){
      throw new Error("Publicacion no encontrada");
    }
    return true;
  } ),
  validateResult
]



export default { validateCreate, validateUpdate, validateGetByIdAndDelete };