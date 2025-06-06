import { Loan } from './LoanEntity';

export class LoanService {
  private loans: Loan[] = [];
  private nextId = 1;

  create(loan: Omit<Loan, 'id'>): Loan {
    const newLoan = { ...loan, id: this.nextId++ };
    this.loans.push(newLoan);
    return newLoan;
  }

  findAll(): Loan[] {
    return this.loans;
  }

  findById(id: number): Loan | undefined {
    return this.loans.find(loan => loan.id === id);
  }

  update(id: number, updatedLoan: Partial<Loan>): Loan | null {
    const index = this.loans.findIndex(loan => loan.id === id);
    if (index === -1) return null;

    this.loans[index] = { ...this.loans[index], ...updatedLoan };
    return this.loans[index];
  }

  delete(id: number): boolean {
    const index = this.loans.findIndex(loan => loan.id === id);
    if (index === -1) return false;

    this.loans.splice(index, 1);
    return true;
  }
}

export const loanService = new LoanService();