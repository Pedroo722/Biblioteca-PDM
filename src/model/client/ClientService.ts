import { Client } from './ClientEntity';

export class ClientService {
  private clients: (Client & { id: string })[] = [];

  create(client: Client): Client & { id: string } {
    const newClient = { ...client, id: Date.now().toString() };
    this.clients.push(newClient);
    return newClient;
  }

  findAll(): (Client & { id: string })[] {
    return this.clients;
  }

  findById(id: string): (Client & { id: string }) | undefined {
    return this.clients.find(client => client.id === id);
  }

  update(id: string, updatedClient: Partial<Client>): (Client & { id: string }) | null {
    const index = this.clients.findIndex(client => client.id === id);
    if (index === -1) {
      return null;
    }

    this.clients[index] = { ...this.clients[index], ...updatedClient };
    return this.clients[index];
  }

  delete(id: string): boolean {
    const index = this.clients.findIndex(client => client.id === id);
    if (index === -1) {
      return false;
    }

    this.clients.splice(index, 1);
    return true;
  }
}

export const clientService = new ClientService();
