import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../model/book/BookEntity';
import { Client } from '../model/client/ClientEntity';
import { Loan } from '../model/loan/LoanEntity';

// Keys para AsyncStorage
const BOOKS_KEY = '@books';
const CLIENTS_KEY = '@clients';
const LOANS_KEY = '@loans';

// --- Books ---

export const saveBooks = async (books: Book[]) => {
  await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
};

export const loadBooks = async (): Promise<Book[]> => {
  const json = await AsyncStorage.getItem(BOOKS_KEY);
  return json ? JSON.parse(json) : [];
};

export const addBook = async (book: Book) => {
  const books = await loadBooks();
  books.push(book);
  await saveBooks(books);
};

export const updateBook = async (updatedBook: Book) => {
  const books = await loadBooks();
  const index = books.findIndex(b => b.id === updatedBook.id);
  if (index >= 0) {
    books[index] = updatedBook;
    await saveBooks(books);
  }
};

export const deleteBook = async (id: number) => {
  let books = await loadBooks();
  books = books.filter(b => b.id !== id);
  await saveBooks(books);
};

// --- Clients ---

export const saveClients = async (clients: Client[]) => {
  await AsyncStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};

export const loadClients = async (): Promise<Client[]> => {
  const json = await AsyncStorage.getItem(CLIENTS_KEY);
  return json ? JSON.parse(json) : [];
};

export const addClient = async (client: Client) => {
  const clients = await loadClients();
  clients.push(client);
  await saveClients(clients);
};

export const updateClient = async (updatedClient: Client) => {
  const clients = await loadClients();
  const index = clients.findIndex(c => c.id === updatedClient.id);
  if (index >= 0) {
    clients[index] = updatedClient;
    await saveClients(clients);
  }
};

export const deleteClient = async (id: number) => {
  let clients = await loadClients();
  clients = clients.filter(c => c.id !== id);
  await saveClients(clients);
};

// --- Loans ---

export const saveLoans = async (loans: Loan[]) => {
  await AsyncStorage.setItem(LOANS_KEY, JSON.stringify(loans));
};

export const loadLoans = async (): Promise<Loan[]> => {
  const json = await AsyncStorage.getItem(LOANS_KEY);
  return json ? JSON.parse(json) : [];
};

export const addLoan = async (loan: Loan) => {
  const loans = await loadLoans();
  loans.push(loan);
  await saveLoans(loans);
};

export const updateLoan = async (updatedLoan: Loan) => {
  const loans = await loadLoans();
  const index = loans.findIndex(l => l.id === updatedLoan.id);
  if (index >= 0) {
    loans[index] = updatedLoan;
    await saveLoans(loans);
  }
};

export const deleteLoan = async (id: number) => {
  let loans = await loadLoans();
  loans = loans.filter(l => l.id !== id);
  await saveLoans(loans);
};

// --- Carregar Database ---

export const loadDatabase = async () => {
  const books = await loadBooks();
  const clients = await loadClients();
  const loans = await loadLoans();
  return { books, clients, loans };
};
