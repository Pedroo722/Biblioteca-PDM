import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'jwt_token';

export const TokenService = {
    async saveToken(token: string) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    },

    async getToken(): Promise<string | null> {
        return await AsyncStorage.getItem(TOKEN_KEY);
    },

    async removeToken() {
        await AsyncStorage.removeItem(TOKEN_KEY);
    },
};
