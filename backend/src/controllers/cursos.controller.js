import { Curso } from "../models/Curso.js";

export const cursoController={

    getAllCursos: async(req, res) => {

        try{

            const allCursos = await Curso.findAll() ;

            if(allCursos.length === 0){
                return res.status(404).json({
                    success: false,
                    msg: "No hay cursos"
                })
            }

            res.status(200).json({
                success: true,
                msg: "Cursos enviados",
                contenido: allCursos
            })
            
        }catch (error) {
            console.log(error.message)
        }
        
    },
    
    
    createCurso: async(req, res) => {
        
        try{
            
            const { idCurso, titulo, descripcion, precio, idTipo} = req.body
            
            const newCurso = await Curso.create({ 
                idCurso: idCurso,
                titulo: titulo,
                descripcion: descripcion,
                precio: precio,
                idTipo: idTipo
            });

            Curso.status(201).json({
                success: true,
                msg: "Curso creado",
                contenido: newCurso
            })    
            console.log(newCurso); // Para ver el curso creado en la consola
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                msg: "Error al crear el curso"
            });
        }
    },
    
    updateCurso: async (req, res) => {
        try{
            const { idCurso } = req.params;
            const { titulo, descripcion, precio} = req.body;

            if (!idCurso) {
                return res.status(400).json({
                    success: false,
                    msg: "Falta el ID del curso"
                });
            }

            const curso = await Curso.findByPk(idCurso);

            if (!idCurso && !titulo && !descripcion && !precio) {
                return res.status(404).json({
                    success: false,
                    msg: "No hay informacion para actualizar"
                });
            }

            await Curso.update({ titulo, descripcion, precio});

            res.status(200).json({
                success: true,
                msg: "Curso actualizado correctamente",
                data: curso
            });

        } catch (error) {

            console.log(error.message);

        }

    },
    
    getCursoById: async (req, res) => {

        try{

            const { idCurso } = req.params;
            const curso = await Curso.findByPk(id);

            if (!curso){

                return res.status(404).json({
                    successs: false,
                    msg: "Curso no encontrado"
                });
            }

        } catch (error) {
            console.log(error.message);
            next(error);
        }

    },
    
    deleteCurso: async (req, res) => {
        try {
            
            const { idCurso } = req.params;

            const deleted = await Curso.destroy({
            where: { idCurso: idCurso }
            });

            if (deleted === 0) {
                return res.status(404).json({
                    success: false,
                    msg: "Curso no encontrado"
                });
            }

            res.status(200).json({
            success: true,
            msg: "Curso eliminado correctamente"
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
            success: false,
            msg: "Error al eliminar el curso"
            });
        }
    }
}



// export const getCursos = (req, res) => {
//     res.send("Get Cursos");
// };

// export const createCurso = (req, res) => {
//     res.send("Create Curso");
