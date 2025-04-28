import { AppDataSource } from "../config/database";
import BookRepository from "../repositories/book.repository";
import { Book } from "../entities/book.entity";

class BookService {
  private bookRepository = new BookRepository(AppDataSource);

  async createBook(bookData: Partial<Book>): Promise<Book> {
    return this.bookRepository.createBook(bookData);
  }

  async getBookById(id: number): Promise<Book | null> {
    return this.bookRepository.getById(id);
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.getAllBooks();
  }

  async getBooksByUser(userId: number): Promise<Book[]> {
    return this.bookRepository.getBooksByUser(userId);
  }

  async updateBook(id: number, newData: Partial<Book>): Promise<Book> {
    return this.bookRepository.updateBook(id, newData);
  }

  async deleteBook(id: number): Promise<void> {
    return this.bookRepository.deleteBook(id);
  }
}

export default new BookService();
