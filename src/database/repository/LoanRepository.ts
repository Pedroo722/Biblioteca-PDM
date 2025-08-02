import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Loan } from '../../model/loan/LoanEntity';
import { authFetch } from '../../libs/ApiService';
import { SyncQueue } from '../../libs/SyncQueue';

const STORAGE_KEY = '@library_loans';

export class LoanRepository {
  async findAll(): Promise<Loan[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue ? JSON.parse(jsonValue) as Loan[] : [];
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

    const isConnected = await NetInfo.fetch().then(res => res.isConnected);
    const body = new URLSearchParams({
      titulo: newLoan.title,
      nome: newLoan.name,
      email: newLoan.email,
      status: newLoan.status,
      loanDate: newLoan.loanDate,
      returnDate: newLoan.returnDate,
      returnDateReal: newLoan.returnDateReal || '',
    });

    if (isConnected) {
      await authFetch('/loans/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      }).catch(() => {
        SyncQueue.addRequest({
          method: 'POST',
          endpoint: '/loans/create',
          body: body.toString(),
        });
      });
    } else {
      await SyncQueue.addRequest({
        method: 'POST',
        endpoint: '/loans/create',
        body: body.toString(),
      });
    }

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

    const isConnected = await NetInfo.fetch().then(res => res.isConnected);
    const body = new URLSearchParams({
      titulo: loans[index].title,
      nome: loans[index].name,
      email: loans[index].email,
      status: loans[index].status,
      loanDate: loans[index].loanDate,
      returnDate: loans[index].returnDate,
      returnDateReal: loans[index].returnDateReal || '',
    });

    if (isConnected) {
      await authFetch(`/loans/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      }).catch(() => {
        SyncQueue.addRequest({
          method: 'PUT',
          endpoint: `/loans/update/${id}`,
          body: body.toString(),
        });
      });
    } else {
      await SyncQueue.addRequest({
        method: 'PUT',
        endpoint: `/loans/update/${id}`,
        body: body.toString(),
      });
    }

    return loans[index];
  }

  async delete(id: number): Promise<boolean> {
    let loans = await this.findAll();
    const initialLength = loans.length;
    loans = loans.filter(loan => loan.id !== id);
    if (loans.length === initialLength) return false;

    await this.saveAll(loans);

    const isConnected = await NetInfo.fetch().then(res => res.isConnected);
    if (isConnected) {
      await authFetch(`/loans/delete/${id}`, {
        method: 'DELETE',
      }).catch(() => {
        SyncQueue.addRequest({
          method: 'DELETE',
          endpoint: `/loans/delete/${id}`,
        });
      });
    } else {
      await SyncQueue.addRequest({
        method: 'DELETE',
        endpoint: `/loans/delete/${id}`,
      });
    }

    return true;
  }
}