import app from "./app.js";
import dotenv from "dotenv";
import { sequelize } from "./database/sequelize.js";
import morgan from "morgan";

// import "./models/Curso.js";
// import "./models/TipoCurso.js"; // estos 2 imports despues van a estar en la carpeta de routes

dotenv.config();

app.use(morgan("dev"));

// app.set("port",process.env.PORT) ; 
// app.listen(process.env.PORT);
// console.log("Server is running on port "+app.get("port"));

async function main() {
  try {
    await sequelize.sync({ force: false }); // force: false para no eliminar la base de datos si ya existe
    console.log("Database connected successfully");
    app.listen(3000);
    console.log("Server is running on port 3000");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();