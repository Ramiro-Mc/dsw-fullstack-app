import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import { Comunidad} from "./Comunidad.js";
 
export const Publicacion = sequelize.define("Publicacion", {
  idPublicacion: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
  titulo: {type: DataTypes.STRING, allowNull: false},
  contenido: { type: DataTypes.STRING, allowNull: false },
  fechaPublicacion: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'Publicacion',
  timestamps: true
});
