import express from "express";
import cursosRoutes from "./routes/cursos.routes.js";
import descuentosRoutes from "./routes/descuento.routes.js";


const app = express();

// Middlewares
app.use(express.json()); 

app.use(cursosRoutes);
app.use(descuentosRoutes);

export default app;
