import client from './client';

export interface LoginResponse {
    token: string;
    user: { email: string };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await client.post<LoginResponse>('/login', { email, password });
    return response.data;
}