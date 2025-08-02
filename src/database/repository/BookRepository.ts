import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Book } from '../../model/book/BookEntity';
import { authFetch } from '../../libs/ApiService';
import { SyncQueue } from '../../libs/SyncQueue';

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

        const isConnected = await NetInfo.fetch().then(res => res.isConnected);
        const body = new URLSearchParams({
            titulo: newBook.titulo,
            autor: newBook.autor,
            status: newBook.status,
            editora: newBook.editora,
            isbn: newBook.isbn,
            ano: newBook.ano,
            sinopse: newBook.sinopse
        });

        if (isConnected) {
            await authFetch('/books/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            }).catch(() => {
                SyncQueue.addRequest({
                    method: 'POST',
                    endpoint: '/books/create',
                    body: body.toString(),
                });
            });
        } else {
            await SyncQueue.addRequest({
                method: 'POST',
                endpoint: '/books/create',
                body: body.toString(),
            });
        }

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

        const isConnected = await NetInfo.fetch().then(res => res.isConnected);
        const body = new URLSearchParams({
            titulo: updated.titulo,
            autor: updated.autor,
            status: updated.status,
            editora: updated.editora,
            isbn: updated.isbn,
            ano: updated.ano,
            sinopse: updated.sinopse
        });

        if (isConnected) {
            await authFetch(`/books/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            }).catch(() => {
                SyncQueue.addRequest({
                    method: 'PUT',
                    endpoint: `/books/update/${id}`,
                    body: body.toString(),
                });
            });
        } else {
            await SyncQueue.addRequest({
                method: 'PUT',
                endpoint: `/books/update/${id}`,
                body: body.toString(),
            });
        }

        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const books = await this.getAllBooks();
        const filtered = books.filter(book => book.id !== id);
        const deleted = filtered.length !== books.length;
        if (deleted) {
            await this.saveAllBooks(filtered);

            const isConnected = await NetInfo.fetch().then(res => res.isConnected);
            if (isConnected) {
                await authFetch(`/books/delete/${id}`, {
                    method: 'DELETE',
                }).catch(() => {
                    SyncQueue.addRequest({
                        method: 'DELETE',
                        endpoint: `/books/delete/${id}`,
                    });
                });
            } else {
                await SyncQueue.addRequest({
                    method: 'DELETE',
                    endpoint: `/books/delete/${id}`,
                });
            }
        }
        return deleted;
    }
}
