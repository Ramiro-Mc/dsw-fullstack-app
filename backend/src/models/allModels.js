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

// Relaciones

// Relaciones TipoCurso -> Curso
TipoCurso.hasMany(Curso, {
  foreignKey: "idTipo",
  sourceKey: "idTipo",
});
Curso.belongsTo(TipoCurso, {
  foreignKey: "idTipo",
  targetKey: "idTipo",
});


//Relaciones Usuario (profesor) -> Curso
Curso.belongsTo(Usuario, { 
  as: "profesor", 
  foreignKey: "idProfesor" 
});
Usuario.hasMany(Curso, { 
  as: "cursos", 
  foreignKey: "idProfesor" 
});

// Un usuario (alumno) puede comprar muchos cursos
Usuario.belongsToMany(Curso, 
  { through: AlumnoCurso, 
    as: "cursosComprados", 
    foreignKey: "idUsuario" 
  });
Curso.belongsToMany(Usuario, 
  { through: AlumnoCurso, 
    as: "alumnos", 
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
});

// Relaciones Modulo -> Leccion
Modulo.hasMany(Leccion, {
  foreignKey: "idModulo",
  sourceKey: "idModulo",
});
Leccion.belongsTo(Modulo, {
  foreignKey: "idModulo",
  targetKey: "idModulo",
});

// Relación Curso -> Comunidad
Curso.hasOne(Comunidad, {
  foreignKey: "idCurso",
  sourceKey: "idCurso",
});
Comunidad.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",


});

Curso.belongsToMany(Descuento, { through: "CursoDescuento", foreignKey: "idCurso" });
Descuento.belongsToMany(Curso, { through: "CursoDescuento", foreignKey: "idDescuento" });

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
  Modulo
};

export default db;