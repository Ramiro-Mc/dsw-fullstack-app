import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Publicacion = sequelize.define("Publicacion", {
  idPublicacion: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  idComunidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Comunidades", 
      key: "idComunidad"
    }
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: "Usuarios",
      key: "idUsuario"
    }
  },
  idPublicacionPadre: {
    type: DataTypes.INTEGER,
    allowNull: true, // NULL si es publicación principal, ID si es respuesta
    references: {
      model: "Publicaciones",
      key: "idPublicacion"
    }
  },
  titulo: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  contenido: { 
    type: DataTypes.TEXT,
    allowNull: false 
  },
  fechaPublicacion: { 
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW 
  }
}, {
  tableName: 'Publicaciones', 
  timestamps: true
});