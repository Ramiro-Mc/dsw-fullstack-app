import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Leccion = sequelize.define("Leccion", {
  numeroLec: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  idModulo: { type: DataTypes.INTEGER, allowNull: false, references: {model: "Modulos", key: "idModulo"}},
  tituloLec: { type: DataTypes.STRING, allowNull: false },
  descripcionLec: { type: DataTypes.STRING },
  estadoLec: { type: DataTypes.STRING },
  horasLec: { type: DataTypes.INTEGER },  
  videoUrl: { type: DataTypes.STRING },
  contenidoTexto: { type: DataTypes.TEXT },
  imagenUrl: { type: DataTypes.STRING },
  archivoUrl: { type: DataTypes.STRING },
  completado: { type: DataTypes.BOOLEAN, defaultValue: false },
},{
  tableName: 'Lecciones',
    timestamps: true
});


