const rateLimit = require('express-rate-limit');
const config = require('../config');

const rateLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: (req, res) => res.status(429).json({
        message: 'Too many requests, please try again later.',
    }),
});

module.exports = rateLimiter;