import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { authFetch } from './ApiService';

const QUEUE_KEY = 'pending_requests';

type QueuedRequest = {
    method: string;
    endpoint: string;
    body?: any;
};

export const SyncQueue = {
    async addRequest(request: QueuedRequest) {
        const stored = await AsyncStorage.getItem(QUEUE_KEY);
        const queue: QueuedRequest[] = stored ? JSON.parse(stored) : [];
        queue.push(request);
        await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    },

    async processQueue() {
        const isConnected = await NetInfo.fetch().then((state: { isConnected: any; }) => state.isConnected);
        if (!isConnected) return;

        const stored = await AsyncStorage.getItem(QUEUE_KEY);
        if (!stored) return;

        const queue: QueuedRequest[] = JSON.parse(stored);
        const remaining: QueuedRequest[] = [];

        for (const req of queue) {
        try {
            await authFetch(req.endpoint, {
            method: req.method,
            body: req.body ? JSON.stringify(req.body) : undefined,
            });
        } catch (e) {
            remaining.push(req);
        }
        }

        await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
    },
};
