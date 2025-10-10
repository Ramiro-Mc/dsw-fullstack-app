import { Curso } from "../models/Curso.js";
import { Descuento } from "../models/Descuento.js";

export const cursoController = {
  getAllCursos: async (req, res) => {
    try {
      const allCursos = await Curso.findAll();

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
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  createCurso: async (req, res) => {
    try {
      const { titulo, descripcion, precio, idTipo } = req.body;

      const newCurso = await Curso.create({ titulo, descripcion, precio, idTipo });

      res.status(201).json({
        success: true,
        msg: "Curso creado",
        contenido: newCurso,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
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
        atributo: cursoActualizado,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  getCursoById: async (req, res) => {
    try {
      const { idCurso } = req.params;

      const curso = await Curso.findByPk(idCurso);

      res.status(200).json({
        success: true,
        msg: "Curso encontrado",
        informacion: curso,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  // deleteCurso: async (req, res) => { //USAMOS BAJA LOGICA
  //   try {
  //     const { idCurso } = req.params;

  //     await Curso.destroy({where: { idCurso: idCurso }});

  //     res.status(200).json({
  //       success: true,
  //       msg: "Curso eliminado correctamente",
  //     });

  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       success: false,
  //       msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
  //         ? error.message 
  //         : "Error interno del servidor",
  //     });
  //   }
  // },

  agregarDescuento: async(req, res) => {
    try{

    const {idCurso} = req.params;
    const {idDescuento} = req.body;

    const curso = Curso.findByPk(idCurso);
    const descuento = Descuento.findByPk(idDescuento);

    await curso.addDescuento(descuento);

    res.status(200).json({
      success: true,
      msg: "Descuento agregado correctamente",
    });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },

  quitarDescuento: async (req, res) => {
    try{

    const {idCurso} = req.params;
    const {idDescuento} = req.body;

      const curso = Curso.findByPk(idCurso);
      const descuento = Descuento.findByPk(idDescuento);

      await curso.removeDescuento(descuento);

      res.status(200).json({
        success: true,
        msg: "Descuento removido correctamente",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
          ? error.message 
          : "Error interno del servidor",
      });
    }
  },


  getAllDescuentosCurso: async (req, res) => {
    try{

      const { idCurso } = req.params;

      const curso = await Curso.findByPk(idCurso, {
        include: Descuento
      });

      res.status(200).json({
        success: true,
        msg: "Descuento removido correctamente",
        informacion: curso.Descuento
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
        include: [TipoCurso] 
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
        msg: process.env.NODE_ENV === "development" //si estas en entorno de desarrollador te muestra el error, si estas del lado de cliente solo te dice que hubo un error interno
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
      const { motivo } = req.body; // Opcional: para guardar el motivo del rechazo

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

  // Modificar getAllCursos para que solo muestre aprobados en el frontend público
  getAllCursosAprobados: async (req, res) => {
    try {
      const cursosAprobados = await Curso.findAll({
        where: { estado: 'aprobado' }
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
