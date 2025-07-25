import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
// import { Sequelize } from 'sequelize';

import { Curso } from "./Curso.js";

export const TipoCurso = sequelize.define("TipoCurso", {
  idTipo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombreTipo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
});



