import * as SQLite from 'expo-sqlite';
import { Loan } from '../../model/loan/LoanEntity';

export class LoanRepository {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync('library.db');
  }

  async create(loan: Omit<Loan, 'id'>): Promise<Loan> {
    const result = await this.db.runAsync(
      `INSERT INTO Loans (title, name, email, fine, loanDate, returnDate, returnDateReal, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        loan.title,
        loan.name,
        loan.email,
        loan.fine,
        loan.loanDate,
        loan.returnDate,
        loan.returnDateReal,
        loan.status,
      ]
    );
    const id = result.lastInsertRowId!;
    return { ...loan, id };
  }

  async findAll(): Promise<Loan[]> {
    const result = await this.db.getAllAsync<Loan>(`SELECT * FROM Loans`);
    return result;
  }

  async findById(id: number): Promise<Loan | undefined> {
    const result = await this.db.getFirstAsync<Loan>(`SELECT * FROM Loans WHERE id = ?`, [id]);
    return result ?? undefined;
  }

  async update(id: number, updatedLoan: Partial<Loan>): Promise<Loan | null> {
    const keys = Object.keys(updatedLoan);
    if (keys.length === 0) return null;

    const fields = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => (updatedLoan as any)[key]);
    values.push(id);

    const result = await this.db.runAsync(`UPDATE Loans SET ${fields} WHERE id = ?`, values);
    return result.changes > 0 ? { ...updatedLoan, id } as Loan : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.runAsync(`DELETE FROM Loans WHERE id = ?`, [id]);
    return result.changes > 0;
  }
}