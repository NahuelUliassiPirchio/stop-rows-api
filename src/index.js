require('../src/api/database/mongodb');

const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');

const rateLimit = require('../src/api/middlewares/rateLimit');
const config = require('./api/config');
const errorHandler = require('./api/middlewares/errorHandler');
const { swaggerDocs } = require('./api/v1/swagger');

const PORT = config.port;

const v1Router = require('./api/v1/routes/index');

const app = express();

swaggerDocs(app);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
}));

app.use(helmet());

app.use(rateLimit);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./api/auth');
app.use(passport.initialize());

app.use(//'/v1',
    v1Router);

app.use((req, res, next) => {
    if (!req.originalUrl.includes('.')) {
        res.status(404).json({message: `Can't find ${req.originalUrl} on this server!`});
    } else {
        next();
    }
});

app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

module.exports = {app, server};