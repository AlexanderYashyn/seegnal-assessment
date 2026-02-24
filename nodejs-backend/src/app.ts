import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { errorHandler } from './middleware/errorHandler';
import { createAuthRouter } from './routes/auth.router';
import { createDrugsRouter } from './routes/drug.router';
import { createAnalyzeRouter } from './routes/analyze.router';
import { authService, drugsService } from './container';


export function createApp(): express.Application {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));

    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ],
        allowedHeaders: [ 'Content-Type', 'Authorization'],
     }));

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use('/api', createAuthRouter(authService));
    app.use('/api', createDrugsRouter(drugsService));
    app.use('/api', createAnalyzeRouter(drugsService));

    app.get('/', (req, res) => {
            res.json({
                message: 'Product API - Node.js Backend',
                version: '1.0.0',
                endpoints: {
                    products: '/api/products',
                    users: '/api/users',
                    health: '/health',
                },
            });
        });


    app.use(errorHandler);

    return app;
}