import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import {Modulo} from "../models/Modulo.js";
import {Curso} from "../models/Curso.js";

const validateCreate = [
    check('idModulo').exists().isNumeric(),
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
    check('idModulo').exists().notEmpty()
    .custom( async (idModulo) => {
        const moduloEnc = await Modulo.findByPk(idModulo);
        if(!moduloEnc){
            throw new Error("Modulo no encontrado");
        }
        return true;
    } ),
    check('idModulo').exists().isNumeric(),
    check('titulo').exists().notEmpty(),
    check('idCurso').exists().notEmpty()
    .custom( async (idCurso) => {
        const cursoEnc = await Curso.findByPk(idCurso);
        if(!cursoEnc){
            throw new Error("El curso seleccionado ya pertenece a la leccion");
        }
        return true;
    } ),
    validateResult
]

const validateGetByIdAndDelete = [
    check('idModulo').exists().notEmpty()
    .custom( async (idModulo) => {
      const moduloEnc = await Modulo.findByPk(idModulo);
      if(!moduloEnc){
        throw new Error("Modulo no encontrado");
      }
      return true;
    } ),
    validateResult
]



export {validateCreate, validateUpdate, validateGetByIdAndDelete};