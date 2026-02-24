import client from './client';

export interface Drug {
    id: number;
    name: string;
}

export async function getDrugs(): Promise<Drug[]> {
    const response = await client.get<{ drugs: Drug[] }>('/drugs');
    return response.data.drugs;
}