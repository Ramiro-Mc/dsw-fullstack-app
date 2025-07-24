import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import { Curso } from "./Curso.js";

export const Comunidad = sequelize.define("Comunidad", {
  titulo: { type: DataTypes.STRING, allowNull: false }
});

//Comunidad pertenece a Curso
Comunidad.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
});

/* terminado */
