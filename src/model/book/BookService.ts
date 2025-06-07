import { Book } from './BookEntity';
import { BookRepository } from '../../database/repository/BookRepository';

class BookService {
  private repository = new BookRepository();

  async create(book: Omit<Book, 'id'>): Promise<Book> {
    return await this.repository.create(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Book | undefined> {
    return await this.repository.findById(id);
  }

  async update(id: number, updatedBook: Partial<Book>): Promise<Book | null> {
    return await this.repository.update(id, updatedBook);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

export const bookService = new BookService();