import { Client } from './ClientEntity';

export class ClientService {
  private clients: Client[] = [];
  private nextId = 1;

  create(client: Omit<Client, 'id'>): Client {
    const newClient = { ...client, id: this.nextId++ };
    this.clients.push(newClient);
    return newClient;
  }

  findAll(): Client[] {
    return this.clients;
  }

  findById(id: number): Client | undefined {
    return this.clients.find(client => client.id === id);
  }

  update(id: number, updatedClient: Partial<Client>): Client | null {
    const index = this.clients.findIndex(client => client.id === id);
    if (index === -1) return null;

    this.clients[index] = { ...this.clients[index], ...updatedClient };
    return this.clients[index];
  }

  delete(id: number): boolean {
    const index = this.clients.findIndex(client => client.id === id);
    if (index === -1) return false;

    this.clients.splice(index, 1);
    return true;
  }
}

export const clientService = new ClientService();