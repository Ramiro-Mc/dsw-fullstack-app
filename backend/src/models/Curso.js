import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import { TipoCurso } from "./TipoCurso.js";

export const Curso = sequelize.define("Curso", {
  idCurso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idTipo: {
    type: DataTypes.INTEGER, 
    primaryKey: false, 
    allowNull: false, 
    references: { 
      model: "TipoCursos", // Cambiado para que coincida con el tableName
      key: "idTipo" 
    }
  },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  precio: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: 'Cursos',
  timestamps: true
});


