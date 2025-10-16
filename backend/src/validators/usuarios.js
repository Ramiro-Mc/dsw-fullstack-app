import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";
import {Usuario} from "../models/Usuario.js";
import { Op } from "sequelize";

const validateCreate = [
  check('nombreUsuario').exists().notEmpty()
    .custom( async (nombreUsuario) => {
      const usuarioEnc = await Usuario.findOne({ where: {nombreUsuario} });
      if (usuarioEnc){
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    } ),   
  check('email').exists().notEmpty().isEmail()
    .custom( async (email) => {
      const emailEnc = await Usuario.findOne({ where: {email} });
      if (emailEnc) {
        throw new Error("El email ya está en uso");
      }
      return true;
    } ),
  check('contrasena').exists().notEmpty(),
  check('tipoUsuario').exists().notEmpty(),
  validateResult
];

const validateUpdate = [
  check('idUsuario').exists().notEmpty()
  .custom( async (idUsuario) => {
    const usuarioEnc = await Usuario.findByPk(idUsuario);
    if(!usuarioEnc){
      throw new Error("Usuario no encontrado");
    }
    return true;
  } ),
  check('nombreUsuario').optional().notEmpty()
  .custom( async (nombreUsuario, { req }) => {
    const usuarioEnc = await Usuario.findOne({
      where: {
        nombreUsuario,
        idUsuario: { [Op.ne]: req.params.idUsuario }
      }
    });
    if (usuarioEnc){
      throw new Error("El nombre de usuario ya está en uso");
    }
    return true;
  } ),   
  check('email').optional().notEmpty().isEmail()
    .custom( async (email, { req }) => {
      const emailEnc = await Usuario.findOne({
        where: {
          email,
          idUsuario: { [Op.ne]: req.params.idUsuario }
        }
      });
      if (emailEnc) {
        throw new Error("El email ya está en uso");
      }
      return true;
    } ),
  check('contrasena').optional().notEmpty(),
  check('fotoDePerfil').optional().notEmpty(),
  validateResult
]

const validateGetByIdAndDelete = [
  check('idUsuario').exists().notEmpty()
  .custom( async (idUsuario) => {
    const usuarioEnc = await Usuario.findByPk(idUsuario);
    if(!usuarioEnc){
      throw new Error("Usuario no encontrado");
    }
    return true;
  } ),
  validateResult
]



export default { validateCreate, validateUpdate, validateGetByIdAndDelete };