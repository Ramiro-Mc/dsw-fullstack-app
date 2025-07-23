import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Comunidad = sequelize.define("Comunidad", {
  idCurso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
});

/* terminado */
