import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

import { Curso } from "./Curso.js";

export const Leccion = sequelize.define("Leccion", {
  numeroLec: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  idCurso: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  tituloLec: { type: DataTypes.STRING, allowNull: false },
  descripcionLec: { type: DataTypes.STRING },
  estadoLec: { type: DataTypes.STRING },
  horasLec: { type: DataTypes.INTEGER },
});

Leccion.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
});

Curso.hasMany(Leccion, {
  foreignKey: "idCurso",
  sourceKey: "idCurso",
});
