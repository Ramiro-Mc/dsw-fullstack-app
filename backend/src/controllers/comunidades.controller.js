import Category from "../models/Comunidad.js";

const comunidadesController = {

  // Buscar todos

  getAllCategories: async (req, res, next) => {
      try {
          const allCategories = await Category.findAll({
              where: {
                  disabled: false
              }
          });

          if (!allCategories) {
              return res.status(404).json({
                  success: false,
                  msg: "Categorías no encontradas"
              });
          }

          res.status(200).json({
              success: true,
              msg: "Todas las categorias fueron envidas",
              data: allCategories
          })
      } catch (error) {
          console.log(error.message)
          next(error);
      }
  },
  getCategoryById: async (req, res, next) => {
      try {
          const { id } = req.params;
          if (!id) {
              return res.status(400).json({
                  success: false,
                  msg: "Falta el ID de la categoría"
              });
          }
          
          const category = await Category.findByPk(id, {
              where: {
                  disabled: false
              }
          });

          if (!category) {
              return res.status(404).json({
                  success: false,
                  msg: "Categoría no encontrada"
              });
          }

          res.status(200).json({
              success: true,
              msg: "Categoría encontrada",
              data: category
          });
      } catch (error) {
          console.log(error.message);
          next(error);
      }
  },
  createCategory: async (req, res, next) => {
      try {
          const { name, img } = req.body;
          if (!name || !img) {
              return res.status(400).json({
                  success: false,
                  msg: "Faltan campos obligatorios"
              });
          }
          const newCategory = await Category.create({ name, img });

          res.status(200).json({
              success: true,
              msg: "Categoría creada con éxito",
              data: newCategory
          });
      } catch (error) {
          console.log(error.message);
          next(error);
      }
  },

  updateCategory: async (req, res, next) => {
      try {
          const { id } = req.params;
          const { name, img } = req.body;
          
          if (!id) {
              return res.status(400).json({
                  success: false,
                  msg: "Falta el ID de la categoría"
              });
          }

          if (!name && !img) {
              return res.status(400).json({
                  success: false,
                  msg: "No hay información para actualizar"
              });
          }

          const category = await Category.findByPk(id);
          if (!category) {
              return res.status(404).json({
                  success: false,
                  msg: "Categoría no encontrada"
              });
          }

          await category.update({ name, img });

          res.status(200).json({
              success: true,
              msg: "Categoría actualizada correctamente",
              data: category
          });
      } catch (error) {
          console.log(error.message);
          next(error);
      }
  },
  statusCategory: async (req, res) => {
      try {
          const { id } = req.params;
          const { disabled } = req.body;

          if (!id) {
              return res.status(400).json({
                  success: false,
                  msg: "Falta el ID de la categoría"
              });
          }

          if (disabled === undefined) {
              return res.status(400).json({
                  success: false,
                  msg: "Falta el estado de la categoría"
              });
          }

          const category = await Category.findByPk(id);
          if (!category) {
              return res.status(404).json({
                  success: false,
                  msg: "Categoría no encontrada"
              });
          }

          await category.update({ disabled });

          res.status(200).json({
              success: true,
              msg: `Estado de la categoría actualizado a ${disabled ? 'deshabilitada' : 'habilitada'}`,
              data: category
          });
      } catch (error) {
          console.error(error.message);
          next(error);
      }
  }
};

export default categoriesController;
