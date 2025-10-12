import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const AlumnoCurso = sequelize.define("AlumnoCurso", {
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Usuarios",
      key: "idUsuario"
    }
  },
  idCurso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Cursos",
      key: "idCurso"
    }
  }
}, {
  tableName: "Alumno_Cursos",
  timestamps: false
});