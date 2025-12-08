import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import {Descuento} from "../models/Descuento.js";

const validateCreate = [
  check('fechaDesde').exists().isDate(),
  check('fechahasta').notEmpty().isDate(),
  check('porcentaje')
    .exists().isNumeric()
    .custom((value) => value > 0 && value < 100)
    .withMessage("El porcentaje debe ser mayor a 0 y menor a 100"),
  validateResult
];

const validateUpdate = [
  check('idDescuento').exists().notEmpty()
    .custom( async (idDescuento) => {
      const descuentoEnc = await Descuento.findByPk(idDescuento);
      if(!descuentoEnc){
        throw new Error("Descuento no encontrado");
      }
      return true;
    } ),
  check('fechaDesde').exists().isDate(),
  check('fechahasta').notEmpty().isDate(),
  check('porcentaje')
    .exists().isNumeric()
    .custom((value) => value > 0 && value < 101)
    .withMessage("El porcentaje debe ser mayor a 0 y menor a 100"),
  validateResult
]

const validateGetByIdAndDelete = [
  check('idDescuento').exists().notEmpty()
  .custom( async (idDescuento) => {
    const descuentoEnc = await Descuento.findByPk(idDescuento);
    if(!descuentoEnc){
      throw new Error("Descuento no encontrado");
    }
    return true;
  } ),
  validateResult
]



export default { validateCreate, validateUpdate, validateGetByIdAndDelete };