import { Router } from "express";
import { authenticateToken } from "../../middlewares/auth.middleware.js";
import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";
import animalsRouter from "./animals.routes.js";
import productosRouter from "./productos.routes.js";
import dietasRouter from "./dietas.routes.js";
import sanidadRouter from "./sanidad.routes.js";
import reproduccionRouter from "./reproduccion.routes.js";
import historialDietasRouter from "./historialDietas.routes.js";
import corralesRouter from "./corrales.routes.js";

const router = Router();

// Rutas de autenticación (públicas)
router.use("/auth", authRouter);

// Todas las demás rutas requieren autenticación
router.use(authenticateToken);

// Rutas protegidas
router.use("/users", usersRouter);
router.use("/animales", animalsRouter);
router.use("/productos", productosRouter);
router.use("/dietas", dietasRouter);
router.use("/sanidad", sanidadRouter);
router.use("/reproduccion", reproduccionRouter);
router.use("/historial-dietas", historialDietasRouter);
router.use("/corrales", corralesRouter);

export default router;
