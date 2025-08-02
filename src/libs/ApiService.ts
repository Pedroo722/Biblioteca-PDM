import { TokenService } from './TokenService';

const API_BASE_URL = 'http://192.168.0.108:8081';

export async function authFetch(
    endpoint: string,
    options: RequestInit = {}
    ): Promise<Response> {
    const token = await TokenService.getToken();

    let headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
    };

    if (options.headers && !(options.headers instanceof Headers) && !Array.isArray(options.headers)) {
        headers = {
            ...headers,
            ...(options.headers as { [key: string]: string }),
        };
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
}