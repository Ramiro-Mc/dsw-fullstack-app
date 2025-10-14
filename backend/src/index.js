import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { sequelize } from "./database/sequelize.js";
import morgan from "morgan";

// Solo importar allModels que ya tiene todas las asociaciones
import db from "./models/allModels.js";

app.use(morgan("dev"));

async function main() {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log("Database connected successfully");
    
    // Desactivar restricciones de claves foráneas temporalmente
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Sincronizar todos los modelos de una vez
    await sequelize.sync({ force: false });
    
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