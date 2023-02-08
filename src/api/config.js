require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        mongodbUri: process.env.MONGO_DB_URI,
    },
    auth: {
        secret: process.env.AUTH_SECRET,
        saltRounds: process.env.AUTH_SALT_ROUNDS,
    },
    jwt: {
        accessSecret: process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    rateLimit: {
        windowMs: process.env.RATE_LIMIT_WINDOW_MS,
        max: process.env.RATE_LIMIT_MAX,
    },
};