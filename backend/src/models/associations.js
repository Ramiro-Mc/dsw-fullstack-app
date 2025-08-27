import { Curso } from "./Curso.js";
import { Descuento } from "./Descuento.js";

export const applyAssociations = () => {
  Curso.belongsToMany(Descuento, { through: "CursoDescuento", foreignKey: "idCurso" });
  Descuento.belongsToMany(Curso, { through: "CursoDescuento", foreignKey: "idDescuento" });
};
