import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loan } from '../../model/loan/LoanEntity';

const STORAGE_KEY = '@library_loans';

export class LoanRepository {
  async findAll(): Promise<Loan[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        return JSON.parse(jsonValue) as Loan[];
      }
      return [];
    } catch (e) {
      console.error('Erro ao carregar empréstimos:', e);
      return [];
    }
  }

  private async saveAll(loans: Loan[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(loans);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Erro ao salvar empréstimos:', e);
    }
  }

  async create(loan: Omit<Loan, 'id'>): Promise<Loan> {
    const loans = await this.findAll();
    const newId = loans.length > 0 ? Math.max(...loans.map(l => l.id ?? 0)) + 1 : 1;
    const newLoan: Loan = { ...loan, id: newId };
    loans.push(newLoan);
    await this.saveAll(loans);
    return newLoan;
  }

  async findById(id: number): Promise<Loan | undefined> {
    const loans = await this.findAll();
    return loans.find(loan => loan.id === id);
  }

  async update(id: number, updatedLoan: Partial<Loan>): Promise<Loan | null> {
    const loans = await this.findAll();
    const index = loans.findIndex(loan => loan.id === id);
    if (index === -1) return null;

    loans[index] = { ...loans[index], ...updatedLoan };
    await this.saveAll(loans);
    return loans[index];
  }

  async delete(id: number): Promise<boolean> {
    let loans = await this.findAll();
    const initialLength = loans.length;
    loans = loans.filter(loan => loan.id !== id);
    if (loans.length === initialLength) return false;

    await this.saveAll(loans);
    return true;
  }
}
