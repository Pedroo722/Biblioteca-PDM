import { TokenService } from './TokenService';

const API_URL = 'http://192.168.0.108:8081/auth';

interface LoginResponse {
  message: string;
  jwtToken: string | null;
  role: string | null;
}

export const login = async (email: string, password: string) => {
  const requestData = { email, password };

  console.log("Request sent to /login:", requestData);

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const data: LoginResponse = await response.json();

    console.log("DADOS RECEBIDOS: ", data);

    if (response.ok && data.jwtToken) {
      await TokenService.saveToken(data.jwtToken);
      return { success: true, jwtToken: data.jwtToken, role: data.role };
    } else {
      console.error("Erro no login: ", data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Erro de rede no login: ", error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string
) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, phone, address }),
    });

    const data = await response.json();
    
    console.log("DADOS RECEBIDOS: ", data);

    if (response.ok) {
      return { success: true, user: data };
    } else {
      console.error("Erro no cadastro: ", data.message);
      return { success: false, message: 'Signup failed.' };
    }
  } catch (error) {
    console.error("Erro de rede no cadastro: ", error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};