import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const CursoDescuento = sequelize.define("CursoDescuento", {
  idCurso: { type: DataTypes.INTEGER, references: { model: "Curso", key: "idCurso" } },
  idDescuento: { type: DataTypes.INTEGER, references: { model: "Descuento", key: "idDescuento" } }
});