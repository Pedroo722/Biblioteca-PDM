import { Client } from './ClientEntity';
import { ClientRepository } from '../../database/repository/ClientRepository';

export class ClientService {
  private repository = new ClientRepository();

  async create(client: Omit<Client, 'id'>): Promise<Client> {
    return await this.repository.create(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Client | undefined> {
    return await this.repository.findById(id);
  }

  async update(id: number, updatedClient: Partial<Client>): Promise<Client | null> {
    return await this.repository.update(id, updatedClient);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

export const clientService = new ClientService();