import * as SQLite from 'expo-sqlite';
import { Client } from '../../model/client/ClientEntity';

export class ClientRepository {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync('library.db');
  }

  async create(client: Omit<Client, 'id'>): Promise<Client> {
    const result = await this.db.runAsync(
      `INSERT INTO Clients (name, phone, email, password, address)
       VALUES (?, ?, ?, ?, ?)`,
      [client.name, client.phone, client.email, client.password, client.address]
    );
    const id = result.lastInsertRowId!;
    return { ...client, id };
  }

  async findAll(): Promise<Client[]> {
    const result = await this.db.getAllAsync<Client>(`SELECT * FROM Clients`);
    return result;
  }

  async findById(id: number): Promise<Client | undefined> {
    const result = await this.db.getFirstAsync<Client>(`SELECT * FROM Clients WHERE id = ?`, [id]);
    return result ?? undefined;
  }

  async update(id: number, updatedClient: Partial<Client>): Promise<Client | null> {
    const keys = Object.keys(updatedClient);
    if (keys.length === 0) return null;

    const fields = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => (updatedClient as any)[key]);
    values.push(id);

    const result = await this.db.runAsync(`UPDATE Clients SET ${fields} WHERE id = ?`, values);
    return result.changes > 0 ? { ...updatedClient, id } as Client : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.runAsync(`DELETE FROM Clients WHERE id = ?`, [id]);
    return result.changes > 0;
  }
}