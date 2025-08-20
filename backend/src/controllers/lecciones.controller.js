import { Leccion } from "../models/Leccion.js";

export const leccionController = {
  getAllLecciones: async (req, res) => {
    try {
      const allLecciones = await Leccion.findAll();

      if (allLecciones.length === 0) {
        return res.status(404).json({
          success: false,
          msg: "No hay lecciones",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Lecciones enviadas",
        contenido: allLecciones,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getLeccionById: async (req, res) => {
    try {
      const { idLeccion } = req.params;
      const leccion = await Leccion.findByPk(idLeccion);

      if (!leccion) {
        return res.status(404).json({
          success: false,
          msg: "No hay lecciones",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Lecciones enviadas",
        contenido: allLecciones,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createLeccion: async (req, res) => {
    try {
      const { numeroLec, tituloLec, descripcionLec, estadoLec, horasLec, idModulo } = req.body;

      if (!idCurso || !titulo || !precio || !idTipo) {
        return res.status(400).json({
          success: false,
          msg: "No se ingresaron todos los datos necesarios"
        });
      }

      const newCurso = await Curso.create({
        idCurso: idCurso,
        titulo: titulo,
        descripcion: descripcion,
        precio: precio,
        idTipo: idTipo,
      });

      res.status(201).json({
        success: true,
        msg: "Curso creado",
        contenido: newCurso,
      });

      console.log(newCurso); // Para ver el curso creado en la consola
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        msg: "Error al crear el curso",
      });
    }
  },

  updateCurso: async (req, res) => {
    try {
      const { idCurso } = req.params;
      const { titulo, descripcion, precio } = req.body;

      const curso = await Curso.findByPk(idCurso);

      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "curso no encontrado",
        });
      }

      if (!titulo && !descripcion && !precio) {
        return res.status(404).json({
          success: false,
          msg: "No hay informacion para actualizar",
        });
      }

      await Curso.update(
        { titulo, descripcion, precio },
        { where: { idCurso } }
      );

      res.status(200).json({
        success: true,
        msg: "Curso actualizado correctamente",
        atributo: curso,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getCursoById: async (req, res) => {
    try {
      const { idCurso } = req.params;
      const curso = await Curso.findByPk(idCurso);

      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Curso encontrado",
        informacion: curso,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteCurso: async (req, res) => {
    try {
      const { idCurso } = req.params;

      const deleted = await Curso.destroy({
        where: { idCurso: idCurso },
      });

      if (deleted === 0) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Curso eliminado correctamente",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        msg: "Error al eliminar el curso",
      });
    }
  },
};
