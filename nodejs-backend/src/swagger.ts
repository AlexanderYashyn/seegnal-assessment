import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Seegnal drug Interaction API',
            version: '1.0.0',
            description: 'API for analyzing drug interactions based on a patient\'s drug list',
        },
        
        servers: [
                {
                    url: `http://localhost:3011`,
                    description: 'Development server'
                },
            ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },

    },
    apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);