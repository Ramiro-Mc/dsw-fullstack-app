import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { sequelize } from "./database/sequelize.js";
import morgan from "morgan";

// Importar modelos individuales
import { TipoCurso } from "./models/TipoCurso.js";
import { Usuario } from "./models/Usuario.js";
import { Comunidad } from "./models/Comunidad.js";
import { Descuento } from "./models/Descuento.js";
import { Publicidad } from "./models/Publicidad.js";
import { Curso } from "./models/Curso.js";
import { Modulo } from "./models/Modulo.js";
import { Leccion } from "./models/Leccion.js";
import { Publicacion } from "./models/Publicacion.js";

// Importar relaciones (esto debe ir después de importar los modelos)
import db from "./models/allModels.js";

app.use(morgan("dev"));

async function main() {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log("Database connected successfully");
    
    // Desactivar restricciones de claves foráneas temporalmente
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Sincronizar modelos en el orden correcto (padres antes que hijos)
    console.log("Sincronizando TipoCurso...");
    await TipoCurso.sync({ force: false });
    
    console.log("Sincronizando Usuario...");
    await Usuario.sync({ force: false });
    
    console.log("Sincronizando Descuento...");
    await Descuento.sync({ force: false });
    
    console.log("Sincronizando Publicidad...");
    await Publicidad.sync({ force: false });
    
    console.log("Sincronizando Curso...");
    await Curso.sync({ force: false });
    
    console.log("Sincronizando Modulo...");
    await Modulo.sync({ force: false });
    
    console.log("Sincronizando Leccion...");
    await Leccion.sync({ force: false });
    
    console.log("Sincronizando Comunidad...");
    await Comunidad.sync({ force: false });
    
    console.log("Sincronizando Publicacion...");
    await Publicacion.sync({ force: false });
    
    //falta agregar unas tablas mas
    
    // Reactivar restricciones de claves foráneas
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log("Database synchronized successfully");
    
    // Configurar y iniciar el servidor
    app.set("port", process.env.PORT || 3000);
    app.listen(process.env.PORT || 3000);
    console.log("El servidor esta corriendo en el puerto: " + app.get("port"));
    
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
  }
}

main();
