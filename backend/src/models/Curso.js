import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Curso = sequelize.define("Curso", {
  idCurso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idTipo: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    allowNull: false,
    references: { model: "TipoCurso", key: "idTipo" },
  },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  precio: { type: DataTypes.FLOAT, allowNull: false },
});

//El .then es para que despues creada la comunidad, se asocie al Curso
import("./Comunidad.js").then(({ Comunidad }) => {
  
  Curso.hasOne(Comunidad, {
    foreignKey: "idCurso",
    sourceKey: "idCurso",
  });
});


