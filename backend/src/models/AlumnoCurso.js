import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const AlumnoCurso = sequelize.define("AlumnoCurso", {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: "Usuarios", key: "idUsuario" }
  },
  idCurso: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    references: { model: "Cursos", key: "idCurso" }
  },
  fechaCompra: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  precioCompra: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  metodoPago: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'mercadopago'
  },
  estadoPago: {
    type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
    allowNull: false,
    defaultValue: 'pendiente'
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true 
  }
}, {
  tableName: 'AlumnosCursos',
  timestamps: true
});