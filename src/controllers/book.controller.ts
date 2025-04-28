import { Request, Response } from "express";
import bookService from "../services/book.service";
import { BaseController } from "../core/common/BaseControllers";

class BookController extends BaseController {
  // Crear un libro

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await bookService.createBook(req.body);
      this.sendSuccess(res, "libro creado", book);
    } catch (error: any) {
      //res.status(400).json({ message: error.message });
      //usando el basecontroller mejor
      this.sendError(res, error.message, 400);
    }
  }

  // Obtener todos los libros
  async getAllBooks(req: Request, res: Response): Promise<void> {
    const books = await bookService.getAllBooks();
    res.json(books);
  }

  // Obtener un libro por ID
  async getBookById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const book = await bookService.getBookById(id);

    if (!book) {
      //res.status(404).json({ message: "Libro no encontrado" });
      this.sendError(res, "libro no encontrado", 404);
    } else {
      res.json(book);
    }
  }

  // Obtener libros por ID de usuario
  async getBooksByUser(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId);

    try {
      const books = await bookService.getBooksByUser(userId);
      res.json(books);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Actualizar un libro
  async updateBook(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      const updatedBook = await bookService.updateBook(id, req.body);
      res.json(updatedBook);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  // Eliminar un libro
  async deleteBook(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      await bookService.deleteBook(id);
      res.json({ message: "Libro eliminado correctamente" });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new BookController();
