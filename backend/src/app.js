import express from "express";
import tipoCursoRoutes from "./routes/tipoCurso.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import descuentosRoutes from "./routes/descuento.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import comunidadRoutes from "./routes/comunidad.routes.js";
import cors from "cors";


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use(tipoCursoRoutes);
app.use(cursosRoutes);
app.use(comunidadRoutes);
app.use(descuentosRoutes);
app.use(usuarioRoutes);

export default app;
