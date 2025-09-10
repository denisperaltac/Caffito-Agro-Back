import { Router } from "express";
import * as authController from "../../controllers/auth.controller.js";
import { authenticateToken } from "../../middlewares/auth.middleware.js";
import {
  validateLogin,
  validateRegister,
} from "../../middlewares/validation.middleware.js";

const router = Router();

// Rutas públicas
router.post("/login", validateLogin, authController.login);
router.post("/register", validateRegister, authController.register);
router.post("/refresh", authController.refresh);

// Rutas protegidas
router.post("/logout", authenticateToken, authController.logout);
router.get("/me", authenticateToken, authController.me);

export default router;
