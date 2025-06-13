import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client } from '../model/client/ClientEntity';

type ClientContextType = {
    clients: Client[];
    addClient: (client: Client) => Promise<void>;
    setClients: (clients: Client[]) => Promise<void>;
    loadClients: () => Promise<void>;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

const STORAGE_KEY = 'clients';

export const ClientProvider = ({ children }: { children: ReactNode }) => {
    const [clients, setClientsState] = useState<Client[]>([]);

    const saveToStorage = async (clientsToSave: Client[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clientsToSave));
        } catch (error) {
            console.error('Erro ao salvar clientes:', error);
        }
    };

    const loadClients = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setClientsState(parsed);
            }
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    };

    const addClient = async (client: Client) => {
        const updated = [...clients, client];
        setClientsState(updated);
        await saveToStorage(updated);
    };

    const setClients = async (clientsList: Client[]) => {
        setClientsState(clientsList);
        await saveToStorage(clientsList);
    };

    useEffect(() => {
        loadClients();
    }, []);

    return (
        <ClientContext.Provider value={{ clients, addClient, setClients, loadClients }}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClientContext = (): ClientContextType => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error('useClientContext deve ser usado dentro de um ClientProvider');
    }
    return context;
};
