import { Router } from "express";
import { usuarioController } from "../controllers/usuarios.controller.js";
import usuarioValidator from "../validators/usuarios.js"
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const routerUsuario = Router();

routerUsuario.get("/usuarios", usuarioController.getAllUsuarios);
routerUsuario.post("/usuarios", usuarioValidator.validateCreate,  usuarioController.createUsuario);
routerUsuario.put("/usuarios/:idUsuario", usuarioValidator.validateUpdate, usuarioController.updateUsuario);
routerUsuario.delete("/usuarios/:idUsuario", usuarioValidator.validateGetByIdAndDelete, usuarioController.deleteUsuario);
routerUsuario.get("/usuarios/:idUsuario", usuarioValidator.validateGetByIdAndDelete, usuarioController.getUsuarioById);
// routerUsuario.post("/login", usuarioController.loginUsuario); 

// Manejo de foto de perfil con Cloudinary

// Configurar Cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar almacenamiento con multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile-images", // Carpeta en Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// Agregar validator a esto

routerUsuario.put("/usuarios/:idUsuario/foto", upload.single("fotoDePerfil"), usuarioController.updateFotoDePerfil);


export default routerUsuario;

