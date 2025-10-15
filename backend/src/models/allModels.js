import { Sequelize } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

// Modelos
import {TipoCurso} from './TipoCurso.js';
import {Comunidad} from './Comunidad.js';
import {Curso} from './Curso.js';
import {Descuento} from './Descuento.js';
import {Leccion} from './Leccion.js';
import {Publicidad} from './Publicidad.js';
import {Usuario} from './Usuario.js';
import {Modulo} from './Modulo.js';
import { AlumnoCurso } from './Alumnos_Cursos.js';
import { AlumnoLeccion } from "./AlumnoLeccion.js";

// Relaciones

// Relaciones TipoCurso -> Curso
TipoCurso.hasMany(Curso, {
  foreignKey: "idTipo",
  sourceKey: "idTipo",
  as: "CursosDelTipo" // Cambiar para evitar conflictos
});
Curso.belongsTo(TipoCurso, {
  foreignKey: "idTipo",
  targetKey: "idTipo",
  as: "TipoCurso"
});

//Relaciones Usuario (profesor) -> Curso
Curso.belongsTo(Usuario, { 
  as: "Profesor",
  foreignKey: "idProfesor" 
});
Usuario.hasMany(Curso, { 
  as: "CursosCreados",
  foreignKey: "idProfesor" 
});

// Un usuario (alumno) puede comprar muchos cursos
Usuario.belongsToMany(Curso, 
  { through: AlumnoCurso, 
    as: "CursosComprados", // Cambiar a PascalCase
    foreignKey: "idUsuario" 
  });
Curso.belongsToMany(Usuario, 
  { through: AlumnoCurso, 
    as: "Alumnos", // Cambiar a PascalCase
    foreignKey: "idCurso" 
  });

// Relaciones Curso -> Modulo
Curso.hasMany(Modulo, {
  foreignKey: "idCurso",
  sourceKey: "idCurso",
  as: "Modulos"
});
Modulo.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
  as: "CursoDelModulo" // Cambiar para ser más específico
});

// Relaciones Modulo -> Leccion
Modulo.hasMany(Leccion, {
  foreignKey: "idModulo",
  sourceKey: "idModulo",
  as: "Lecciones"
});
Leccion.belongsTo(Modulo, {
  foreignKey: "idModulo",
  targetKey: "idModulo",
  as: "ModuloDeLeccion" // Cambiar para ser más específico
});

// Relación Curso -> Comunidad
Curso.hasOne(Comunidad, {
  foreignKey: "idCurso",
  sourceKey: "idCurso",
  as: "ComunidadDelCurso" // Cambiar para evitar conflictos
});
Comunidad.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
  as: "CursoDeComunidad" // Cambiar para evitar conflictos
});

// Relación Curso -> Descuento
Curso.belongsToMany(Descuento, { 
  through: "CursoDescuento", 
  foreignKey: "idCurso",
  as: "DescuentosDelCurso" // Cambiar para evitar conflictos
});
Descuento.belongsToMany(Curso, { 
  through: "CursoDescuento", 
  foreignKey: "idDescuento",
  as: "CursosConDescuento" // Cambiar para evitar conflictos
});


Usuario.belongsToMany(Leccion, { 
  through: AlumnoLeccion, 
  foreignKey: 'idUsuario',
  otherKey: 'numeroLec',
  as: 'LeccionesProgreso'
});

Leccion.belongsToMany(Usuario, { 
  through: AlumnoLeccion, 
  foreignKey: 'numeroLec', 
  otherKey: 'idUsuario',
  as: 'AlumnosProgreso'
});

AlumnoLeccion.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'Usuario' });
AlumnoLeccion.belongsTo(Leccion, { foreignKey: 'numeroLec', as: 'Leccion' });

const db = {
  sequelize,
  Sequelize,
  TipoCurso,
  Comunidad,
  Curso,
  Descuento,
  Leccion,
  Publicidad,
  Usuario,
  Modulo,
  AlumnoCurso,
  AlumnoLeccion
};


export default db;