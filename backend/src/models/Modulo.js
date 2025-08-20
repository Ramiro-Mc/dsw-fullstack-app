import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Modulo = sequelize.define("Modulo", {
    idModulo:{type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    idCurso: { type: DataTypes.INTEGER, allowNull: false, references: {model: "Curso", key: "idCurso"}},
    titulo: { type: DataTypes.STRING, allowNull: false },
});


