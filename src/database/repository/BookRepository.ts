import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../../model/book/BookEntity';

const STORAGE_KEY = 'books';

export class BookRepository {
    private async getAllBooks(): Promise<Book[]> {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    private async saveAllBooks(books: Book[]): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }

    async create(book: Omit<Book, 'id'>): Promise<Book> {
        const books = await this.getAllBooks();
        const id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
        const newBook: Book = { ...book, id };
        books.push(newBook);
        await this.saveAllBooks(books);
        return newBook;
    }

    async findAll(): Promise<Book[]> {
        return this.getAllBooks();
    }

    async findById(id: number): Promise<Book | undefined> {
        const books = await this.getAllBooks();
        return books.find(book => book.id === id);
    }

    async update(id: number, updatedBook: Partial<Book>): Promise<Book | null> {
        const books = await this.getAllBooks();
        const index = books.findIndex(b => b.id === id);
        if (index === -1) return null;

        const updated = { ...books[index], ...updatedBook };
        books[index] = updated;
        await this.saveAllBooks(books);
        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const books = await this.getAllBooks();
        const filtered = books.filter(book => book.id !== id);
        const deleted = filtered.length !== books.length;
        if (deleted) {
            await this.saveAllBooks(filtered);
        }
        return deleted;
    }
}
