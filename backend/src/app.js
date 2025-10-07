import express from "express";
import tipoCursoRoutes from "./routes/tipoCurso.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import descuentosRoutes from "./routes/descuento.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import comunidadRoutes from "./routes/comunidad.routes.js";
import publicacionRoutes from "./routes/publicacion.routes.js";
import cursoDetalleRoutes from "./routes/cursoDetalle.routes.js";
import modulosRoutes from "./routes/modulo.routes.js"
import leccionRoutes from "./routes/leccion.routes.js"
import loginRoutes from "./routes/login.routes.js";
import adminRoutes from './routes/admin.routes.js';
import cors from "cors";


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/", loginRoutes);

// Rutas
app.use(tipoCursoRoutes);
app.use(cursosRoutes);
app.use(comunidadRoutes);
app.use(descuentosRoutes);
app.use(usuarioRoutes);
app.use(publicacionRoutes);
app.use(cursoDetalleRoutes);
app.use(modulosRoutes);
app.use(leccionRoutes);
app.use("/api/admin", adminRoutes); 


export default app;
