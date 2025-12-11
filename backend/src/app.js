import express from "express";
import jwt from "jsonwebtoken";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import tipoCursoRoutes from "./routes/tipoCurso.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import comunidadRoutes from "./routes/comunidad.routes.js";
import publicacionRoutes from "./routes/publicacion.routes.js";
import cursoDetalleRoutes from "./routes/cursoDetalle.routes.js";
import modulosRoutes from "./routes/modulo.routes.js";
import leccionRoutes from "./routes/leccion.routes.js";
import loginRoutes from "./routes/login.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import nuevosCursosRoutes from "./routes/nuevosCursos.routes.js";
import alumnoLeccionRoutes from "./routes/alumnoLeccion.routes.js";
import alumnoCursoRoutes from "./routes/alumnos_cursos.routes.js"; 
import routerPagos from "./routes/pagos.routes.js";
import { pagoController } from "./controllers/pagos.controller.js";

import db from "./models/allModels.js";

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const app = express();  

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // URLs del frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.post(
  "/pagos/webhook",
  express.raw({ type: "application/json" }),
  pagoController.webhook
);

// Middlewares (DESPUÉS del webhook)
app.use(express.json());

// Rutas con /api
app.use("/api", cursosRoutes);
app.use("/api", routerPagos); 
app.use("/api/admin", adminRoutes);

// Rutas de autenticación
app.use("/", loginRoutes);

// Otras rutas (sin /api)
app.use(tipoCursoRoutes);
app.use(comunidadRoutes);
app.use(usuarioRoutes);
app.use(publicacionRoutes);
app.use(cursoDetalleRoutes);
app.use(modulosRoutes);
app.use(leccionRoutes);
app.use(nuevosCursosRoutes);
app.use(alumnoLeccionRoutes);
app.use(alumnoCursoRoutes);

export default app;