import { Router, Response } from 'express';
import { DrugService } from '../services/drug.service';
import { authenticate, AuthRequest } from '../middleware/authenticate';

export function createAnalyzeRouter(drugService: DrugService): Router {
    const router = Router();

    /**
     * @swagger
     * /api/analyze:
     *   post:
     *     summary: Analyze a patient's drug list for interactions
     *     tags: [Drugs]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [drugIds]
     *             properties:
     *               drugIds:
     *                 type: array
     *                 items:
     *                   type: integer
     *                 example: [6, 7]
     *     responses:
     *       200:
     *         description: List of interaction alerts
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 alerts:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       drug1:
     *                         type: string
     *                       drug2:
     *                         type: string
     *                       severity:
     *                         type: string
     *                         enum: [MAJOR, MODERATE]
     *                       message:
     *                         type: string
     *       400:
     *         description: Invalid request body
     *       401:
     *         description: Unauthorized
     */
    router.post('/analyze', authenticate, (req: AuthRequest, res: Response): void => {
        const { drugIds } = req.body as { drugIds: number[] };

        if (!Array.isArray(drugIds)) {
            res.status(400).json({ error: 'drugIds must be an array of integers' });
            return;
        }

        const alerts = drugService.analyzeInteractions(drugIds as number[]);
        res.json({ alerts });
    });

    return router;
}