import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Usuario = sequelize.define("Usuario", {
  idUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombreUsuario: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  contrasena: { type: DataTypes.STRING, allowNull: false },
  tipoUsuario: { type: DataTypes.STRING, allowNull: false }, 
  fotoDePerfil: { type: DataTypes.STRING, allowNull: false }, 
}, {
  tableName: 'Usuarios',
  timestamps: true
});
