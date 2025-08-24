import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import { Comunidad } from "../models/Comunidad.js";
import { Curso } from "../models/Curso.js";
import { Op } from "sequelize";

const validateCreate = [
  check('titulo').exists().notEmpty(),
  check('idCurso').exists().notEmpty()
  .custom( async (idCurso) => {
    const cursoEnc = await Curso.findByPk(idCurso);
    if(!cursoEnc){
      throw new Error("Curso no encontrado");
    }
    return true;
  } ),
  validateResult
];

const validateUpdate = [
  check('titulo').exists().notEmpty(),
  check('idCurso').exists().notEmpty()
  .custom( async (idCurso) => {
    const comunidadEnc = await Comunidad.findByPk(idCurso);
    if(!comunidadEnc){
      throw new Error("Comunidad no encontrada");
    }
    return true;
  } ),
  validateResult
]

const validateGetByIdAndDelete = [
  check('idCurso').exists().notEmpty()
  .custom( async (idCurso) => {
    const comunidadEnc = await Comunidad.findByPk(idCurso);
    if(!comunidadEnc){
      throw new Error("Comunidad no encontrada");
    }
    return true;
  } ),
  validateResult
]



export default { validateCreate, validateUpdate, validateGetByIdAndDelete };