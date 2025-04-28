import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { authMiddleware } from "../middleware/Auth.middleware";

const router = Router();
const authController = new AuthController();

router.post("/auth/register", (req, res) => authController.register(req, res));
router.post("/auth/login", (req, res) => authController.login(req, res));
router.post("/auth/decode", (req, res) => authController.decodeToken(req, res));

export default router;
