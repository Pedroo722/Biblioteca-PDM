import { Loan } from './LoanEntity';

export class LoanService {
  private loans: (Loan & { id: string })[] = [];

  create(loan: Loan): Loan & { id: string } {
    const newLoan = { ...loan, id: Date.now().toString() };
    this.loans.push(newLoan);
    return newLoan;
  }

  findAll(): (Loan & { id: string })[] {
    return this.loans;
  }

  findById(id: string): (Loan & { id: string }) | undefined {
    return this.loans.find(loan => loan.id === id);
  }

  update(id: string, updatedLoan: Partial<Loan>): (Loan & { id: string }) | null {
    const index = this.loans.findIndex(loan => loan.id === id);
    if (index === -1) {
      return null;
    }

    this.loans[index] = { ...this.loans[index], ...updatedLoan };
    return this.loans[index];
  }

  delete(id: string): boolean {
    const index = this.loans.findIndex(loan => loan.id === id);
    if (index === -1) {
      return false;
    }

    this.loans.splice(index, 1);
    return true;
  }
}

export const loanService = new LoanService();
