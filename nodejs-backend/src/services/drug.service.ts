import Database from 'better-sqlite3';

export interface Drug {
    id: number;
    name: string;
}

export interface Alert {
    drug1: string;
    drug2: string;
    severity: 'MAJOR' | 'MODERATE';
    message: string;
}

interface DrugInteraction {
    drug1_id: number;
    drug1_name: string;
    drug2_id: number;
    drug2_name: string;
    severity: 'MAJOR' | 'MODERATE';
    message: string;
}

export class DrugService {
    constructor(private readonly db: Database.Database) {}

    getAllDrugs(): Drug[] {
        return this.db.prepare('SELECT id, name FROM drugs ORDER BY name').all() as Drug[];
    }

    analyzeInteractions(drugIds: number[]): Alert[] {
        if (drugIds.length < 2) {
            return [];
        }

        const alerts: Alert[] = [];
        const stmt = this.db.prepare<[number, number, number, number]>(
            `
            SELECT i.severity,
             i.message,
             d1.id AS drug1_id,
             d1.name AS drug1_name,
             d2.id AS drug2_id,
             d2.name AS drug2_name
            FROM   interactions i
            JOIN   drugs d1 ON d1.id = i.drug1_id
            JOIN   drugs d2 ON d2.id = i.drug2_id
            WHERE  (i.drug1_id = ? AND i.drug2_id = ?)
                OR (i.drug1_id = ? AND i.drug2_id = ?)
        `);
        
        for (let i = 0; i < drugIds.length; i++) {
            for (let j = i + 1; j < drugIds.length; j++) {
                const row = stmt.get(drugIds[i], drugIds[j], drugIds[j], drugIds[i]) as
                | DrugInteraction
                | undefined;

                if (row) {
                    alerts.push({
                        drug1: row.drug1_name,
                        drug2: row.drug2_name,
                        severity: row.severity as 'MAJOR' | 'MODERATE',
                        message: row.message,
                    });
                }
            }
        }

        return alerts;
    }
}