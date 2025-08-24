/* import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import { Curso } from "./Curso.js";

export const Comunidad = sequelize.define("Comunidad", {
  idComunidad: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // si no lo ponemos manualmente se crea solo con un nombre default
  titulo: { type: DataTypes.STRING, allowNull: false }
},{
  tableName: 'Comunidades',
  timestamps: true
});

//Comunidad pertenece a Curso
Comunidad.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
}); */

import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import { Curso } from "./Curso.js";

export const Comunidad = sequelize.define("Comunidad", {
  idCurso: {type: DataTypes.INTEGER, primaryKey: true, 
    references: {
      model: Curso,
      key: "idCurso"
    }
  },
  titulo: { type: DataTypes.STRING, allowNull: false }
},{
  tableName: 'Comunidades',
  timestamps: true
});


Comunidad.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
  onDelete: "CASCADE"
});

Curso.hasOne(Comunidad, { foreignKey: "idCurso" })
