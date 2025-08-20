import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Leccion = sequelize.define("Leccion", {
  numeroLec: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  idModulo: { type: DataTypes.INTEGER, allowNull: false, references: {model: "Modulo", key: "idModulo"}},
  tituloLec: { type: DataTypes.STRING, allowNull: false },
  descripcionLec: { type: DataTypes.STRING },
  estadoLec: { type: DataTypes.STRING },
  horasLec: { type: DataTypes.INTEGER },
},{
  tableName: 'Lecciones',
    timestamps: true
});


