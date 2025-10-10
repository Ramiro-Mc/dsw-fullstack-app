import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Modulo = sequelize.define("Modulo", {
    idModulo:{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    idCurso: { type: DataTypes.INTEGER, allowNull: false, references: {model: "Cursos", key: "idCurso"}},
    titulo: { type: DataTypes.STRING, allowNull: false },
});


