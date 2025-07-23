import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
// import { Sequelize } from 'sequelize';

export const Publicidad = sequelize.define(
  "Publicidad",
  {
    fechaDesde: { type: DataTypes.DATE, allowNull: false },
    fechaHasta: { type: DataTypes.DATE, allowNull: false },
    precioDia: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    // Atributo derivado
    getterMethods: {
      costoTotal() {
        const dias = Math.ceil(
          (this.fechaHasta - this.fechaDesde) / (1000 * 60 * 60 * 24)
        );
        return dias * this.precioDia;
      },
    },
  }
);
