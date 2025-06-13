import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../model/book/BookEntity';
import { BookRepository } from '../database/repository/BookRepository';

type BookContextType = {
    books: Book[];
    addBook: (book: Omit<Book, 'id'>) => Promise<void>;
    updateBook: (book: Book) => Promise<void>;
    removeBook: (id: number) => Promise<void>;
    setBooks: (books: Book[]) => void;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

const repository = new BookRepository();

export const BookProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const loadBooks = async () => {
            const storedBooks = await repository.findAll();
            setBooks(storedBooks);
        };
        loadBooks();
    }, []);

    const addBook = async (bookData: Omit<Book, 'id'>) => {
        const newBook = await repository.create(bookData);
        setBooks((prev) => [...prev, newBook]);
    };

    const updateBook = async (updatedBook: Book) => {
        const updated = await repository.update(updatedBook.id, updatedBook);
        if (updated) {
            setBooks((prev) =>
                prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
            );
        }
    };

    const removeBook = async (id: number) => {
        const success = await repository.delete(id);
        if (success) {
            setBooks((prev) => prev.filter((book) => book.id !== id));
        }
    };

    return (
        <BookContext.Provider
            value={{ books, addBook, updateBook, removeBook, setBooks }}
        >
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = (): BookContextType => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBookContext deve ser usado dentro de um BookProvider');
    }
    return context;
};
