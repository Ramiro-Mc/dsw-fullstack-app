import { Sequelize } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

// Modelos
import {Comunidad} from './Comunidad.js';
import {Curso} from './Curso.js';
import {Descuento} from './Descuento.js';
import {Leccion} from './Leccion.js';
import {Publicidad} from './Publicidad.js';
import {TipoCurso} from './TipoCurso.js';
import {Usuario} from './Usuario.js';

// Relaciones
Leccion.belongsTo(Curso, {
  foreignKey: "idCurso",
  targetKey: "idCurso",
});

Curso.hasMany(Leccion, {
  foreignKey: "idCurso",
  sourceKey: "idCurso",
});

TipoCurso.hasMany(Curso, {
  foreignKey: "idTipo",
  sourceKey: "idTipo",
});

Curso.belongsTo(TipoCurso, {
  foreignKey: "idTipo",
  targetKey: "idTipo",
});


const db = {
  sequelize,
  Sequelize,
  Comunidad,
  Curso,
  Descuento,
  Leccion,
  Publicidad,
  TipoCurso,
  Usuario,
};

export default db;