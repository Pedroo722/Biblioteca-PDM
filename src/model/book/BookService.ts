import { Book } from './BookEntity';

class BookService {
  private books: Book[] = [];

  create(book: Book): Book {
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }

  findById(id: string): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  update(id: string, updatedBook: Partial<Book>): Book | null {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) {
      return null;
    }

    this.books[index] = { ...this.books[index], ...updatedBook };
    return this.books[index];
  }

  delete(id: string): boolean {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) {
      return false;
    }

    this.books.splice(index, 1);
    return true;
  }
}

export const bookService = new BookService();