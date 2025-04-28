import { Router } from "express";
import bookController from "../controllers/book.controller";
import { authMiddleware } from "../middleware/Auth.middleware";

const router = Router();

router.post("/", authMiddleware, bookController.createBook);

router.get("/", authMiddleware, bookController.getAllBooks); // Obtener todos los libros
router.get("/:id", authMiddleware, bookController.getBookById); // Obtener libro por ID
router.put("/:id", authMiddleware, bookController.updateBook); // Actualizar libro
router.delete("/:id", authMiddleware, bookController.deleteBook); // Eliminar libro
router.get("/user/:userId", authMiddleware, bookController.getBooksByUser); //Obtener libro por el id del usuario

export default router;
