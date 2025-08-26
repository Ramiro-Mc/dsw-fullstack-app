import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import { Publicidad } from "../models/Publicidad.js";

const validateCreate = [
  check('fechaDesde').exists().isDate(),
  check('fechaHasta').exists().isDate(),
  check('precioDia').exists().isNumeric(),
  check('costoTotal').exists().isNumeric(),
  validateResult
];

const validateUpdate = [
  check('idPublicidad').exists().notEmpty()
  .custom( async (idPublicidad) => {
    const publicidadEnd = await Publicidad.findByPk(idPublicidad);
    if(!publicidadEnd){
      throw new Error("Publicidad no encontrada");
    }
    return true;
  } ),
  check('fechaDesde').exists().isDate(),
  check('fechaHasta').exists().isDate(),
  check('precioDia').exists().isNumeric(),
  check('costoTotal').exists().isNumeric(),
  validateResult
]

const validateGetByIdAndDelete = [
  check('idPublicidad').exists().notEmpty()
  .custom( async (idPublicidad) => {
    const publicidadEnd = await Publicidad.findByPk(idPublicidad);
    if(!publicidadEnd){
      throw new Error("Publicidad no encontrada");
    }
    return true;
  } ),
  validateResult
]



export default { validateCreate, validateUpdate, validateGetByIdAndDelete };