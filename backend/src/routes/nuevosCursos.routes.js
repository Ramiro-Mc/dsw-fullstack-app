import { Router } from 'express';
import { crearCursoCompleto, obtenerTiposCurso, subirImagenCurso } from '../controllers/nuevosCursos.controller.js';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const routerNuevosCursos = Router();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar almacenamiento para imágenes de cursos
const storageCourseImages = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "course-images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Configurar almacenamiento para videos de lecciones
const storageLessonVideos = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "course-videos",
    allowed_formats: ["mp4", "avi", "mov", "wmv"],
    resource_type: "video",
  },
});

// Configurar almacenamiento para imágenes de lecciones
const storageLessonImages = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "course-lesson-images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Configurar almacenamiento para archivos de lecciones
const storageLessonFiles = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "course-files",
    allowed_formats: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "zip", "rar"],
    resource_type: "raw",
  },
});

const uploadCourseImage = multer({ storage: storageCourseImages });
const uploadLessonVideo = multer({ storage: storageLessonVideos });
const uploadLessonImage = multer({ storage: storageLessonImages });
const uploadLessonFile = multer({ storage: storageLessonFiles });

routerNuevosCursos.get('/tipos-curso', obtenerTiposCurso);
routerNuevosCursos.post('/nuevosCursos/upload-imagen', uploadCourseImage.single("imagenCurso"), subirImagenCurso);
routerNuevosCursos.post('/cursos', crearCursoCompleto);

//rutas para multimedia de lecciones
routerNuevosCursos.post('/lecciones/upload-video', uploadLessonVideo.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        msg: "No se proporcionó un video válido." 
      });
    }

    res.json({ 
      success: true, 
      msg: "Video subido correctamente.", 
      url: req.file.path 
    });
  } catch (error) {
    console.error("Error al subir el video:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Error al subir el video." 
    });
  }
});

routerNuevosCursos.post('/lecciones/upload-imagen', uploadLessonImage.single("imagen"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        msg: "No se proporcionó una imagen válida." 
      });
    }

    res.json({ 
      success: true, 
      msg: "Imagen subida correctamente.", 
      url: req.file.path 
    });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Error al subir la imagen." 
    });
  }
});

routerNuevosCursos.post('/lecciones/upload-archivo', uploadLessonFile.single("archivo"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        msg: "No se proporcionó un archivo válido." 
      });
    }

    res.json({ 
      success: true, 
      msg: "Archivo subido correctamente.", 
      url: req.file.path 
    });
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Error al subir el archivo." 
    });
  }
});

export default routerNuevosCursos;