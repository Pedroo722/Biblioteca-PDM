import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Client } from '../../model/client/ClientEntity';
import { authFetch } from '../../libs/ApiService';
import { SyncQueue } from '../../libs/SyncQueue';

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

    const isConnected = await NetInfo.fetch().then(res => res.isConnected);
    const body = new URLSearchParams({
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address,
      password: newClient.password ?? '',
    });

    if (isConnected) {
      await authFetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      }).catch(() => {
        SyncQueue.addRequest({
          method: 'POST',
          endpoint: '/auth/register',
          body: body.toString(),
        });
      });
    } else {
      await SyncQueue.addRequest({
        method: 'POST',
        endpoint: '/auth/register',
        body: body.toString(),
      });
    }

    return newClient;
  }

  async findAll(): Promise<Client[]> {
    return await this.getStoredClients();
  }

  async findById(email: string): Promise<Client | undefined> {
    const clients = await this.getStoredClients();
    return clients.find(c => c.email === email);
  }

  async update(email: string, updatedClient: Partial<Client>): Promise<Client | null> {
    const clients = await this.getStoredClients();
    const index = clients.findIndex(c => c.email === email);
    if (index === -1) return null;

    const updated = { ...clients[index], ...updatedClient };
    clients[index] = updated;
    await this.saveClients(clients);

    const isConnected = await NetInfo.fetch().then(res => res.isConnected);
    const body = new URLSearchParams({
      name: updated.name ?? '',
      email: updated.email ?? email,
      phone: updated.phone ?? '',
      address: updated.address ?? '',
      password: updated.password ?? '',
    });

    if (isConnected) {
      await authFetch(`/users/update/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      }).catch(() => {
        SyncQueue.addRequest({
          method: 'PUT',
          endpoint: `/users/update/${email}`,
          body: body.toString(),
        });
      });
    } else {
      await SyncQueue.addRequest({
        method: 'PUT',
        endpoint: `/users/update/${email}`,
        body: body.toString(),
      });
    }

    return updated;
  }

  async delete(email: string): Promise<boolean> {
    const clients = await this.getStoredClients();
    const newClients = clients.filter(c => c.email !== email);
    const changed = newClients.length !== clients.length;

    if (changed) {
      await this.saveClients(newClients);

      const isConnected = await NetInfo.fetch().then(res => res.isConnected);
      if (isConnected) {
        await authFetch(`/users/delete/${email}`, {
          method: 'DELETE',
        }).catch(() => {
          SyncQueue.addRequest({
            method: 'DELETE',
            endpoint: `/users/delete/${email}`,
          });
        });
      } else {
        await SyncQueue.addRequest({
          method: 'DELETE',
          endpoint: `/users/delete/${email}`,
        });
      }
    }

    return changed;
  }

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}