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
import cors from "cors";

// Configura tus credenciales de Google
const GOOGLE_CLIENT_ID = "15166676259-s0q5g5pkmpsh45111617ae4hqedn9hda.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Busca usuario por email
        let usuario = await Usuario.findOne({ email: profile.emails[0].value });
        if (!usuario) {
          // Si no existe lo crea
          usuario = await Usuario.create({
            nombreUsuario: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        }
        return done(null, usuario);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

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
