import client from './client';

export interface LoginResponse {
    token: string;
    user: { email: string; name: string };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await client.post<LoginResponse>('/login', { email, password });
    return response.data;
}