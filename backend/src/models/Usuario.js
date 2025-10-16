import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Usuario = sequelize.define("Usuario", {
  idUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombreUsuario: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  contrasena: { type: DataTypes.STRING, allowNull: false },
  tipoUsuario: { type: DataTypes.STRING, allowNull: false }, 
  nombreReferido: { type: DataTypes.STRING, allowNull: true }, 
  fotoDePerfil: { type: DataTypes.STRING, allowNull: true },
  banco: { type: DataTypes.STRING, allowNull: true }, 
  cvu: { type: DataTypes.INTEGER, allowNull: true }, 
  alias: { type: DataTypes.STRING, allowNull: true }, 
}, {
  tableName: 'Usuarios',
  timestamps: true
});
