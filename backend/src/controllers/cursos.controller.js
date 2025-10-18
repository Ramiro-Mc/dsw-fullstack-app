import { Curso } from "../models/Curso.js";
import { Descuento } from "../models/Descuento.js";
import { TipoCurso } from "../models/TipoCurso.js";

export const cursoController = {
  getAllCursos: async (req, res) => {
    try {
      const { idTipo, idProfesor } = req.query;
      let whereClause = {};

      if(idTipo && idTipo !== 0){
        whereClause.idTipo = idTipo;
      }
      if(idProfesor && idProfesor !== 0){
        whereClause.idProfesor = idProfesor
      }

      const allCursos = await Curso.findAll({
        where: whereClause,
        include: [{ model: TipoCurso, as: "TipoCurso" }] 
      });

      if (allCursos.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay cursos",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Cursos enviados",
        contenido: allCursos,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  createCurso: async (req, res) => {
    try {
      const { titulo, descripcion, precio, idTipo, idProfesor, imagen } = req.body; // <--- Agregar imagen

      // Validar que idProfesor esté presente
      if (!idProfesor) {
        return res.status(400).json({
          success: false,
          error: "ID del profesor es requerido"
        });
      }

      const newCurso = await Curso.create({ 
        titulo, 
        descripcion, 
        precio, 
        idTipo, 
        idProfesor, 
        imagen // <--- Incluir imagen en la creación
      });

      res.status(201).json({
        success: true,
        msg: "Curso creado",
        contenido: newCurso,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  updateCurso: async (req, res) => {
    try {
      const { idCurso } = req.params;
      const { titulo, descripcion, precio, idTipo } = req.body;

      const camposAActualizar = {};

      if (titulo) {camposAActualizar.titulo = titulo;}
      if (descripcion) {camposAActualizar.descripcion = descripcion;}
      if (precio) {camposAActualizar.precio = precio;}
      if (idTipo) {camposAActualizar.idTipo = idTipo;}

      await Curso.update(camposAActualizar, { where: { idCurso } });

      const cursoActualizado = await Curso.findByPk(idCurso);

      res.status(200).json({
        success: true,
        msg: "Curso actualizado correctamente",
        contenido: cursoActualizado,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  getCursoById: async (req, res) => {
    try {
      const { idCurso } = req.params;

      const curso = await Curso.findByPk(idCurso, {
        include: [{ model: TipoCurso, as: "TipoCurso" }] // Agregar alias
      });

      res.status(200).json({
        success: true,
        msg: "Curso encontrado",
        informacion: curso,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  agregarDescuento: async(req, res) => {
    try{
      const {idCurso} = req.params;
      const {idDescuento} = req.body;

      const curso = await Curso.findByPk(idCurso);
      const descuento = await Descuento.findByPk(idDescuento);

      if (!curso || !descuento) {
        return res.status(404).json({
          success: false,
          msg: "Curso o descuento no encontrado"
        });
      }

      await curso.addDescuentosDelCurso(descuento); // Usar el alias correcto

      res.status(200).json({
        success: true,
        msg: "Descuento agregado correctamente",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  quitarDescuento: async (req, res) => {
    try{
      const {idCurso} = req.params;
      const {idDescuento} = req.body;

      const curso = await Curso.findByPk(idCurso);
      const descuento = await Descuento.findByPk(idDescuento);

      if (!curso || !descuento) {
        return res.status(404).json({
          success: false,
          msg: "Curso o descuento no encontrado"
        });
      }

      await curso.removeDescuentosDelCurso(descuento); // Usar el alias correcto

      res.status(200).json({
        success: true,
        msg: "Descuento removido correctamente",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  getAllDescuentosCurso: async (req, res) => {
    try{
      const { idCurso } = req.params;

      const curso = await Curso.findByPk(idCurso, {
        include: [{ model: Descuento, as: "DescuentosDelCurso" }] // Usar alias correcto
      });

      res.status(200).json({
        success: true,
        msg: "Descuentos obtenidos correctamente",
        informacion: curso?.DescuentosDelCurso || [] // Usar alias correcto
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    };
  },

  getCursosPendientes: async (req, res) => {
    try {
      const cursosPendientes = await Curso.findAll({
        where: { estado: 'pendiente' },
        include: [{ model: TipoCurso, as: "TipoCurso" }] // Agregar alias
      });

      res.status(200).json({
        success: true,
        msg: "Cursos pendientes encontrados",
        informacion: cursosPendientes
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  aprobarCurso: async (req, res) => {
    try {
      const { idCurso } = req.params;

      await Curso.update(
        { estado: 'aprobado' }, 
        { where: { idCurso, estado: 'pendiente' } }
      );

      const cursoAprobado = await Curso.findByPk(idCurso);

      res.status(200).json({
        success: true,
        msg: "Curso aprobado correctamente",
        contenido: cursoAprobado,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  rechazarCurso: async (req, res) => {
    try {
      const { idCurso } = req.params;
      const { motivo } = req.body;

      await Curso.update(
        { estado: 'rechazado' }, 
        { where: { idCurso, estado: 'pendiente' } }
      );

      res.status(200).json({
        success: true,
        msg: "Curso rechazado correctamente",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  getAllCursosAprobados: async (req, res) => {
    try {

      const { idTipo } = req.query;
      let whereClause = {};

      if(idTipo && idTipo !== 0){
        whereClause.idTipo = idTipo;
      }

      whereClause.estado = 'aprobado';

      const cursosAprobados = await Curso.findAll({
        where: whereClause,
        include: [{ model: TipoCurso, as: "TipoCurso" }] 
      });

      res.status(200).json({
        success: true,
        msg: "Cursos aprobados enviados",
        contenido: cursosAprobados,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },
};