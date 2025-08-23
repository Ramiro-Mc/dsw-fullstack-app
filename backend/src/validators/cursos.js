import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";


const validateCreate = [
  check('titulo')
    .exists()
    .notEmpty(),   
  check('descripcion')
    .exists()
    .notEmpty(),
  check('precio')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('idTipo')
    .exists()
    .notEmpty(),
  validateResult
];

export default validateCreate;
