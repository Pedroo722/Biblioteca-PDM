import { Loan } from './LoanEntity';
import { LoanRepository } from '../../database/repository/LoanRepository';

export class LoanService {
  private repository = new LoanRepository();

  async create(loan: Omit<Loan, 'id'>): Promise<Loan> {
    return await this.repository.create(loan);
  }

  async findAll(): Promise<Loan[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Loan | undefined> {
    return await this.repository.findById(id);
  }

  async update(id: number, updatedLoan: Partial<Loan>): Promise<Loan | null> {
    return await this.repository.update(id, updatedLoan);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

export const loanService = new LoanService();