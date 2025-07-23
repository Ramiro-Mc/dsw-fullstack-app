import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const Descuento = sequelize.define("Descuento", {
  idDescuento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaDesde: { type: DataTypes.DATE, allowNull: false },
  fechahasta: { type: DataTypes.DATE, allowNull: false },
  porcentaje: { type: DataTypes.INTEGER, allowNull: false },
});

/* terminado */
