import app from "./app.js";
import { sequelize } from "./database/sequelize.js";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
app.use(morgan("dev"));

import db from "./models/allModels.js"; // Importar el objeto db con todos los modelos

async function main() {
  try {
    await sequelize.sync({ force: false }); // force: false para no eliminar la base de datos si ya existe
    console.log("Database connected successfully");
    app.set("port",process.env.PORT);
    app.listen(process.env.PORT);
    console.log("El servidor esta corriendo en el puerto: " + app.get("port"));
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
  }
}

main();
