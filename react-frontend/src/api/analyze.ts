import client from './client';

export interface Alert {
    drug1: string;
    drug2: string;
    severity: 'MAJOR' | 'MODERATE';
    message: string;
}

export async function analyzeInteractions(drugIds: number[]): Promise<Alert[]> {
    const response = await client.post<{ alerts: Alert[] }>('/analyze', { drugIds });
    return response.data.alerts;
}