import express from "express";
import cursosRoutes from "./routes/cursos.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();

// Middlewares
app.use(express.json()); 

// Rutas
app.use(cursosRoutes);
app.use(usuarioRoutes);

export default app;
