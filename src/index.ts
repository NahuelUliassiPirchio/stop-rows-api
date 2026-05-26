import '../src/api/database/mongodb';

import express from 'express';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';

import rateLimit from '../src/api/middlewares/rateLimit';
import config from './api/config';
import errorHandler from './api/middlewares/errorHandler';
import { swaggerDocs } from './api/v1/swagger';

const PORT = config.port;

import v1Router from './api/v1/routes/index';

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

import './api/auth';
app.use(passport.initialize());

import { connection } from 'mongoose';
app.get('/health', (_req, res) => {
    const dbState = connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';
    const status = dbState === 1 ? 'ok' : 'degraded';

    res.status(dbState === 1 ? 200 : 503).json({
        status,
        uptime: Math.floor(process.uptime()),
        db: dbStatus,
    });
});

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
const server = app.listen(
    process.env.NODE_ENV === 'test' ? 0 : PORT,
    () => console.log(`App listening on port ${PORT}`)
);

export {app, server};