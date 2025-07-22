import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';
// import { Sequelize } from 'sequelize';


export const Curso = sequelize.define('Curso', {
    idCurso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idTipo:{ type: DataTypes.INTEGER, primaryKey: false, allowNull: false, references: { model: 'TipoCurso', key: 'idTipo' }},
    titulo:{ type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING},
    precio: { type: DataTypes.FLOAT, allowNull: false }
});

// Curso.sync({ force: true }) // esto es para crear la tabla en la base de datos, si no existe

/* Terminado */ 

