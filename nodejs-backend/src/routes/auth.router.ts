import { Router, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export function createAuthRouter(authService: AuthService): Router {
    const router = Router();

    interface LoginRequest {
        email?: string;
        password?: string;
    }

    /**
     * @swagger
     * /api/login:
     *   post:
     *     summary: Authenticate user and receive JWT
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [email, password]
     *             properties:
     *               email:
     *                 type: string
     *                 example: name@mail.com
     *               password:
     *                 type: string
     *                 example: xxxxxx
     *     responses:
     *       200:
     *         description: JWT token and user info
     *       400:
     *         description: Missing fields
     *       401:
     *         description: Invalid credentials
     */
    router.post('/login', (req: Request, res: Response): void => {
        const { email, password } = req.body as LoginRequest;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const result = authService.login(email, password);

        if (!result) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        res.json(result);
    });

    return router;
}