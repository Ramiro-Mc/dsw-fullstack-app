import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";


const validateCreate = [
  check('nombreUsuario')
    .exists()
    .notEmpty(),   
  check('email')
    .exists()
    .isEmail(),
  check('contrasena')
    .exists()
    .notEmpty(),
  check('tipoUsuario')
    .exists()
    .notEmpty(),
  validateResult
];

export default validateCreate;