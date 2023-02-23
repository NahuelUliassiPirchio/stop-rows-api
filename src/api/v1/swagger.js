const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API',
        },
    },
    apis: ['./src/api/v1/routes/*.js'],
};

const specs = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.get('/docs.json', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
};

module.exports = {swaggerDocs};