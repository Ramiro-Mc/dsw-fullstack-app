import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import { TipoCurso } from "./TipoCurso.js";
import { Usuario } from "./Usuario.js";

export const Curso = sequelize.define("Curso", {
  idCurso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idProfesor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "idUsuario"
    }
  },
  idTipo: {
    type: DataTypes.INTEGER, 
    primaryKey: false, 
    allowNull: false, 
    references: { 
      model: TipoCurso,
      key: "idTipo" 
    }
  },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  estado: { 
    type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'), 
    allowNull: false,
    defaultValue: 'pendiente'
  },
  imagen: { type: DataTypes.STRING },
  descuento: { type: DataTypes.INTEGER, allowNull: false,
  defaultValue: 0 },
}, {
  tableName: 'Cursos',
  timestamps: true
});

