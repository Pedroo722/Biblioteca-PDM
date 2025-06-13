import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client } from '../../model/client/ClientEntity';

const STORAGE_KEY = 'clients';

export class ClientRepository {
  private async getStoredClients(): Promise<Client[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private async saveClients(clients: Client[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }

  async create(client: Omit<Client, 'id'>): Promise<Client> {
    const clients = await this.getStoredClients();
    const newClient: Client = {
      ...client,
      id: clients.length > 0 ? clients[clients.length - 1].id + 1 : 1,
    };
    clients.push(newClient);
    await this.saveClients(clients);
    return newClient;
  }

  async findAll(): Promise<Client[]> {
    return await this.getStoredClients();
  }

  async findById(id: number): Promise<Client | undefined> {
    const clients = await this.getStoredClients();
    return clients.find(c => c.id === id);
  }

  async update(id: number, updatedClient: Partial<Client>): Promise<Client | null> {
    const clients = await this.getStoredClients();
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) return null;

    clients[index] = { ...clients[index], ...updatedClient };
    await this.saveClients(clients);
    return clients[index];
  }

  async delete(id: number): Promise<boolean> {
    const clients = await this.getStoredClients();
    const newClients = clients.filter(c => c.id !== id);
    const changed = newClients.length !== clients.length;
    if (changed) {
      await this.saveClients(newClients);
    }
    return changed;
  }

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}
