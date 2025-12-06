import { Sequelize } from "sequelize";
import { sequelize } from "../database/sequelize.js";

// Modelos
import { TipoCurso } from "./TipoCurso.js";
import { Comunidad } from "./Comunidad.js";
import { Curso } from "./Curso.js";
import { Leccion } from "./Leccion.js";
import { Usuario } from "./Usuario.js";
import { Modulo } from "./Modulo.js";
import { AlumnoCurso } from "./AlumnoCurso.js";
import { AlumnoLeccion } from "./AlumnoLeccion.js";
import { Publicacion } from "./Publicacion.js";

// Relaciones

// Relaciones TipoCurso -> Curso
TipoCurso.hasMany(Curso, {
  foreignKey: "idTipo",
  sourceKey: "idTipo",
  as: "CursosDelTipo",
});
Curso.belongsTo(TipoCurso, {
  foreignKey: "idTipo",
  targetKey: "idTipo",
  as: "TipoCurso",
});

//Relaciones Usuario (profesor) -> Curso
Curso.belongsTo(Usuario, {
  as: "Profesor",
  foreignKey: "idProfesor",
});
Usuario.hasMany(Curso, {
  as: "CursosCreados",
  foreignKey: "idProfesor",
});

// Relaciones Curso -> Modulo
Curso.hasMany(Modulo, {
  foreignKey: "idCurso",
  sourceKey: "idCurso",
  as: "Modulos",
});
Modulo.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
  as: "CursoDelModulo",
});

// Relaciones Modulo -> Leccion
Modulo.hasMany(Leccion, {
  foreignKey: "idModulo",
  sourceKey: "idModulo",
  as: "Lecciones",
});
Leccion.belongsTo(Modulo, {
  foreignKey: "idModulo",
  targetKey: "idModulo",
  as: "ModuloDeLeccion",
});

// Relación Curso -> Comunidad
Curso.hasOne(Comunidad, {
  foreignKey: "idCurso",
  sourceKey: "idCurso",
  as: "ComunidadDelCurso",
});
Comunidad.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
  as: "CursoDeComunidad",
});

// Relación Comunidad -> Publicacion
Comunidad.hasMany(Publicacion, {
  foreignKey: "idComunidad",
  sourceKey: "idComunidad",
  as: "PublicacionesDeComunidad",
});
Publicacion.belongsTo(Comunidad, {
  foreignKey: "idComunidad",
  targetKey: "idComunidad",
  as: "ComunidadDePublicacion",
});

// Relación Usuario -> Publicacion
Usuario.hasMany(Publicacion, {
  foreignKey: "idUsuario",
  sourceKey: "idUsuario",
  as: "PublicacionesDelUsuario",
});
Publicacion.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  targetKey: "idUsuario",
  as: "UsuarioDePublicacion",
});

// Relación auto-referencial para respuestas
Publicacion.hasMany(Publicacion, {
  as: "Respuestas",
  foreignKey: "idPublicacionPadre",
  onDelete: "CASCADE"
});

Publicacion.belongsTo(Publicacion, {
  as: "PublicacionPadre",
  foreignKey: "idPublicacionPadre"
});


Usuario.belongsToMany(Leccion, {
  through: AlumnoLeccion,
  foreignKey: "idUsuario",
  otherKey: "numeroLec",
  as: "LeccionesProgreso",
});

Leccion.belongsToMany(Usuario, {
  through: AlumnoLeccion,
  foreignKey: "numeroLec",
  otherKey: "idUsuario",
  as: "AlumnosProgreso",
});

AlumnoLeccion.belongsTo(Usuario, { foreignKey: "idUsuario", as: "Usuario" });
AlumnoLeccion.belongsTo(Leccion, { foreignKey: "numeroLec", as: "Leccion" });

// SOLO ESTAS RELACIONES PARA AlumnoCurso:
AlumnoCurso.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  targetKey: "idUsuario",
  as: "Usuario",
});

AlumnoCurso.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
  as: "Curso",
});

Curso.belongsTo(Usuario, {
  foreignKey: "idProfesor",
  targetKey: "idUsuario",
  as: "Creador",
});

const db = {
  sequelize,
  Sequelize,
  TipoCurso,
  Comunidad,
  Curso,
  Leccion,
  Usuario,
  Modulo,
  AlumnoCurso,
  AlumnoLeccion,
  Publicacion
};

export default db;

export { sequelize, Sequelize, TipoCurso, Comunidad, Curso, Leccion, Usuario, Modulo, AlumnoCurso, AlumnoLeccion, Publicacion };
