import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API',
        },
    },
    apis: ['./src/api/v1/routes/*.ts', './src/api/v1/routes/*.js'],
};

const specs = swaggerJSDoc(options);

const swaggerDocs = (app: Express): void => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.get('/docs.json', (_: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
};

export { swaggerDocs };