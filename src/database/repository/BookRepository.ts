import * as SQLite from 'expo-sqlite';
import { Book } from '../../model/book/BookEntity';

export class BookRepository {
    private db: SQLite.SQLiteDatabase;

    constructor() {
        this.db = SQLite.openDatabaseSync('library.db');
    }
    
    async create(book: Omit<Book, 'id'>): Promise<Book> {
        const result = await this.db.runAsync(
        `INSERT INTO Books (titulo, autor, status, editora, isbn, ano, sinopse)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [book.titulo, book.autor, book.status, book.editora, book.isbn, book.ano, book.sinopse]
        );

        const id = result.lastInsertRowId!;
        return { ...book, id };
    }

    async findAll(): Promise<Book[]> {
        const result = await this.db.getAllAsync<Book>(`SELECT * FROM Books`);
        return result;
    }

    async findById(id: number): Promise<Book | undefined> {
        const result = await this.db.getFirstAsync<Book>(`SELECT * FROM Books WHERE id = ?`, [id]);
        return result ?? undefined;
    }

    async update(id: number, updatedBook: Partial<Book>): Promise<Book | null> {
        const keys = Object.keys(updatedBook);
        if (keys.length === 0) return null;

        const fields = keys.map(key => `${key} = ?`).join(', ');
        const values = keys.map(key => (updatedBook as any)[key]);
        values.push(id);

        const result = await this.db.runAsync(`UPDATE Books SET ${fields} WHERE id = ?`, values);
        return result.changes > 0 ? { ...updatedBook, id } as Book : null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.db.runAsync(`DELETE FROM Books WHERE id = ?`, [id]);
        return result.changes > 0;
    }
}