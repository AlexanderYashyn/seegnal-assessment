import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3';

interface User {
    id: number;
    email: string;
    name: string;
    password_hash: string;
}

export interface LoginResult {
    token: string;
    user: { email: string; name: string };
}

export class AuthService {
    constructor(private readonly db: Database.Database) {}

    login(email: string, password: string): LoginResult | null {
        const user = this.db
            .prepare('SELECT id, email, name, password_hash FROM users WHERE email = ?')
            .get(email) as User | undefined;

        if (!user) {
            return null;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

        if (!isPasswordValid) {
            return null;
        }

        const secret = process.env.JWT_SECRET!;
        const expiresIn = (process.env.JWT_EXPIRES_IN ?? '8h') as jwt.SignOptions['expiresIn'];
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            secret,
            { expiresIn });

        return { token, user: { email: user.email, name: user.name } };
    }
}
