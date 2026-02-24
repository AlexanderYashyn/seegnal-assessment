import { getDatabase } from './database/connection';
import { AuthService } from './services/auth.service';
import { DrugService } from './services/drug.service';

const db = getDatabase();

export const authService = new AuthService(db);
export const drugsService = new DrugService(db);