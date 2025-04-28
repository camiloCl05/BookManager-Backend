import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/Auth.middleware";

const router = Router();

// router.post("/", userController.createUser); // Crear usuario //Este ya existe en el AuthService
router.get("/", authMiddleware, userController.getAllUsers); // Obtener todos
router.get("/:id", authMiddleware, userController.getUserById); // Obtener por ID
router.delete("/:id", authMiddleware, userController.deleteUser); // Eliminar

export default router;
