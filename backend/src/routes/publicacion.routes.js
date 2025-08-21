import { Router } from "express";

const routerPublicacion = Router();

routerPublicacion.get("/publicaciones", (req, res) => {});
routerPublicacion.post("/publicaciones", (req, res) => {});
routerPublicacion.put("/publicaciones/:idPublicacion", (req, res) => {});
routerPublicacion.delete("/publicaciones/:idPublicacion", (req, res) => {});
routerPublicacion.get("/publicaciones/:idPublicacion", (req, res) => {});

export default routerPublicacion;