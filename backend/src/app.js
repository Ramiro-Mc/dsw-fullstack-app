import express from "express";
import jwt from 'jsonwebtoken';
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
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
import nuevosCursosRoutes from './routes/nuevosCursos.routes.js';
import alumnoLeccionRoutes from './routes/alumnoLeccion.routes.js';
import cors from "cors";
import routerPagos from './routes/pagos.routes.js';

// Importar modelos con asociaciones
import db from "./models/allModels.js";

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// IMPORTANTE: Rutas específicas PRIMERO
app.use("/api", cursosRoutes);
app.use('/api', routerPagos);  // ← MOVER ESTO AL PRINCIPIO

app.use("/api/admin", adminRoutes);

// Rutas de autenticación
app.use("/", loginRoutes);

// Otras rutas (sin /api)
app.use(tipoCursoRoutes);
app.use(comunidadRoutes);
app.use(descuentosRoutes);
app.use(usuarioRoutes);
app.use(publicacionRoutes);
app.use(cursoDetalleRoutes);
app.use(modulosRoutes);
app.use(leccionRoutes);
app.use(nuevosCursosRoutes);
app.use(alumnoLeccionRoutes);

// app.use(nuevosCursos);
app.use('/api', routerPagos);
app.use("/api/admin", adminRoutes); 


export default app;