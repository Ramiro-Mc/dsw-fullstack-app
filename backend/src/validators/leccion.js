import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import {Leccion} from "../models/Leccion.js";
import {Modulo} from "../models/Modulo.js";

const validateCreate = [
  check('numeroLec').exists().isNumeric(),
  check('tituloLec').exists().notEmpty(),
  check('descripcionLec').exists().notEmpty(),
  check('estadoLec').exists().isBoolean(),
  check('horasLec').exists().isNumeric(),
  check('idModulo').exists().notEmpty()
  .custom( async (idModulo) => {
    const moduloEnc = await Modulo.findByPk(idModulo);
    if(!moduloEnc){
      throw new Error("Modulo no encontrado");
    }
    return true;
  } ),
  validateResult
];

const validateUpdate = [
  check('idLeccion').exists().notEmpty()
    .custom( async (idLeccion) => {
      const leccionEnc = await Leccion.findByPk(idLeccion);
      if(!leccionEnc){
        throw new Error("Leccion no encontrada");
      }
      return true;
    } ),
  check('numeroLec').exists().isNumeric(),
  check('tituloLec').exists().notEmpty(),
  check('descripcionLec').exists().notEmpty(),
  check('estadoLec').exists().isBoolean(),
  check('horasLec').exists().isNumeric(),
  check('idModulo').exists().notEmpty()
  .custom( async (idModulo) => {
    const moduloEnc = await Modulo.findByPk(idModulo);
    if(moduloEnc){
      throw new Error("El modulo seleccionado ya pertenece a la leccion");
    }
    return true;
  } ),
  validateResult
]

const validateGetByIdAndDelete = [
  check('idLeccion').exists().notEmpty()
    .custom( async (idLeccion) => {
      const leccionEnc = await Leccion.findByPk(idLeccion);
      if(!leccionEnc){
        throw new Error("Leccion no encontrada");
      }
      return true;
    } ),
  validateResult
]



export default { validateCreate, validateUpdate, validateGetByIdAndDelete };