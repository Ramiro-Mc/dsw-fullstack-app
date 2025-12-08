import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Comunidad = sequelize.define("Comunidad", {
  idComunidad: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  idCurso: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    unique: true, // Un curso solo puede tener una comunidad
    references: {
      model: "Cursos", 
      key: "idCurso"
    }
  },
  titulo: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
}, {
  tableName: 'Comunidades',
  timestamps: true
});