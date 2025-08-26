import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import { TipoCurso } from "../models/TipoCurso.js";
import { Op } from "sequelize";

const validateCreate = [
  check('nombreTipo').exists().notEmpty()
    .custom( async (nombreTipo) => {
      const tipoCursoEnc = await TipoCurso.findOne({ where: {nombreTipo} });
      if (tipoCursoEnc){
        throw new Error("El nombre de tipo curso ya está en uso");
      }
      return true;
    } ),   
  check('descripcion').exists().notEmpty(),
  validateResult
];

const validateUpdate = [
  check('idTipo').exists().notEmpty()
  .custom( async (idTipo) => {
    const tipoCursoEnc = await TipoCurso.findByPk(idTipo);
    if(!tipoCursoEnc){
      throw new Error("Tipo curso no encontrado");
    }
    return true;
  } ),
  check('nombreTipo').optional().notEmpty()
  .custom( async (nombreTipo, { req }) => {
    const tipoCursoEnc = await TipoCurso.findOne({
      where: {
        nombreTipo,
        idTipo: { [Op.ne]: req.params.idTipo }
      }
    });
    if (tipoCursoEnc){
      throw new Error("El nombre de tipo curso ya está en uso");
    }
    return true;
  } ),   
  check('descripcion').optional().notEmpty(),
  validateResult
]

const validateGetByIdAndDelete = [
  check('idTipo').exists().notEmpty()
  .custom( async (idTipo) => {
    const tipoCursoEnc = await TipoCurso.findByPk(idTipo);
    if(!tipoCursoEnc){
      throw new Error("Tipo curso no encontrado");
    }
    return true;
  } ),
  validateResult
]



export default { validateCreate, validateUpdate, validateGetByIdAndDelete };