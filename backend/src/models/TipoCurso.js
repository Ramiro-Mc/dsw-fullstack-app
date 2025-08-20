import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const TipoCurso = sequelize.define("TipoCurso", {
  idTipo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombreTipo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
}, {
  tableName: 'TipoCursos',
  timestamps: true
});



