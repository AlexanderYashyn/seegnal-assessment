import { Router, Response } from 'express';
import { DrugService } from '../services/drug.service';
import { authenticate, AuthRequest } from '../middleware/authenticate';

export function createDrugsRouter(drugsService: DrugService): Router {
  const router = Router();

  /**
   * @swagger
   * /api/drugs:
   *   get:
   *     summary: Get the full drug vocabulary list
   *     tags: [Drugs]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Array of drugs
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 drugs:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                       name:
   *                         type: string
   *       401:
   *         description: Unauthorized
   */
  router.get('/drugs', authenticate, (_req: AuthRequest, res: Response): void => {
    const drugs = drugsService.getAllDrugs();
    res.json({ drugs });
  });

  return router;
}