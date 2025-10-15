import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const AlumnoLeccion = sequelize.define("AlumnoLeccion", {
  idAlumnoLeccion: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  idUsuario: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "Usuarios", key: "idUsuario" }
  },
  numeroLec: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "Lecciones", key: "numeroLec" }
  },
  completado: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
  fechaCompletado: { 
    type: DataTypes.DATE, 
    allowNull: true 
  }
}, {
  tableName: 'AlumnoLecciones',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['idUsuario', 'numeroLec'] // Un alumno solo puede tener un registro por lección
    }
  ]
});