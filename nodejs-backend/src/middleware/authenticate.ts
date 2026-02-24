import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
     userId?: number;
     userEmail?: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Missing Authorize Bearer token' });
        return;
    }

    const token = authHeader.substring(7);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: number; 
            email: string 
        };

        req.userId = payload.userId;
        req.userEmail = payload.email;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}