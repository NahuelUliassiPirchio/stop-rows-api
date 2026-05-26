import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import config from '../config';

const rateLimiter = rateLimit({
    windowMs: Number(config.rateLimit.windowMs) || 60000,
    max: config.rateLimit.max === 0 ? 0 : (Number(config.rateLimit.max) || 100),
    message: (_req: Request, res: Response) => res.status(429).json({
        message: 'Too many requests, please try again later.',
    }),
});

export default rateLimiter;
