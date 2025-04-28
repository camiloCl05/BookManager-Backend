import { Book } from "../entities/book.entity";
import { Repository, DataSource } from "typeorm";

class BookRepository {
  private repository: Repository<Book>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Book);
  }

  async getById(id: number): Promise<Book | null> {
    return this.repository.findOne({ where: { id }, relations: ["user"] });
  }

  async createBook(bookData: Partial<Book>): Promise<Book> {
    const newBook = this.repository.create(bookData);
    return this.repository.save(newBook);
  }

  async updateBook(id: number, newData: Partial<Book>): Promise<Book> {
    const book = await this.getById(id);
    if (!book) throw new Error("Libro no encontrado.");

    Object.assign(book, newData);
    return this.repository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.getById(id);
    if (!book) throw new Error("Libro no encontrado.");

    await this.repository.delete(id);
  }

  async getBooksByUser(userId: number): Promise<Book[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  }

  async getAllBooks(): Promise<Book[]> {
    return this.repository.find({ relations: ["user"] });
  }
}

export default BookRepository;
