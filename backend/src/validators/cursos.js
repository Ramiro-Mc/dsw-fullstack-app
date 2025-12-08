import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import {Curso} from "../models/Curso.js";
import { Op } from "sequelize";

const validateCreate = [
  check('titulo').exists().notEmpty()
    .custom( async (titulo) => {
      const cursoEnc = await Curso.findOne({ 
        where: {
          titulo,
          estado: { [Op.ne]: 'eliminado' }
        } 
      });
      if (cursoEnc){
        throw new Error("El titulo ya está en uso");
      }
      return true;
    } ),   
  check('descripcion').exists().notEmpty(),
  check('precio').notEmpty().isNumeric(),
  check('idTipo').exists().notEmpty(),
  validateResult
];

const validateUpdate = [
  check('idCurso').exists().notEmpty()
  .custom( async (idCurso) => {
    const cursoEnc = await Curso.findOne({
      where: {
        idCurso,
        estado: { [Op.ne]: 'eliminado' }
      }
    });
    if(!cursoEnc){
      throw new Error("Curso no encontrado");
    }
    return true;
  } ),
  check('titulo').optional().notEmpty()
  .custom( async (titulo, { req }) => {
    const cursoEnc = await Curso.findOne({
      where: {
        titulo,
        idCurso: { [Op.ne]: req.params.idCurso },
        estado: { [Op.ne]: 'eliminado' }
      }
    });
    if (cursoEnc){
      throw new Error("El titulo ya está en uso");
    }
    return true;
  } ),   
  check('descripcion').optional().notEmpty(),
  check('precio').optional().notEmpty().isNumeric(),
  check('descuento').optional().isNumeric(),
  check('idTipo').optional().notEmpty(),
  validateResult
]

const validateGetByIdAndDelete = [
  check('idCurso').exists().notEmpty()
  .custom( async (idCurso) => {
    const cursoEnc = await Curso.findByPk(idCurso);
    if(!cursoEnc){
      throw new Error("Curso no encontrado");
    }
    return true;
  } ),
  validateResult
]

export default { validateCreate, validateUpdate, validateGetByIdAndDelete };