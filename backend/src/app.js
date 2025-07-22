import express from "express";
import cursosRoutes from "./routes/cursos.routes.js";


const app = express();

// Middlewares
app.use(express.json()); 

app.use(cursosRoutes);

export default app;
