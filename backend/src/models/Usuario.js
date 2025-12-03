import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Usuario = sequelize.define("Usuario", {
  idUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombreUsuario: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  contrasena: { type: DataTypes.STRING, allowNull: false },
  tipoUsuario: { type: DataTypes.STRING, allowNull: false }, 
  fotoDePerfil: { type: DataTypes.STRING, allowNull: true },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

  // Datos de banco
  nombreReferido: { type: DataTypes.STRING, allowNull: true }, 
  banco: { type: DataTypes.STRING, allowNull: true }, 
  cvu: { type: DataTypes.STRING, allowNull: true }, 
  alias: { type: DataTypes.STRING, allowNull: true }, 

  // Datos de profesor
  descripcion: { type: DataTypes.STRING, allowNull: true }, 
  fraseDescriptiva: { type: DataTypes.STRING, allowNull: true }, 
  educacion: { type: DataTypes.STRING, allowNull: true }, 
}, {
  tableName: 'Usuarios',
  timestamps: true
});