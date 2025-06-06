import { Book } from './BookEntity';

class BookService {
  private books: Book[] = [];
  private nextId = 1;

  create(book: Omit<Book, 'id'>): Book {
    const newBook = { ...book, id: this.nextId++ };
    this.books.push(newBook);
    return newBook;
  }

  findAll(): Book[] {
    return this.books;
  }

  findById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  update(id: number, updatedBook: Partial<Book>): Book | null {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return null;

    this.books[index] = { ...this.books[index], ...updatedBook };
    return this.books[index];
  }

  delete(id: number): boolean {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return false;

    this.books.splice(index, 1);
    return true;
  }
}

export const bookService = new BookService();