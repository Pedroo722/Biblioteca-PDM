import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
  const db = SQLite.openDatabaseSync('library.db');
  return db;
};

const createTables = (db: SQLite.SQLiteDatabase) => {
  const createBooksTable = `
    CREATE TABLE IF NOT EXISTS Books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      autor TEXT NOT NULL,
      status TEXT NOT NULL,
      editora TEXT NOT NULL,
      isbn TEXT NOT NULL,
      ano TEXT NOT NULL,
      sinopse TEXT
    );
  `;

  const createClientsTable = `
    CREATE TABLE IF NOT EXISTS Clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      address TEXT NOT NULL
    );
  `;

  const createLoansTable = `
    CREATE TABLE IF NOT EXISTS Loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      fine TEXT,
      loanDate TEXT NOT NULL,
      returnDate TEXT NOT NULL,
      returnDateReal TEXT,
      status TEXT NOT NULL
    );
  `;

  db.execSync(createBooksTable);
  db.execSync(createClientsTable);
  db.execSync(createLoansTable);
};

export const loadDatabase = () => {
  const db = openDatabase();
  createTables(db);
};