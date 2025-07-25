import express from "express";
import cursosRoutes from "./routes/cursos.routes.js";
import descuentosRoutes from "./routes/descuento.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import comunidadRoutes from "./routes/comunidad.routes.js";
import tipoCursoRoutes from "./routes/tipoCurso.routes.js";

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use(cursosRoutes);
app.use(descuentosRoutes);
app.use(usuarioRoutes);
app.use(comunidadRoutes);
app.use(tipoCursoRoutes);

export default app;
